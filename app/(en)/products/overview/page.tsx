import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/products/overview",
  title: "Gallery OS",
  description:
    "The connected system behind a gallery: artwork records, website publishing, private selections and collector follow-up.",
});

export default function Page() {
  return <ToolPage slug="overview" />;
}
