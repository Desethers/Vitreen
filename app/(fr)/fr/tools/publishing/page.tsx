import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import WebsitePublisherProductPage from "@/components/WebsitePublisherProductPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/tools/publishing",
  title: "Publication du site",
  description:
    "Publiez artistes, expositions et œuvres disponibles sur le site de votre galerie depuis les mêmes fiches d’œuvres.",
  section: { name: "Outils", path: "/tools/overview" },
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <WebsitePublisherProductPage />
    </>
  );
}
