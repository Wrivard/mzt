import { absoluteUrl, pages, PRIVACY_PATH, services, SITE_EMAIL, SITE_NAME } from "../src/data/site.ts";
import { privacyContact, privacyIntro, privacySections, privacyUpdated } from "../src/data/privacy.ts";

export function crawlFiles(): Record<string, { type: string; content: string }> {
  const summary = `# ${SITE_NAME}

> Site officiel de MZT Construction inc., entreprise de construction résidentielle et commerciale au Québec.

## Pages

- [Accueil](${absoluteUrl("/")}): Présentation de l’entreprise et de ses six services.
- [Demande de soumission](${absoluteUrl("/soumission")}): Formulaire avec envoi automatique par Resend, confirmation client et photos ou PDF facultatifs.
- [Politique de confidentialité](${absoluteUrl(PRIVACY_PATH)}): Renseignements personnels, fournisseurs, carte Google Maps, droits et contact.

## Entreprise

- Nom : MZT Construction inc.
- Fondation : 2018.
- Expérience annoncée en construction : plus de 15 ans, à ne pas confondre avec l’âge de l’entreprise.
- Plus de 400 projets réalisés, selon les renseignements fournis par l’entreprise.

## Services

${services.map((service) => `- ${service}`).join("\n")}

## Contacts publics

- Jean-Sébastien Tanguay : (418) 883-6242.
- Sébastien Morin : (418) 570-6620.
- Courriel : ${SITE_EMAIL}.

## Ressources

- [Plan du site](${absoluteUrl("/sitemap.xml")})
- [Instructions d’exploration](${absoluteUrl("/robots.txt")})
- [Version texte détaillée](${absoluteUrl("/llms-full.txt")})
`;
  const privacyText = `# Politique de confidentialité

Entrée en vigueur et mise à jour : ${privacyUpdated.label}.

${privacyIntro}

Contact : ${privacyContact.title}, ${privacyContact.email}, ${privacyContact.phone}.

${privacySections.map((section) => [
    `## ${section.title}`,
    ...section.paragraphs,
    ...(section.items ?? []).map((item) => `- ${item}`),
    ...(section.links ?? []).map((link) => `- [${link.label}](${link.href})`),
  ].join("\n\n")).join("\n\n")}
`;
  return {
    "robots.txt": {
      type: "text/plain; charset=utf-8",
      content: `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`,
    },
    "sitemap.xml": {
      type: "application/xml; charset=utf-8",
      content: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${absoluteUrl(page.path)}</loc>${page.path === PRIVACY_PATH ? `<lastmod>${privacyUpdated.iso}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`,
    },
    "llms.txt": { type: "text/plain; charset=utf-8", content: summary },
    "llms-full.txt": { type: "text/plain; charset=utf-8", content: `${summary}\n---\n\n${privacyText}` },
  };
}
