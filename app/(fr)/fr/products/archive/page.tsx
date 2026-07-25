import type { Metadata } from "next";
import ArchiveProductPage from "@/components/ArchiveProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/products/archive",
  title: "Gestion des œuvres",
  description:
    "Réunissez œuvres, artistes et expositions dans une même fiche : images, dimensions, disponibilité, localisation et documents.",
});

export default function Page() {
  return <ArchiveProductPage />;
}
