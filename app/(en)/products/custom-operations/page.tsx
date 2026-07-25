import type { Metadata } from "next";
import GalleryAssistantProductPage from "@/components/GalleryAssistantProductPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/products/custom-operations",
  title: "Gallery Assistant",
  description:
    "Prepare collector replies and sales material from your own gallery records, reviewed before anything is sent.",
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
