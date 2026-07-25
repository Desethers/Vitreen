import type { Metadata } from "next";
import WebsitePublisherProductPage from "@/components/WebsitePublisherProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/products/publishing",
  title: "Gallery website publishing",
  description:
    "Publish artists, exhibitions and available works to your gallery website from the same artwork records.",
});

export default function Page() {
  return <WebsitePublisherProductPage />;
}
