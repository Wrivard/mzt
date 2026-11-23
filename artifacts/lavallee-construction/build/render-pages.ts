import path from "node:path";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";

/** Vite transforms the actual TSX pages; no screenshots or duplicated SEO copy. */
export async function createPageRenderer(root: string, base: string) {
  const server = await createServer({
    configFile: false,
    root,
    base,
    cacheDir: path.join(root, "node_modules/.vite-prerender"),
    appType: "custom",
    plugins: [react()],
    optimizeDeps: { noDiscovery: true, include: [] },
    resolve: {
      alias: {
        "@": path.join(root, "src"),
        "@assets": path.resolve(root, "../../attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    server: { middlewareMode: true, hmr: false, watch: null },
  });
  try {
    const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
    return { render: render as (pathname: string) => string, close: () => server.close() };
  } catch (error) {
    await server.close();
    throw error;
  }
}
