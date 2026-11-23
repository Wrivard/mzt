import { renderToString } from "react-dom/server";
import { Root } from "./Root";

/** Build-time only: no persistent rendering service or user data. */
export function render(pathname: string): string {
  return renderToString(<Root ssrPath={pathname} />);
}
