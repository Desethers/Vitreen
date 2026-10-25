import type { Metadata } from "next";
import SalesAssistantProductPage from "@/components/SalesAssistantProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/product/sales-conversations",
  title: "Sales conversations in Gmail and WhatsApp",
  description:
    "Your artwork records inside Gmail and WhatsApp: collector replies prepared from your own inventory, reviewed before anything is sent.",
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
