import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import ViewingRoomsProductPage from "@/components/ViewingRoomsProductPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/tools/viewing-rooms",
  title: "Viewing Rooms",
  description:
    "Partagez des sélections d’œuvres privées par lien ou PDF, préparées depuis votre inventaire existant.",
  section: { name: "Outils", path: "/tools/overview" },
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
