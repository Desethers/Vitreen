import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import ToolPage from "@/components/ToolPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/tools/overview",
  title: "Gallery OS",
  description:
    "Le système connecté d’une galerie : fiches d’œuvres, publication du site, sélections privées et suivi des collectionneurs.",
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
