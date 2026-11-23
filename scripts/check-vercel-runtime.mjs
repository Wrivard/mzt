import ts from "typescript";
import path from "node:path";
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";

// Type checking and tsx tests do not exercise Node's production ESM resolver.
// Emit the function and its local dependencies as Vercel does, then start a
// fresh Node process with no TypeScript loader or extension-resolution patch.
const root = process.cwd();
const temp = await mkdtemp(path.join(root, "node_modules/.vercel-runtime-"));
try {
  const config = ts.readConfigFile("api/tsconfig.json", ts.sys.readFile);
  if (config.error) throw new Error("Unable to read API TypeScript configuration");
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.join(root, "api"));
  const program = ts.createProgram([path.join(root, "api/quotes.ts")], {
    ...parsed.options, noEmit: true, incremental: false, composite: false,
  });
  for (const source of program.getSourceFiles()) {
    if (source.isDeclarationFile || source.fileName.includes("/node_modules/")) continue;
    const relative = path.relative(root, source.fileName);
    if (relative.startsWith("..")) throw new Error("Unexpected source outside repository");
    const target = path.join(temp, relative.replace(/\.tsx?$/, ".js"));
    await mkdir(path.dirname(target), { recursive: true });
    const output = ts.transpileModule(source.text, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
      fileName: source.fileName,
    });
    await writeFile(target, output.outputText);
  }
  // Preserve package boundaries and third-party resolution, but never load
  // application TypeScript at runtime.
  for (const directory of ["", "api", "lib/quote-mail", "lib/api-zod"]) {
    const destination = path.join(temp, directory);
    await mkdir(destination, { recursive: true });
    await writeFile(path.join(destination, "package.json"),
      await readFile(path.join(root, directory, "package.json")));
    if (ts.sys.directoryExists(path.join(root, directory, "node_modules"))) {
      await symlink(path.join(root, directory, "node_modules"), path.join(destination, "node_modules"));
    }
  }
  const runner = `
    import assert from "node:assert/strict";
    import { Readable } from "node:stream";
    import handler from "./api/quotes.js";
    delete process.env.RESEND_API_KEY;
    delete process.env.RECIPIENT_EMAIL;
    globalThis.fetch = () => { throw new Error("No network allowed in smoke test"); };
    async function invoke(method, body) {
      const req = Object.assign(Readable.from([]), {
        method, body,
        headers: {host:"site.example","content-type":"application/json"},
        socket: {remoteAddress:"runtime-smoke"}
      });
      let status, payload;
      const res = {setHeader(){}, writeHead(code){status=code;},
        end(value){payload=JSON.parse(value);}};
      await handler(req,res);
      return {status,payload};
    }
    assert.equal((await invoke("GET")).status,405);
    assert.equal((await invoke("POST",{})).status,400);
    const result = await invoke("POST",{
      requestId:"ad4a2686-a86e-48d0-bc77-97d343be8905",
      firstName:"Camille",lastName:"Exemple",email:"test@example.com",
      phone:"4185550100",city:"Sainte-Claire",
      projectType:"Construction résidentielle",timeline:"a-determiner",
      description:"Description fictive du projet.",website:""
    });
    assert.equal(result.status,503);
    assert.match(result.payload.error,/temporairement indisponible/);
    console.info("Compiled API cold start passed: GET 405, invalid POST 400, missing-config POST 503. No email sent.");
  `;
  await writeFile(path.join(temp, "smoke.mjs"), runner);
  const result = spawnSync(process.execPath, ["--no-experimental-strip-types", path.join(temp, "smoke.mjs")], {
    cwd: temp, encoding: "utf8", timeout: 30_000,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error("Compiled Vercel API failed its cold-start smoke test");
} finally {
  await rm(temp, { recursive: true, force: true });
}
