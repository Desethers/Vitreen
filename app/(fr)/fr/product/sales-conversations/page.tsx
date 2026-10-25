import type { Metadata } from "next";
import SalesAssistantProductPage from "@/components/SalesAssistantProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/product/sales-conversations",
  title: "Conversations de vente dans Gmail et WhatsApp",
  description:
    "Vos fiches d’œuvres dans Gmail et WhatsApp : réponses collectionneurs préparées depuis votre inventaire, relues avant tout envoi.",
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
