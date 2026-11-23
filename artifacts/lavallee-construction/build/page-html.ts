import { getPageInfo } from "../src/data/site.ts";
import { seoForPath } from "../src/lib/seo.ts";

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

/** Metadata and full HTML come from the same route; never serve an SEO-only copy. */
export function pageHtml(shell: string, pathname: string, base: string, renderedContent: string): string {
  if (!renderedContent?.includes("<main")) throw new Error(`Missing full page render for ${pathname}`);
  const found = getPageInfo(pathname);
  const seo = seoForPath(pathname);
  const tags = [
    `<title>${escapeHtml(seo.page.title)}</title>`,
    ...seo.meta.map((tag) => `<meta ${tag.attribute}="${tag.key}" content="${escapeHtml(tag.content)}" />`),
    ...(seo.canonical ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    ...(seo.structuredData ? [`<script id="site-structured-data" type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, "\\u003c")}</script>`] : []),
    ...(found?.path === "/" ? [`<link rel="preload" as="image" href="${base}photos/mzt/client/hero-construction.webp" fetchpriority="high" />`] : []),
  ];
  return shell
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, "")
    .replace(/<script\b[^>]*id="site-structured-data"[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace("</head>", `${tags.join("\n    ")}\n  </head>`)
    // A replacement callback preserves literal $& sequences in client-authored copy.
    .replace(/<div\s+id=["']root["']\s*><\/div>/, () => `<div id="root" data-prerendered="true">${renderedContent}</div>`);
}
