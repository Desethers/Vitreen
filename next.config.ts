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
      // Vitreen Studio est buildé par Vite dans public/studio/.
      // Next rewrite sert /studio et /studio/fr sur les index.html respectifs.
      { source: "/studio", destination: "/studio/index.html" },
      { source: "/studio/", destination: "/studio/index.html" },
      { source: "/studio/fr", destination: "/studio/fr/index.html" },
      { source: "/studio/fr/", destination: "/studio/fr/index.html" },
    ];
  },
  async redirects() {
    /* L'ordre compte : Next applique la première règle qui matche et renvoie
     * un 308 au client. Les règles les plus spécifiques doivent donc précéder
     * les génériques, sinon /products/archive part sur /tools/archive et se
     * fait rediriger une seconde fois — une chaîne que Google suit mais qui
     * dilue le signal. */
    return [
      // Ancien slug ET ancien préfixe d'un coup : un seul saut.
      {
        source: "/products/archive",
        destination: "/tools/artwork-inventory",
        permanent: true,
      },
      {
        source: "/fr/products/archive",
        destination: "/fr/tools/artwork-inventory",
        permanent: true,
      },
      {
        source: "/products/custom-operations",
        destination: "/tools/sales-assistant",
        permanent: true,
      },
      {
        source: "/fr/products/custom-operations",
        destination: "/fr/tools/sales-assistant",
        permanent: true,
      },
      // /tools/custom-operations a été renommé /tools/sales-assistant : l'URL
      // annonçait des « opérations sur mesure » pour une page qui décrit
      // l'assistant de vente (Gmail, WhatsApp, brouillons IA).
      {
        source: "/tools/custom-operations",
        destination: "/tools/sales-assistant",
        permanent: true,
      },
      {
        source: "/fr/tools/custom-operations",
        destination: "/fr/tools/sales-assistant",
        permanent: true,
      },
      // /tools/archive a été renommé /tools/artwork-inventory pour un slug
      // plus explicite. Redirection permanente pour préserver le référencement.
      { source: "/tools/archive", destination: "/tools/artwork-inventory", permanent: true },
      {
        source: "/fr/tools/archive",
        destination: "/fr/tools/artwork-inventory",
        permanent: true,
      },
      // /products/* a été renommé /tools/* pour matcher le menu "Tools" de
      // la nav. Redirection permanente au cas où un lien externe ou un
      // favori pointe encore vers l'ancienne URL.
      { source: "/products/:path*", destination: "/tools/:path*", permanent: true },
      { source: "/fr/products/:path*", destination: "/fr/tools/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
