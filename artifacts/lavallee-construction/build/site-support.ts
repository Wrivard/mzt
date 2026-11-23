import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import { getPageInfo, pages } from "../src/data/site.ts";
import { crawlFiles } from "./crawl-files.ts";
import { pageHtml } from "./page-html.ts";
import { createPageRenderer } from "./render-pages.ts";

/** Static crawl files, per-route HTML, and a real 404 instead of a blanket SPA rewrite. */
export function siteSupport(): Plugin {
  let base = "/";
  let root = "";
  return {
    name: "mzt-site-support",
    enforce: "post",
    configResolved(config) {
      base = config.base;
      root = config.root;
    },
    configureServer(server) {
      const files = crawlFiles();
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const pathname = new URL(req.url ?? "/", "http://vite.local").pathname;
        const prefix = base.replace(/\/$/, "");
        if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) return next();
        const route = pathname.slice(prefix.length) || "/";
        const fileName = route.slice(1);
        const file = Object.hasOwn(files, fileName) ? files[fileName] : undefined;
        if (file) {
          res.statusCode = 200;
          res.setHeader("Content-Type", file.type);
          res.setHeader("Cache-Control", "no-cache");
          return res.end(req.method === "HEAD" ? undefined : file.content);
        }
        // Leave assets, HMR, and non-navigation requests to Vite.
        if (/^\/(?:@|src\/|node_modules\/|__vite|__replit|__open-in-editor)/.test(route)) return next();
        const found = getPageInfo(route);
        const accept = req.headers.accept ?? "*/*";
        if (!found && !accept.includes("text/html") && !accept.includes("*/*")) return next();
        try {
          // A direct browser visit to a real image/font must still serve the asset.
          const publicRoot = server.config.publicDir;
          let publicFile: string | undefined;
          try {
            publicFile = path.resolve(publicRoot, `.${decodeURIComponent(route)}`);
          } catch { /* Invalid URL encoding is handled as an unknown page. */ }
          if (!found && publicFile?.startsWith(`${publicRoot}${path.sep}`)) {
            const info = await stat(publicFile).catch(() => undefined);
            if (info?.isFile()) return next();
          }
          const source = await readFile(path.join(server.config.root, "index.html"), "utf8");
          const transformed = await server.transformIndexHtml(pathname, source, req.originalUrl);
          const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
          res.statusCode = found ? 200 : 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache");
          if (!found) res.setHeader("X-Robots-Tag", "noindex, follow");
          res.end(req.method === "HEAD" ? undefined : pageHtml(transformed, route, base, render(pathname)));
        } catch (error) {
          next(error);
        }
      });
    },
    generateBundle: {
      order: "post",
      async handler(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset") throw new Error("Missing built index.html for public site pages.");
        const shell = String(index.source);
        const renderer = await createPageRenderer(root, base);
        try {
          const renderPage = (route: string) => renderer.render(`${base.replace(/\/$/, "")}${route}`);
          index.source = pageHtml(shell, "/", base, renderPage("/"));
          for (const page of pages.filter((entry) => entry.path !== "/")) {
            this.emitFile({
              type: "asset",
              fileName: `${page.path.slice(1)}/index.html`,
              source: pageHtml(shell, page.path, base, renderPage(page.path)),
            });
          }
          this.emitFile({ type: "asset", fileName: "404.html", source: pageHtml(shell, "/404", base, renderPage("/404")) });
          for (const [fileName, file] of Object.entries(crawlFiles())) {
            this.emitFile({ type: "asset", fileName, source: file.content });
          }
        } finally {
          await renderer.close();
        }
      },
    },
  };
}
