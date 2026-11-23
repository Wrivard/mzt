import ts from "typescript";
import path from "node:path";

// Vercel's Node builder applies defaults to the raw config BEFORE resolving
// "extends". In particular, an inherited module setting does not prevent its
// NodeNext default. Reproduce that order without local declaration artifacts
// or project-reference redirects hiding errors in shared source packages.
const entry = path.resolve("api/quotes.ts");
const pending = [entry];
const checked = new Set();
let failures = 0;
while (pending.length) {
  const file = pending.shift();
  if (checked.has(file)) continue;
  checked.add(file);
  const configPath = ts.findConfigFile(path.dirname(file), ts.sys.fileExists);
  if (!configPath) throw new Error(`No tsconfig found for ${file}`);
  const loaded = ts.readConfigFile(configPath, ts.sys.readFile);
  if (loaded.error) throw new Error(ts.flattenDiagnosticMessageText(loaded.error.messageText, "\n"));
  const config = loaded.config;
  const options = { ...config.compilerOptions };
  if (options.module === undefined) {
    options.module = "NodeNext";
    options.moduleResolution = "NodeNext";
    options.strict = false;
  }
  Object.assign(options, {
    noEmit: true,
    incremental: false,
    composite: false,
    declaration: false,
    declarationMap: false,
    emitDeclarationOnly: false,
  });
  const parsed = ts.parseJsonConfigFileContent(
    { ...config, compilerOptions: options, files: [file], include: [], references: [] },
    ts.sys,
    path.dirname(configPath),
    undefined,
    configPath,
  );
  const program = ts.createProgram([file], parsed.options);
  const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
  if (diagnostics.length) {
    failures += diagnostics.length;
    console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => "\n",
    }));
  }
  for (const source of program.getSourceFiles()) {
    if (!source.isDeclarationFile && !source.fileName.includes("/node_modules/")) {
      pending.push(path.resolve(source.fileName));
    }
  }
}
if (failures) process.exit(1);
console.log(`Vercel-style TypeScript checks passed for ${checked.size} API and shared source files.`);
