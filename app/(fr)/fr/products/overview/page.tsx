import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/products/overview",
  title: "Gallery OS",
  description:
    "Le système connecté d’une galerie : fiches d’œuvres, publication du site, sélections privées et suivi des collectionneurs.",
});

export default function Page() {
  return <ToolPage slug="overview" />;
}
