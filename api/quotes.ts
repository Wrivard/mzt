import type { IncomingMessage, ServerResponse } from "node:http";
// Vercel emits traced .ts files as .js, but does not rewrite workspace package
// exports pointing at .ts. Keep this production ESM graph explicitly resolvable.
import { handleQuoteRequest, MAX_REQUEST_BYTES } from "../lib/quote-mail/src/index.js";

export const maxDuration = 45;

export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Allow", "POST");
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Méthode non autorisée." }));
    return;
  }
  let body: unknown;
  try {
    // Vercel exposes a lazily parsed body. Raw streams are also supported for local tests.
    body = req.body;
    if (body === undefined) {
      let size = 0;
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += buffer.length;
        if (size > MAX_REQUEST_BYTES) {
          res.writeHead(413, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Les pièces jointes sont trop volumineuses." }));
          return;
        }
        chunks.push(buffer);
      }
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    }
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Requête JSON invalide." }));
    return;
  }
  const result = await handleQuoteRequest({
    method: req.method ?? "",
    origin: req.headers.origin,
    host: req.headers.host ?? "",
    contentType: req.headers["content-type"],
    clientIp: String(req.headers["x-vercel-forwarded-for"] ?? req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown").split(",")[0].trim(),
    body,
  });
  res.writeHead(result.status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(result.body));
}
