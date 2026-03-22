import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
