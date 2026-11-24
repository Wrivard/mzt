import http2 from "node:http2";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { brotliCompressSync } from "node:zlib";
import { fileURLToPath } from "node:url";

// Local-only production benchmark. Never sends email or proxies API requests.
const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.join(workspace, "artifacts/lavallee-construction/dist/public");
const mime = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".webp": "image/webp", ".avif": "image/avif", ".png": "image/png",
  ".jpg": "image/jpeg", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };
const files = new Map();
const server = http2.createSecureServer({
  allowHTTP1: true,
  key: await readFile(path.join(workspace, "generated-artifacts/performance-key.pem")),
  cert: await readFile(path.join(workspace, "generated-artifacts/performance-cert.pem")),
}, async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "https://localhost").pathname);
  if (pathname.startsWith("/api/")) { response.writeHead(405); response.end(); return; }
  let filename = pathname === "/" ? "/index.html" : pathname;
  if (!path.extname(filename)) filename = `${filename.replace(/\/$/, "")}/index.html`;
  const resolved = path.resolve(root, `.${filename}`);
  if (!resolved.startsWith(`${root}/`)) { response.writeHead(403); response.end(); return; }
  try {
    let file = files.get(resolved);
    if (!file) {
      const body = await readFile(resolved);
      const type = mime[path.extname(resolved)] ?? "application/octet-stream";
      file = { body, type, compressed: /javascript|text\/|json|xml/.test(type) ? brotliCompressSync(body) : null };
      files.set(resolved, file);
    }
    const compress = file.compressed && request.headers["accept-encoding"]?.includes("br");
    response.writeHead(200, {
      "Content-Type": file.type,
      "Cache-Control": pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable"
        : /^\/(?:images|photos|fonts|certifications)\//.test(pathname) ? "public, max-age=604800"
        : "public, max-age=0, must-revalidate",
      ...(compress ? { "Content-Encoding": "br", Vary: "Accept-Encoding" } : {}),
    });
    response.end(compress ? file.compressed : file.body);
  } catch { response.writeHead(404); response.end("Not found"); }
});
server.listen(4174, "127.0.0.1", () => console.log("Production performance fixture listening on https://127.0.0.1:4174"));
