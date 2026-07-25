import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import PricingPage from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/pricing",
  title: "Tarifs",
  description:
    "Un prix de mise en place clair et un partenariat mensuel pour un Gallery OS construit autour de votre galerie.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <PricingPage />
    </>
  );
}
