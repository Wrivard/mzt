import { useLayoutEffect, type ReactNode } from "react";
import App from "./App";
import { ErrorBoundary } from "@/components/error-boundary";

function StartupReady({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.removeAttribute("data-app-loading");
    document.getElementById("app-startup")?.remove();
  }, []);
  return children;
}

/** Identical component tree for build-time HTML and browser hydration. */
export function Root({ ssrPath }: { ssrPath: string }) {
  return (
    <StartupReady>
      <ErrorBoundary>
        <App ssrPath={ssrPath} />
      </ErrorBoundary>
    </StartupReady>
  );
}
