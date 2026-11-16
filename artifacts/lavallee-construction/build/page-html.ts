import { getPageInfo, pageCopy, PRIVACY_PATH, services, SITE_EMAIL } from "../src/data/site.ts";
import { privacyContact, privacyIntro, privacySections, privacyUpdated } from "../src/data/privacy.ts";
import { seoForPath } from "../src/lib/seo.ts";

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

/** Meaningful content and links remain available before JavaScript, or without it. */
function fallbackContent(path: string, base: string): string {
  const href = (route: string) => escapeHtml(`${base.replace(/\/$/, "")}${route}`);
  const contact = `<p>${escapeHtml(privacyContact.title)}<br><a href="${escapeHtml(privacyContact.emailHref)}">${escapeHtml(privacyContact.email)}</a><br><a href="${privacyContact.phoneHref}">${privacyContact.phone}</a></p>`;
  const privacy = `<h1>Politique de confidentialité</h1><p>Entrée en vigueur et mise à jour : <time datetime="${privacyUpdated.iso}">${privacyUpdated.label}</time>.</p><p>${escapeHtml(privacyIntro)}</p>${privacySections.map((section) => `<section id="${section.id}"><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}${section.id === "responsable" ? contact : ""}${section.items ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}${(section.links ?? []).map((link) => `<p><a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a></p>`).join("")}</section>`).join("")}`;
  let content: string;
  if (path === PRIVACY_PATH) content = privacy;
  else if (path === "/soumission") content = `<h1>${escapeHtml(pageCopy.quote.heading)}</h1><p>${escapeHtml(pageCopy.quote.intro)}</p><noscript><p>Activez JavaScript pour utiliser le formulaire ou communiquez directement avec nous.</p></noscript><p><a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a> · <a href="tel:+14188836242">(418) 883-6242</a></p>`;
  else if (path === "/") content = `<h1>${escapeHtml(pageCopy.home.heading)}</h1><p>${escapeHtml(pageCopy.home.intro)}</p><p>Fondée en 2018, MZT Construction (2018) inc. compte plus de 400 projets réalisés.</p><h2>${escapeHtml(pageCopy.home.servicesHeading)}</h2><ul>${services.map((service) => `<li>${escapeHtml(service)}</li>`).join("")}</ul><p><a href="${href("/soumission")}">Demander une soumission</a></p><p><a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a> · <a href="tel:+14188836242">(418) 883-6242</a> · <a href="tel:+14185706620">(418) 570-6620</a></p>`;
  else content = `<p>404 — Page introuvable</p><h1>Cette page n’existe pas.</h1><p>Retrouvez l’accueil de MZT Construction ou présentez-nous votre projet.</p><p><a href="${href("/")}">Retour à l’accueil</a> · <a href="${href("/soumission")}">Demander une soumission</a></p>`;
  return `<div class="mzt-static-page"><style>.mzt-static-page h1{font-size:2.5rem;line-height:1.2;font-weight:700;margin:0 0 1rem}.mzt-static-page h2{font-size:1.5rem;font-weight:700;margin:2rem 0 1rem}.mzt-static-page p{margin:1rem 0}.mzt-static-page ul{list-style:disc;padding-left:1.5rem}.mzt-static-page a{text-decoration:underline;text-underline-offset:3px}</style><header style="background:#1b1b1b;color:#fff;padding:24px"><a style="color:inherit" href="${href("/")}">MZT Construction</a></header><main style="max-width:960px;margin:auto;padding:64px 24px;line-height:1.8">${content}</main><footer style="padding:24px;text-align:center"><a href="${href(PRIVACY_PATH)}">Politique de confidentialité</a> · <a href="${href("/")}">Accueil</a></footer></div>`;
}

export function pageHtml(shell: string, pathname: string, base = "/"): string {
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
    .replace(/<div\s+id=["']root["']\s*><\/div>/, `<div id="root">${fallbackContent(found?.path ?? "/404", base)}</div>`);
}
