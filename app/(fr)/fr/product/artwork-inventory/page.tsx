import type { Metadata } from "next";
import ArchiveProductPage from "@/components/ArchiveProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/product/artwork-inventory",
  title: "Logiciel d’inventaire des œuvres pour galeries",
  description:
    "Réunissez œuvres, artistes et expositions dans une même fiche : images, dimensions, disponibilité, localisation et documents.",
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
