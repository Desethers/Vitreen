import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "fr",
  path: "/pricing",
  title: "Tarifs",
  description:
    "Un prix de mise en place clair et un partenariat mensuel pour un Gallery OS construit autour de votre galerie.",
});

export default function Page() {
  return <PricingPage />;
}
