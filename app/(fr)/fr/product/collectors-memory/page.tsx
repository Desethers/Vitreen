import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import SeoPage from "@/components/SeoPage";
import { seoPageProps } from "@/lib/seoPages";

const { seo, metadata: meta } = seoPageProps(
  "collectors-memory",
  "fr",
  "/product/collectors-memory"
);

export const metadata: Metadata = meta;

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <SeoPage id="collectors-memory" lang="fr" />
    </>
  );
}
