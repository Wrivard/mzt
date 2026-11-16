// Production URL verified using deployment metadata, not the development preview.
// Update this one value if the primary published domain changes, then rebuild.
export const SITE_URL = "https://mzr-const.replit.app";
export const PRIVACY_PATH = "/politique-de-confidentialite";
export const SITE_NAME = "MZT Construction";
export const SITE_EMAIL = "mztconstruction2018@hotmail.com";
export const SITE_IMAGE = "/og-mzt-construction.jpg";

export const services = [
  "Construction résidentielle",
  "Construction commerciale",
  "Réfection de toiture",
  "Déneigement de toiture",
  "Revêtement extérieur",
  "Rénovation résidentielle",
];

export interface PageInfo {
  path: string;
  title: string;
  description: string;
}

export const pages: PageInfo[] = [
  {
    path: "/",
    title: "MZT Construction | Construction, rénovation et toiture",
    description: "Fondée en 2018, MZT Construction réalise vos projets résidentiels et commerciaux : construction, rénovation, toiture et revêtement extérieur. Plus de 15 ans d’expérience.",
  },
  {
    path: "/soumission",
    title: "Demande de soumission | MZT Construction",
    description: "Présentez votre projet de construction, de rénovation, de toiture ou de revêtement extérieur à MZT Construction. Préparez votre demande de soumission par courriel.",
  },
  {
    path: PRIVACY_PATH,
    title: "Politique de confidentialité | MZT Construction",
    description: "Renseignements recueillis, formulaire de soumission, Google Maps et vos droits : consultez la politique de confidentialité de MZT Construction au Québec.",
  },
];

export const notFoundPage: PageInfo = {
  path: "/404",
  title: "Page introuvable (404) | MZT Construction",
  description: "Cette page est introuvable. Retrouvez l’accueil de MZT Construction, découvrez nos services ou présentez-nous votre projet.",
};

export function normalizePagePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function getPageInfo(pathname: string): PageInfo | undefined {
  const path = normalizePagePath(pathname);
  return pages.find((page) => page.path === path);
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).href;
}
