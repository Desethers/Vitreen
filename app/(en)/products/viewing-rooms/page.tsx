import type { Metadata } from "next";
import ViewingRoomsProductPage from "@/components/ViewingRoomsProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/products/viewing-rooms",
  title: "Private viewing rooms",
  description:
    "Share private artwork selections with collectors by link or PDF, prepared from your existing inventory.",
});

export default function Page() {
  return <ViewingRoomsProductPage />;
}
