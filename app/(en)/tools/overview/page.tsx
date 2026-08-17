import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import ToolPage from "@/components/ToolPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/tools/overview",
  title: "A Connected View of Vitreen Tools",
  description:
    "The connected system behind a gallery: artwork records, website publishing, private selections and collector follow-up.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <ToolPage slug="overview" />
    </>
  );
}
