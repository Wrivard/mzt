import { useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { seoForPath } from "@/lib/seo";

/** One owner for head tags on initial load and every client-side navigation. */
export function PageMetadata() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const seo = seoForPath(location);
    document.title = seo.page.title;
    for (const { attribute, key, content } of seo.meta) {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    }
    if (!seo.canonical) document.head.querySelector('meta[property="og:url"]')?.remove();

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (seo.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = seo.canonical;
    } else canonical?.remove();

    let schema = document.head.querySelector<HTMLScriptElement>("#site-structured-data");
    if (seo.structuredData) {
      if (!schema) {
        schema = document.createElement("script");
        schema.id = "site-structured-data";
        schema.type = "application/ld+json";
        document.head.appendChild(schema);
      }
      schema.textContent = JSON.stringify(seo.structuredData);
    } else schema?.remove();
  }, [location]);

  return null;
}
