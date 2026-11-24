import { renderToString } from "react-dom/server";
import { Root } from "./Root";
import Home from "./pages/Home";
import Soumission from "./pages/Soumission";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/not-found";
import { pageKey } from "./route-pages";

// These eager imports are build-time only; the browser uses route-sized chunks.
const pages = { "/": Home, "/soumission": Soumission, "/politique-de-confidentialite": Privacy, "/404": NotFound };

/** Build-time only: no persistent rendering service or user data. */
export function render(pathname: string): string {
  return renderToString(<Root ssrPath={pathname} initialPage={pages[pageKey(pathname)]} />);
}
