import type { Metadata } from "next";
import GalleryAssistantProductPage from "@/components/GalleryAssistantProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/products/custom-operations",
  title: "Assistant de galerie",
  description:
    "Préparez réponses collectionneurs et matériel de vente depuis vos propres fiches, relus avant tout envoi.",
});

export default function Page() {
  return <GalleryAssistantProductPage />;
}
