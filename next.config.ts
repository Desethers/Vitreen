import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    // Ajouté pour que les composants qui utilisent `quality={92}` puissent vraiment
    // produire du q=92 au lieu de retomber sur la valeur par défaut (75).
    qualities: [75, 92],
  },
  async rewrites() {
    return [
      // Vitreen Studio (projet Vite séparé) est buildé statiquement dans
      // public/studio/ — cette rewrite sert son index.html sur /studio.
      { source: "/studio", destination: "/studio/index.html" },
      // Version FR de la même page statique, traduite à la main dans
      // public/studio/fr/ (voir la note en tête de ce fichier).
      { source: "/studio/fr", destination: "/studio/fr/index.html" },
      { source: "/studio/fr/", destination: "/studio/fr/index.html" },
    ];
  },
};

export default nextConfig;
