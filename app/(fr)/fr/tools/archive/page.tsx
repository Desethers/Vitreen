import type { Metadata } from "next";
import ArchiveProductPage from "@/components/ArchiveProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/tools/archive",
  title: "Gestion des œuvres",
  description:
    "Réunissez œuvres, artistes et expositions dans une même fiche : images, dimensions, disponibilité, localisation et documents.",
  section: { name: "Outils", path: "/tools/overview" },
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <ArchiveProductPage />
    </>
  );
}
