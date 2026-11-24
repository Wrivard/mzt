import { useLayoutEffect, type ReactNode } from "react";
import App from "./App";
import { ErrorBoundary } from "@/components/error-boundary";
import type { PageComponent } from "@/route-pages";

function StartupReady({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.removeAttribute("data-app-loading");
    document.getElementById("app-startup")?.remove();
  }, []);
  return children;
}

/** Identical component tree for build-time HTML and browser hydration. */
export function Root({ ssrPath, initialPage }: { ssrPath: string; initialPage: PageComponent }) {
  return (
    <StartupReady>
      <ErrorBoundary>
        <App ssrPath={ssrPath} initialPage={initialPage} />
      </ErrorBoundary>
    </StartupReady>
  );
}
