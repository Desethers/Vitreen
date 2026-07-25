import type { Metadata } from "next";
import ArchiveProductPage from "@/components/ArchiveProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/products/archive",
  title: "Artwork management",
  description:
    "Keep artworks, artists and exhibitions in one record — images, dimensions, availability, location and documents.",
});

export default function Page() {
  return <ArchiveProductPage />;
}
