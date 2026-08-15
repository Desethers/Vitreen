import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "@/components/LangProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitreen.art";
const siteName = "Vitreen";
const siteTitle = "Vitreen — Outils pour galeries d’art contemporain";
const siteDescription =
  "Vitreen est un partenaire numérique pour galeries d’art : viewing rooms privées, publication d’œuvres, suivi des demandes collectionneurs et workflows sur mesure.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Vitreen",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "galerie d’art",
    "viewing room",
    "site web galerie",
    "art contemporain",
    "CRM galerie",
    "Artlogic",
    "collectionneurs",
    "Vitreen",
  ],
  authors: [{ name: "Vitreen" }],
  creator: "Vitreen",
  publisher: "Vitreen",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    languages: { fr: "/", en: "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/paula-cooper-background.jpg",
        width: 1600,
        height: 1000,
        alt: "Vitreen — Outils pour galeries d’art contemporain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/paula-cooper-background.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
  category: "technology",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description: siteDescription,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: ["fr-FR", "en-US"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`bg-white ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/allen14.jpg-preview3.jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white font-sans">
        <LangProvider>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
