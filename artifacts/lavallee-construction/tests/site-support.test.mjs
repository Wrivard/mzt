import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { crawlFiles } from "../build/crawl-files.ts";
import { pageHtml } from "../build/page-html.ts";
import { siteSupport } from "../build/site-support.ts";
import { pageCopy, pages, PRIVACY_PATH, SITE_URL } from "../src/data/site.ts";
import { privacyContact, privacySections } from "../src/data/privacy.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shell = '<html lang="fr"><head><title>Old title</title><meta name="description" content="Old description"><meta name="robots" content="index, follow"><meta property="og:title" content="Old title"></head><body><div id="root"></div><script src="/assets/app.js"></script></body></html>';

test("crawl resources use the verified published domain and only canonical pages", () => {
  const files = crawlFiles();
  assert.deepEqual(Object.keys(files).sort(), ["llms-full.txt", "llms.txt", "robots.txt", "sitemap.xml"]);
  assert.match(files["robots.txt"].content, /User-agent: \*\nAllow: \//);
  assert.ok(files["robots.txt"].content.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
  const locations = [...files["sitemap.xml"].content.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(locations, pages.map((page) => new URL(page.path, SITE_URL).href));
  assert.ok(!locations.some((location) => location.includes("404")));
  assert.ok(!JSON.stringify(files).includes(".replit.dev"));
  for (const section of privacySections) assert.ok(files["llms-full.txt"].content.includes(section.title));
  assert.ok(files["llms-full.txt"].content.includes(privacyContact.email));
});

test("each public HTML page has unique metadata, canonical, schema, and useful text without JS", () => {
  for (const page of pages) {
    const html = pageHtml(shell, page.path);
    assert.equal((html.match(/<title>/g) ?? []).length, 1);
    assert.equal((html.match(/name="description"/g) ?? []).length, 1);
    assert.equal((html.match(/name="robots"/g) ?? []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
    assert.ok(html.includes(page.title));
    assert.ok(html.includes(new URL(page.path, SITE_URL).href));
    assert.match(html, /id="site-structured-data"/);
    assert.equal((html.match(/<h1>/g) ?? []).length, 1);
    if (page.path === "/") assert.ok(html.includes(`<h1>${pageCopy.home.heading}</h1>`));
    if (page.path === "/soumission") assert.ok(html.includes(`<h1>${pageCopy.quote.heading}</h1>`));
    assert.match(html, /<script src="\/assets\/app.js">/);
    assert.ok(!html.includes("Old title"));
    const graph = JSON.parse(html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(graph["@graph"][0].foundingDate, "2018");
    assert.ok(!("address" in graph["@graph"][0]), "Do not invent a postal address");
  }
  const privacy = pageHtml(shell, PRIVACY_PATH);
  for (const section of privacySections) assert.ok(privacy.includes(`id="${section.id}"`));
  assert.match(privacy, /30 jours/);
  assert.match(privacy, /rien n’est envoyé automatiquement|n’envoie pas automatiquement/);
});

test("404 metadata is noindex, has no canonical/schema, and does not reflect unsafe URLs", () => {
  const html = pageHtml(shell, "/missing?<script>alert(1)</script>");
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(html, /404/);
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('property="og:url"'));
  assert.ok(!html.includes('id="site-structured-data"'));
  assert.ok(!html.includes("alert(1)"));
  assert.match(html, /href="\/soumission"/);
});

function devMiddleware(base = "/") {
  const plugin = siteSupport();
  plugin.configResolved({ base });
  let handle;
  plugin.configureServer({
    config: { root, publicDir: path.join(root, "public") },
    middlewares: { use: (callback) => { handle = callback; } },
    transformIndexHtml: async (_pathname, source) => source,
  });
  return (url, method = "GET", accept = "*/*") => new Promise((resolve, reject) => {
    const headers = {};
    const res = {
      statusCode: 200,
      setHeader: (name, value) => { headers[name.toLowerCase()] = value; },
      end(body) { resolve({ status: this.statusCode, headers, body, next: false }); },
    };
    Promise.resolve(handle({ url, method, headers: { accept } }, res, (error) => {
      if (error) reject(error);
      else resolve({ next: true });
    })).catch(reject);
  });
}

test("development returns 200 for public routes and correct content types for crawl files", async () => {
  const request = devMiddleware();
  for (const page of pages) {
    const result = await request(page.path);
    assert.equal(result.status, 200);
    assert.match(result.headers["content-type"], /text\/html/);
    assert.ok(result.body.includes(page.title));
  }
  for (const [name, file] of Object.entries(crawlFiles())) {
    const result = await request(`/${name}`);
    assert.equal(result.status, 200);
    assert.equal(result.headers["content-type"], file.type);
    assert.equal(result.body, file.content);
  }
});

test("unknown, prototype-named and HEAD requests really return 404 without crashing", async () => {
  const request = devMiddleware();
  for (const route of ["/missing", "/missing.html", "/toString", "/constructor", "/__proto__"]) {
    const result = await request(route);
    assert.equal(result.status, 404, route);
    assert.equal(result.headers["x-robots-tag"], "noindex, follow");
  }
  const head = await request("/missing", "HEAD");
  assert.equal(head.status, 404);
  assert.equal(head.body, undefined);
});

test("real public assets and Vite internals still work; base-prefixed routes are supported", async () => {
  const request = devMiddleware();
  assert.equal((await request("/logo-mzt-construction.png", "GET", "text/html")).next, true);
  assert.equal((await request("/@vite/client")).next, true);
  assert.equal((await request("/src/index.css")).next, true);
  const nested = await devMiddleware("/site/")("/site/politique-de-confidentialite");
  assert.equal(nested.status, 200);
  assert.match(nested.body, /href="\/site\/soumission"|href="\/site\/"/);
});

test("build generates page HTML, custom 404, and crawler files from the same data", () => {
  const plugin = siteSupport();
  plugin.configResolved({ base: "/" });
  const bundle = { "index.html": { type: "asset", source: shell } };
  const emitted = new Map();
  plugin.generateBundle.handler.call({
    emitFile(asset) { emitted.set(asset.fileName, asset.source); },
  }, {}, bundle);
  for (const file of ["soumission/index.html", "politique-de-confidentialite/index.html", "404.html", ...Object.keys(crawlFiles())]) {
    assert.ok(emitted.has(file), file);
  }
  assert.match(bundle["index.html"].source, /fetchpriority="high"/);
  assert.match(emitted.get("404.html"), /noindex, follow/);
  assert.match(emitted.get("politique-de-confidentialite/index.html"), /Lo[i] 25/);
});
