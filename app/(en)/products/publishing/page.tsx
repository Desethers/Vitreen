import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import WebsitePublisherProductPage from "@/components/WebsitePublisherProductPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/products/publishing",
  title: "Website Publisher",
  description:
    "Publish artists, exhibitions and available works to your gallery website from the same artwork records.",
  section: { name: "Gallery OS", path: "/products/overview" },
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <WebsitePublisherProductPage />
    </>
  );
}
