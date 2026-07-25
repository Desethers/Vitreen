import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/about",
  title: "À propos de Vitreen",
  description:
    "Vitreen donne aux galeries un site connecté, des fiches d’œuvres structurées et un assistant numérique pour leur travail quotidien.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <AboutPage />
    </>
  );
}
