import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "@/components/LangProvider";
import { ClerkClientProvider } from "@/components/ClerkClientProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitreen.art";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vitreen — Le système d'exploitation des galeries d'art contemporain",
    template: "%s · Vitreen",
  },
  description:
    "Vitreen réunit viewing rooms privées, sites de galerie, inventaire, CRM collectionneurs, foires et consignations dans un seul environnement pensé pour les galeries d'art contemporain.",
  keywords: [
    "galerie art contemporain",
    "viewing room",
    "logiciel galerie d'art",
    "site web galerie",
    "inventaire œuvres d'art",
    "CRM collectionneurs",
    "art fair logistics",
    "consignation œuvres d'art",
    "catalogue raisonné",
    "art gallery software",
    "private viewing room",
    "art collector CRM",
  ],
  authors: [{ name: "Vitreen" }],
  creator: "Vitreen",
  publisher: "Vitreen",
  applicationName: "Vitreen",
  category: "Art & Galleries",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Vitreen",
    title: "Vitreen — Le système d'exploitation des galeries d'art contemporain",
    description:
      "Viewing rooms privées, sites de galerie, inventaire, CRM, foires, consignations. Un seul environnement, pensé pour les galeries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitreen — Le système d'exploitation des galeries d'art contemporain",
    description:
      "Viewing rooms privées, sites de galerie, inventaire, CRM, foires, consignations. Un seul environnement, pensé pour les galeries.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization schema — applies site-wide.
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vitreen",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description:
      "Le système d'exploitation des galeries d'art contemporain : viewing rooms, site, inventaire, CRM, foires, consignations.",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["French", "English"],
      },
    ],
  };
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vitreen",
    url: SITE_URL,
    inLanguage: ["fr-FR", "en-US"],
    publisher: { "@type": "Organization", name: "Vitreen" },
  };
  return (
    <html lang="fr" className={`bg-white ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/allen14.jpg-preview3.jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className="antialiased bg-white font-sans">
        <ClerkClientProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ClerkClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
