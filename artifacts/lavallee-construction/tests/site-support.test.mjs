import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { crawlFiles } from "../build/crawl-files.ts";
import { pageHtml as buildPageHtml } from "../build/page-html.ts";
import { createPageRenderer } from "../build/render-pages.ts";
import { siteSupport } from "../build/site-support.ts";
import { withProductionConsent } from "../build/consent.ts";
import { pageCopy, pages, PRIVACY_PATH, SITE_URL } from "../src/data/site.ts";
import { privacyContact, privacySections } from "../src/data/privacy.ts";
import { seoForPath } from "../src/lib/seo.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shell = '<html lang="fr"><head><meta charset="UTF-8"><title>Old title</title><meta name="description" content="Old description"><meta name="robots" content="index, follow"><meta property="og:title" content="Old title"></head><body><div id="root"></div><script src="/assets/app.js"></script></body></html>';
const renderer = await createPageRenderer(root, "/");
const render = renderer.render;
const rendered = new Map([...pages.map((page) => page.path), "/404"].map((route) => [route, render(route)]));
await renderer.close();
const pageHtml = (source, route, base = "/") =>
  buildPageHtml(source, route, base, rendered.get(route) ?? rendered.get("/404"));

test("technical SEO describes only established services, territory and business contacts", () => {
  const seo = seoForPath("/");
  const graph = seo.structuredData["@graph"];
  const business = graph.find((entity) => entity["@type"] === "GeneralContractor");
  assert.equal(business.identifier.value, "5753-3283-01");
  assert.deepEqual(business.areaServed.map((area) => area.name), ["Bellechasse", "Beauce", "Lévis", "Chaudière-Appalaches"]);
  assert.equal(business.hasOfferCatalog.itemListElement.length, 6);
  assert.equal(business.contactPoint.length, 2);
  assert.equal(business.logo, `${SITE_URL}/logo-mzt-2018.png`);
  assert.equal(business.address, undefined, "Do not invent a street address");
  assert.equal(business.aggregateRating, undefined, "Do not invent review ratings");
  assert.ok(seo.meta.some((tag) => tag.key === "robots" && tag.content.includes("max-image-preview:large")));
  assert.equal(seoForPath("/soumission").structuredData["@graph"].find((entity) => entity["@id"].endsWith("#page"))["@type"], "ContactPage");
  const source = readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(source, /rel="preload" as="image" href="\/logo-mzt-2018.png"/);
});

test("Vercel normalizes HTML aliases, excludes the API from indexing and caches fingerprinted assets", () => {
  const config = JSON.parse(readFileSync(path.resolve(root, "../../vercel.json"), "utf8"));
  for (const page of pages) {
    const alias = page.path === "/" ? "/index.html" : `${page.path}/index.html`;
    assert.ok(config.redirects.some((redirect) => redirect.source === alias && redirect.destination === page.path && redirect.permanent));
  }
  assert.ok(config.headers.find((entry) => entry.source === "/api/(.*)").headers.some((header) => header.key === "X-Robots-Tag" && header.value.includes("noindex")));
  assert.ok(config.headers.find((entry) => entry.source === "/assets/(.*)").headers.some((header) => header.value.includes("immutable")));
});

