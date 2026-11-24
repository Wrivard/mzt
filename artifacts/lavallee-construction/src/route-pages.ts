import { lazy, type ComponentType } from "react";
import { normalizePagePath, PRIVACY_PATH } from "@/data/site";

export type PageComponent = ComponentType;
export type PageKey = "/" | "/soumission" | "/politique-de-confidentialite" | "/404";

export function pageKey(pathname: string): PageKey {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const localPath = base && pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
  const normalized = normalizePagePath(localPath);
  return normalized === "/" || normalized === "/soumission" || normalized === PRIVACY_PATH
    ? normalized : "/404";
}

const loaders = {
  "/": () => import("@/pages/Home"),
  "/soumission": () => import("@/pages/Soumission"),
  "/politique-de-confidentialite": () => import("@/pages/Privacy"),
  "/404": () => import("@/pages/not-found"),
};

export const lazyPages = {
  "/": lazy(loaders["/"]),
  "/soumission": lazy(loaders["/soumission"]),
  "/politique-de-confidentialite": lazy(loaders["/politique-de-confidentialite"]),
  "/404": lazy(loaders["/404"]),
};

/** Only download the requested page before hydration, not every page's form code. */
export async function loadPage(pathname: string): Promise<PageComponent> {
  return (await loaders[pageKey(pathname)]()).default;
}
