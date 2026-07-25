import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import ViewingRoomsProductPage from "@/components/ViewingRoomsProductPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/products/viewing-rooms",
  title: "Viewing Rooms",
  description:
    "Share private artwork selections with collectors by link or PDF, prepared from your existing inventory.",
  section: { name: "Gallery OS", path: "/products/overview" },
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <ViewingRoomsProductPage />
    </>
  );
}