test("startup preserves full no-JS HTML and has bounded recovery if hydration fails", () => {
  const source = readFileSync(path.join(root, "index.html"), "utf8");
  const html = pageHtml(source, "/soumission");
  const script = html.match(/<script data-cookieconsent="ignore">([\s\S]*?)<\/script>/)[1];
  const attributes = new Set();
  let recover;
  runInNewContext(script, {
    document: { documentElement: {
      setAttribute: (name) => attributes.add(name),
      removeAttribute: (name) => attributes.delete(name),
    } },
    window: { setTimeout: (callback, delay) => {
      assert.equal(delay, 8000);
      recover = callback;
    } },
  });
  assert.ok(attributes.has("data-app-loading"));
  assert.match(html, /html\[data-app-loading\] #root \{ visibility: hidden; \}/);
  assert.match(html, /#app-startup \{ display: none; \}/);
  assert.ok(html.includes(pageCopy.quote.heading), "Full no-JS content is retained");
  recover();
  assert.equal(attributes.has("data-app-loading"), false, "Failure reveals the fallback instead of leaving a permanent loader");
});

test("crawl resources use the verified published domain and only canonical pages", () => {
  assert.equal(SITE_URL, "https://mztconstruction.ca");
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
    assert.equal((html.match(/<meta name="description"/g) ?? []).length, 1);
    assert.equal((html.match(/name="robots"/g) ?? []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
    assert.ok(html.includes(page.title));
    assert.ok(html.includes(new URL(page.path, SITE_URL).href));
    assert.match(html, /id="site-structured-data"/);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
    if (page.path === "/") assert.ok(html.includes(pageCopy.home.heading));
    if (page.path === "/soumission") assert.ok(html.includes(pageCopy.quote.heading));
    assert.match(html, /<script src="\/assets\/app.js">/);
    assert.ok(!html.includes("Old title"));
    const graph = JSON.parse(html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(graph["@graph"][0].foundingDate, "2018");
    assert.ok(!("address" in graph["@graph"][0]), "Do not invent a postal address");
  }
  const privacy = pageHtml(shell, PRIVACY_PATH);
  for (const section of privacySections) assert.ok(privacy.includes(`id="${section.id}"`));
  assert.match(privacy, /30 jours/);
  assert.match(privacy, /service Resend/);
  assert.match(privacy, /courriel de confirmation/);
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

function devMiddleware(base = "/", renderRoute = render) {
  const plugin = siteSupport();
  plugin.configResolved({ base, root });
  let handle;
  plugin.configureServer({
    config: { root, publicDir: path.join(root, "public") },
    middlewares: { use: (callback) => { handle = callback; } },
    transformIndexHtml: async (_pathname, source) => source,
    ssrLoadModule: async () => ({ render: renderRoute }),
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
    assert.ok(!result.body.includes('id="Cookiebot"'), "Do not load the CMP in development");
    assert.ok(!result.body.includes("gtm.js?id="), "Do not track development visits");
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
  const nestedRenderer = await createPageRenderer(root, "/site/");
  try {
    const nested = await devMiddleware("/site/", nestedRenderer.render)("/site/politique-de-confidentialite");
    assert.equal(nested.status, 200);
    assert.match(nested.body, /href="\/site\/soumission"|href="\/site\/"/);
  } finally {
    await nestedRenderer.close();
  }
});

test("build generates page HTML, custom 404, and crawler files from the same data", async () => {
  const plugin = siteSupport();
  plugin.configResolved({ base: "/", root });
  const bundle = { "index.html": { type: "asset", source: shell } };
  const emitted = new Map();
  await plugin.generateBundle.handler.call({
    emitFile(asset) { emitted.set(asset.fileName, asset.source); },
  }, {}, bundle);
  for (const file of ["soumission/index.html", "politique-de-confidentialite/index.html", "404.html", ...Object.keys(crawlFiles())]) {
    assert.ok(emitted.has(file), file);
  }
  assert.match(bundle["index.html"].source, /fetchpriority="high"/);
  assert.match(emitted.get("404.html"), /noindex, follow/);
  assert.match(emitted.get("politique-de-confidentialite/index.html"), /Lo[i] 25/);
  for (const html of [bundle["index.html"].source, ...[...emitted.values()].filter((value) => value.includes("<html"))]) {
    assert.equal((html.match(/id="Cookiebot"/g) ?? []).length, 1);
    assert.match(html, /GTM-MLGVF778/);
  }
});

test("production consent defaults precede Cookiebot, GTM and application scripts", () => {
  const html = withProductionConsent(shell);
  assert.ok(html.indexOf("gtag('consent', 'default'") < html.indexOf('id="Cookiebot"'));
  assert.ok(html.indexOf('id="Cookiebot"') < html.indexOf("gtm.js?id="));
  assert.ok(html.indexOf("gtm.js?id=") < html.indexOf("/assets/app.js"));
  assert.match(html, /data-blockingmode="auto"/);
  assert.match(withProductionConsent(shell.replace('<script src="/assets/app.js"', '<script type="module" src="/assets/app.js"')),
    /<script data-cookieconsent="ignore" type="module" src="\/assets\/app.js"/);
  const script = html.match(/<script data-cookieconsent="ignore">([\s\S]*?)<\/script>/)[1];
  const window = {};
  runInNewContext(script, { window, get dataLayer() { return window.dataLayer; } });
  const defaults = window.dataLayer.find((entry) => entry[0] === "consent")[2];
  for (const key of ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"]) {
    assert.equal(defaults[key], "denied");
  }
});

test("initial HTML contains full services, projects, certifications, FAQ answers, map and footer", () => {
  const html = pageHtml(shell, "/");
  for (const id of ["a-propos", "services", "certifications", "en-images", "cta", "contact", "zone-desservie"]) {
    assert.ok(html.includes(`id="${id}"`), `Missing public section: ${id}`);
  }
  for (const text of [
    "Faites construire votre maison", "On retire l’excès de neige",
    "Rénovez les pièces", "Nous desservons Bellechasse",
    "Chaque situation est évaluée", "Nos réalisations",
  ]) assert.ok(html.includes(text), `Missing public text: ${text}`);
  assert.ok(html.includes("<footer"));
  assert.ok(html.includes("<iframe"));
  assert.ok(html.includes("data-crawlable-faq"));
  assert.ok(!html.includes("mzt-static-page"));
  assert.ok(!html.includes("Avis à venir"), "Unpublished testimonials stay unpublished");
  const quote = pageHtml(shell, "/soumission");
  assert.ok(quote.includes("<form"));
  assert.ok(quote.includes('<select'));
  assert.ok(quote.includes('name="timeline"'));
});

test("missing page rendering fails explicitly instead of shipping a reduced fallback", () => {
  assert.throws(() => buildPageHtml(shell, "/", "/", ""), /Missing full page render/);
});
