import { absoluteUrl, getPageInfo, notFoundPage, SITE_EMAIL, SITE_IMAGE, SITE_NAME, SITE_URL } from "../data/site.ts";

export function seoForPath(pathname: string) {
  const found = getPageInfo(pathname);
  const page = found ?? notFoundPage;
  const canonical = found ? absoluteUrl(found.path) : null;
  const image = absoluteUrl(SITE_IMAGE);
  const meta = [
    { attribute: "name", key: "description", content: page.description },
    { attribute: "name", key: "robots", content: found ? "index, follow" : "noindex, follow" },
    { attribute: "property", key: "og:title", content: page.title },
    { attribute: "property", key: "og:description", content: page.description },
    { attribute: "property", key: "og:type", content: "website" },
    { attribute: "property", key: "og:site_name", content: SITE_NAME },
    { attribute: "property", key: "og:locale", content: "fr_CA" },
    { attribute: "property", key: "og:image", content: image },
    { attribute: "property", key: "og:image:width", content: "1200" },
    { attribute: "property", key: "og:image:height", content: "630" },
    { attribute: "property", key: "og:image:alt", content: "Construction et rénovation — MZT Construction" },
    { attribute: "name", key: "twitter:card", content: "summary_large_image" },
    { attribute: "name", key: "twitter:title", content: page.title },
    { attribute: "name", key: "twitter:description", content: page.description },
    { attribute: "name", key: "twitter:image", content: image },
  ];
  if (canonical) meta.push({ attribute: "property", key: "og:url", content: canonical });

  const structuredData = found ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": `${SITE_URL}/#entreprise`,
        name: SITE_NAME,
        legalName: "MZT Construction inc.",
        url: `${SITE_URL}/`,
        foundingDate: "2018",
        email: SITE_EMAIL,
        telephone: "+1-418-883-6242",
        logo: absoluteUrl("/logo-mzt-construction.png"),
        image,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: "fr-CA",
        publisher: { "@id": `${SITE_URL}/#entreprise` },
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#page`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: "fr-CA",
        isPartOf: { "@id": `${SITE_URL}/#site` },
      },
    ],
  } : null;

  return { page, canonical, meta, structuredData };
}
