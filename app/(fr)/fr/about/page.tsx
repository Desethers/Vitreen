import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/about",
  title: "À propos",
  description:
    "Vitreen donne aux galeries un site connecté, des fiches d’œuvres structurées et un assistant numérique pour leur travail quotidien.",
});

export default function Page() {
  return <AboutPage />;
}
