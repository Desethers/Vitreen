import type { Metadata } from "next";
import ArchiveProductPage from "@/components/ArchiveProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/products/archive",
  title: "Artworks Management",
  description:
    "Keep artworks, artists and exhibitions in one record — images, dimensions, availability, location and documents.",
  section: { name: "Gallery OS", path: "/products/overview" },
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
