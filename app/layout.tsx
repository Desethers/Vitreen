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
const siteTitle = "Vitreen — Gallery OS for contemporary art galleries";
const siteDescription =
  "Vitreen organises artworks, publishes your gallery website and prepares private collector presentations from the same artwork records.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Vitreen",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Vitreen" }],
  creator: "Vitreen",
  publisher: "Vitreen",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/paula-cooper-background.jpg",
        width: 1600,
        height: 1000,
        alt: "Vitreen — Gallery OS for contemporary art galleries",
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
  inLanguage: "en-GB",
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vitreen Gallery OS",
  url: siteUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: siteDescription,
  audience: {
    "@type": "Audience",
    audienceType: "Art galleries, artists, art advisors and dealers",
  },
  provider: { "@type": "Organization", name: siteName, url: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`bg-white ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/allen14.jpg-preview3.jpg" fetchPriority="high" />
        {/* Marque le document quand le site est embarqué dans une iframe
            (portfolio) : la scrollbar est masquée via globals.css. Exécuté
            avant le premier rendu pour éviter tout flash de scrollbar. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(window.self!==window.top)document.documentElement.classList.add('is-embedded')}catch(e){document.documentElement.classList.add('is-embedded')}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white font-sans">
        <LangProvider>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
