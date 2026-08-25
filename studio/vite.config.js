import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/studio/",
  build: {
    outDir: path.resolve(__dirname, "../public/studio"),
    // outDir sits outside the Vite root, so emptying is opt-in. Everything it
    // holds is either build output or copied from studio/public, so wiping it
    // each build is what stops superseded bundles from piling up.
    emptyOutDir: true,
    rollupOptions: {
      // Both locales must be build inputs: Vite rewrites the hashed asset tags
      // in every input HTML, so /studio/fr can't drift onto a stale bundle.
      input: {
        main: path.resolve(__dirname, "index.html"),
        fr: path.resolve(__dirname, "fr/index.html"),
      },
    },
  },
});
