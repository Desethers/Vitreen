import type { Metadata } from "next";
import SalesAssistantProductPage from "@/components/SalesAssistantProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/tools/sales-assistant",
  title: "Sales Assistant",
  description:
    "Préparez réponses collectionneurs et matériel de vente depuis vos propres fiches, relus avant tout envoi.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <SalesAssistantProductPage />
    </>
  );
}
