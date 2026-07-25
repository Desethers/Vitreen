import type { Metadata } from "next";
import GalleryAssistantProductPage from "@/components/GalleryAssistantProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/products/custom-operations",
  title: "Gallery Assistant",
  description:
    "Préparez réponses collectionneurs et matériel de vente depuis vos propres fiches, relus avant tout envoi.",
  section: { name: "Gallery OS", path: "/products/overview" },
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <GalleryAssistantProductPage />
    </>
  );
}
