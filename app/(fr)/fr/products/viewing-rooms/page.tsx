import type { Metadata } from "next";
import ViewingRoomsProductPage from "@/components/ViewingRoomsProductPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/products/viewing-rooms",
  title: "Viewing rooms privées",
  description:
    "Partagez des sélections d’œuvres privées par lien ou PDF, préparées depuis votre inventaire existant.",
});

export default function Page() {
  return <ViewingRoomsProductPage />;
}
