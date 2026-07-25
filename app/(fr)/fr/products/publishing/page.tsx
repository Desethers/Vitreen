import type { Metadata } from "next";
import WebsitePublisherProductPage from "@/components/WebsitePublisherProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/products/publishing",
  title: "Publication du site de galerie",
  description:
    "Publiez artistes, expositions et œuvres disponibles sur le site de votre galerie depuis les mêmes fiches d’œuvres.",
});

export default function Page() {
  return <WebsitePublisherProductPage />;
}
