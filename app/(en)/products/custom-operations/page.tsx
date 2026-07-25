import type { Metadata } from "next";
import GalleryAssistantProductPage from "@/components/GalleryAssistantProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/products/custom-operations",
  title: "Gallery assistant",
  description:
    "Prepare collector replies and sales material from your own gallery records, reviewed before anything is sent.",
});

export default function Page() {
  return <GalleryAssistantProductPage />;
}
