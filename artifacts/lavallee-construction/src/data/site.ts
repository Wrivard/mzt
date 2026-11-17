// Production URL verified using deployment metadata, not the development preview.
// Update this one value if the primary published domain changes, then rebuild.
export const SITE_URL = "https://mzr-const.replit.app";
export const PRIVACY_PATH = "/politique-de-confidentialite";
export const SITE_NAME = "MZT Construction";
export const SITE_EMAIL = "mztconstruction2018@hotmail.com";
export const SITE_IMAGE = "/og-mzt-construction.jpg";

export const pageCopy = {
  home: {
    heading: "Construction, rénovation et toiture.",
    intro: "Construction résidentielle et commerciale, rénovation résidentielle, réfection et déneigement de toiture, revêtement extérieur : MZT Construction met plus de 15 ans d’expérience au service de vos projets dans Chaudière-Appalaches.",
    servicesHeading: "Construction et rénovation pour vos projets.",
  },
  quote: {
    heading: "Demandez votre soumission.",
    intro: "Décrivez vos travaux de construction résidentielle ou commerciale, de rénovation, de toiture ou de revêtement extérieur. Nous pourrons discuter de votre projet.",
  },
};

export const certificationLogos = [
  { src: "/certifications/mzt-acq.png", alt: "Association de la construction du Québec — ACQ" },
  { src: "/certifications/mzt-gcr.png", alt: "Garantie de construction résidentielle — GCR" },
  { src: "/certifications/mzt-rbq.png", alt: "Régie du bâtiment du Québec — RBQ" },
];

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
    title: "Construction, rénovation et toiture | MZT Construction",
    description: "Construction résidentielle et commerciale, rénovation, toiture et revêtement extérieur : découvrez MZT Construction et demandez une soumission pour vos travaux.",
  },
  {
    path: "/soumission",
    title: "Soumission construction et rénovation | MZT Construction",
    description: "Demandez une soumission à MZT Construction pour vos travaux de construction, rénovation résidentielle, toiture ou revêtement extérieur. Présentez votre projet.",
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
