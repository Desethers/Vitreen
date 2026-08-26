import type { Metadata } from "next";
import SalesAssistantProductPage from "@/components/SalesAssistantProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/tools/sales-assistant",
  title: "Sales Assistant",
  description:
    "Prepare collector replies and sales material from your own gallery records, reviewed before anything is sent.",
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
