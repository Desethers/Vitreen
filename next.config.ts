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
  async redirects() {
    return [
      // /products/* a été renommé /tools/* pour matcher le menu "Tools" de
      // la nav. Redirection permanente au cas où un lien externe ou un
      // favori pointe encore vers l'ancienne URL.
      { source: "/products/:path*", destination: "/tools/:path*", permanent: true },
      { source: "/fr/products/:path*", destination: "/fr/tools/:path*", permanent: true },
      // /tools/archive a été renommé /tools/artwork-inventory pour un slug
      // plus explicite. Redirection permanente pour préserver le référencement.
      { source: "/tools/archive", destination: "/tools/artwork-inventory", permanent: true },
      {
        source: "/fr/tools/archive",
        destination: "/fr/tools/artwork-inventory",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
