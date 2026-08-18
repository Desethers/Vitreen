import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/studio/",
  build: {
    outDir: path.resolve(__dirname, "../public/studio"),
  },
});
