import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  /** Turbopack omet souvent `node_modules/@sparticuz/chromium/bin/*.br` du trace ; Vercel échoue sans ces binaires. */
  outputFileTracingIncludes: {
    '/api/ovr/generate-pdf': ['./node_modules/@sparticuz/chromium/bin/**/*'],
  },
  /**
   * Le trace NFT associe par erreur tout `public/` à cette route (~250 Mo+ d’images démo).
   * La route PDF n’en a pas besoin ; sans exclusion la fonction dépasse la limite Vercel (300 Mo).
   */
  outputFileTracingExcludes: {
    '/api/ovr/generate-pdf': ['./public/**/*'],
  },
  images: {
    // Ajouté pour que les composants qui utilisent `quality={92}` puissent vraiment
    // produire du q=92 au lieu de retomber sur la valeur par défaut (75).
    qualities: [75, 92],
  },
};

export default nextConfig;
