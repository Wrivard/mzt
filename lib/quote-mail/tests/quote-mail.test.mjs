import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { handleQuoteRequest, resendSender } from "../src/index.ts";
import { customerTemplate, ownerTemplate } from "../src/templates.ts";
import handler from "../../../api/quotes.ts";

const data = () => ({
  requestId: randomUUID(),
  firstName: "Camille",
  lastName: "Exemple",
  email: "camille@example.com",
  phone: "4185550100",
  city: "Sainte-Claire",
  projectType: "Construction résidentielle",
  timeline: "prochaines-semaines",
  description: "Une nouvelle maison avec un garage.",
  website: "",
});
const config = { RESEND_API_KEY: "test-only-not-a-real-key", RESEND_FROM_EMAIL: "bonjour@kua.quebec", RECIPIENT_EMAIL: "owner@example.com" };
const request = (body = data()) => ({
  method: "POST", host: "site.example", origin: "https://site.example",
  contentType: "application/json", clientIp: randomUUID(), body,
});
// Structurally plausible ZIP header; never unpacked by the server.
const archive = Buffer.concat([Buffer.from([80, 75, 3, 4]), Buffer.alloc(30)]).toString("base64");

test("sends two separate branded messages with correct recipients, reply-to and owner-only attachment", async () => {
  const input = data();
  input.attachment = { content: archive };
  const sent = [];
  const result = await handleQuoteRequest(request(input), { env: config, send: async (payload, key) => sent.push({ payload, key }) });
  assert.equal(result.status, 200);
  assert.equal(result.body.confirmationSent, true);
  assert.equal(sent.length, 2);
  assert.deepEqual(sent[0].payload.to, ["owner@example.com"]);
  assert.equal(sent[0].payload.reply_to, input.email);
  assert.deepEqual(sent[1].payload.to, [input.email]);
  assert.equal(sent[1].payload.reply_to, config.RECIPIENT_EMAIL);
  assert.equal(sent[0].payload.attachments[0].content, archive);
  assert.equal(sent[1].payload.attachments, undefined);
  for (const { payload } of sent) {
    assert.equal(payload.from, "MZT Construction <bonjour@kua.quebec>");
    assert.match(payload.html, /M\.Z\.T\./);
    assert.match(payload.html, /#80a800/);
    assert.ok(payload.html.includes(input.description));
    assert.ok(payload.text.includes("Dans les prochaines semaines"));
    assert.ok(payload.text.includes(input.requestId));
  }
});

test("escapes user HTML and preserves multiline descriptions in both templates", () => {
  const input = { ...data(), firstName: '<img src=x onerror="bad()">', description: "<script>bad()</script>\nDeuxième ligne." };
  for (const template of [ownerTemplate, customerTemplate]) {
    const result = template(input, "MZT-test", false);
    assert.ok(!result.html.includes("<script>"));
    assert.ok(!result.html.includes("<img src=x"));
    assert.match(result.html, /&lt;script&gt;/);
    assert.match(result.html, /<br>Deuxième ligne/);
    assert.ok(result.text.includes(input.description));
  }
});

test("does not send client confirmation when the owner's send fails", async () => {
  let sends = 0;
  const result = await handleQuoteRequest(request(), { env: config, send: async () => { sends++; throw Error("provider"); } });
  assert.equal(result.status, 502);
  assert.equal(sends, 1);
  assert.ok(!JSON.stringify(result).includes(config.RESEND_API_KEY));
});

test("preserves successful lead reception when only confirmation fails", async () => {
  let sends = 0;
  const result = await handleQuoteRequest(request(), { env: config, send: async () => { if (++sends === 2) throw Error("provider"); } });
  assert.equal(result.status, 200);
  assert.equal(result.body.confirmationSent, false);
});

test("identical retries have stable per-email idempotency keys; edits change the keys", async () => {
  const input = data(), keys = [];
  const deps = { env: config, send: async (_payload, key) => keys.push(key) };
  await handleQuoteRequest(request(input), deps);
  await handleQuoteRequest(request(input), deps);
  assert.deepEqual(keys.slice(0, 2), keys.slice(2, 4));
  await handleQuoteRequest(request({ ...input, description: "Une autre description du projet." }), deps);
  assert.notEqual(keys[0], keys[4]);
});

test("rejects invalid input, foreign origins, honeypot, malformed attachments and missing configuration", async () => {
  let sent = false;
  const deps = { env: config, send: async () => { sent = true; } };
  for (const body of [
    { ...data(), email: "bad\r\nBcc: victim@example.com" },
    { ...data(), projectType: "invented" },
    { ...data(), timeline: "invented" },
    { ...data(), description: "          " },
    { ...data(), website: "bot" },
    { ...data(), attachment: { content: "not-base64" } },
    { ...data(), attachment: { content: Buffer.from("not a ZIP").toString("base64") } },
  ]) assert.equal((await handleQuoteRequest(request(body), deps)).status, 400);
  assert.equal((await handleQuoteRequest({ ...request(), origin: "https://other.example" }, deps)).status, 403);
  assert.equal((await handleQuoteRequest({ ...request(), contentType: "text/plain" }, deps)).status, 415);
  assert.equal((await handleQuoteRequest({ ...request(), method: "GET" }, deps)).status, 405);
  assert.equal((await handleQuoteRequest(request(), { ...deps, env: {} })).status, 503);
  assert.equal((await handleQuoteRequest(request(), { ...deps, env: { ...config, RESEND_FROM_EMAIL: "other@example.com" } })).status, 503);
  assert.equal(sent, false);
});

test("limits repeated attempts from the same client", async () => {
  const input = request();
  const deps = { env: config, send: async () => {} };
  for (let i = 0; i < 5; i++) assert.equal((await handleQuoteRequest(input, deps)).status, 200);
  assert.equal((await handleQuoteRequest(input, deps)).status, 429);
});

test("rejects requests larger than the standard Vercel-safe budget", async () => {
  const body = { ...data(), attachment: { content: "A".repeat(4_200_001) } };
  assert.equal((await handleQuoteRequest(request(body), { env: config })).status, 413);
});

test("accepts the largest allowed attachment without exceeding the request budget", async () => {
  const bytes = Buffer.alloc(2_800_000);
  bytes.set([80, 75, 3, 4]);
  const body = { ...data(), attachment: { content: bytes.toString("base64") } };
  assert.equal((await handleQuoteRequest(request(body), { env: config, send: async () => {} })).status, 200);
  assert.ok(Buffer.byteLength(JSON.stringify(body)) < 4_200_000);
});

test("REST adapter uses documented Resend endpoint, bearer auth and idempotency header", async () => {
  let captured;
  const sender = resendSender("test-only", async (url, init) => {
    captured = { url, init };
    return { ok: true, json: async () => ({ id: "email-id" }) };
  });
  await sender({ from: "MZT <bonjour@kua.quebec>", to: ["owner@example.com"], reply_to: "client@example.com", subject: "test", html: "<p>test</p>", text: "test" }, "test/key");
  assert.equal(captured.url, "https://api.resend.com/emails");
  assert.equal(captured.init.headers["Idempotency-Key"], "test/key");
  assert.equal(captured.init.headers.Authorization, "Bearer test-only");
  await assert.rejects(resendSender("test-only", async () => ({ ok: false }))({}, "key"));
});

test("Vercel wrapper accepts parsed bodies, rejects malformed JSON, and returns method errors", async () => {
  async function invoke(method, body, raw = "") {
    const req = Object.assign(Readable.from([raw]), {
      method, body, headers: { host: "site.example", "content-type": "application/json" },
      socket: { remoteAddress: "local-test" },
    });
    let status, payload;
    const res = { setHeader() {}, writeHead(code) { status = code; }, end(value) { payload = JSON.parse(value); } };
    await handler(req, res);
    return { status, payload };
  }
  assert.equal((await invoke("GET", undefined)).status, 405);
  assert.equal((await invoke("POST", undefined, "{")).status, 400);
  assert.equal((await invoke("POST", { invalid: true })).status, 400);
});
