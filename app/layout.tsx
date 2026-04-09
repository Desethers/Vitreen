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

export const metadata: Metadata = {
  title: "Vitreen — Sites web pour galeries d'art contemporain",
  description:
    "Un site moderne pour votre galerie en deux semaines. Structure, design et fonctionnalités pensés pour le fonctionnement réel d'une galerie. Prix fixe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`bg-white ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/allen14.jpg-preview3.jpg" />
      </head>
      <body className="antialiased bg-white font-sans">
        <LangProvider>
          {children}
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
