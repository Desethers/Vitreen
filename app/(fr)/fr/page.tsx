import type { Metadata } from "next";
import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingHeroFr from "@/components/landing/LandingHeroFr";
import LandingProblemFr from "@/components/landing/LandingProblemFr";
import LandingProductFr from "@/components/landing/LandingProductFr";
import LandingAiFr from "@/components/landing/LandingAiFr";
import LandingSystemFr from "@/components/landing/LandingSystemFr";
import LandingOffersFr from "@/components/landing/LandingOffersFr";
import LandingMethodFr from "@/components/landing/LandingMethodFr";
import LandingFaqFr from "@/components/landing/LandingFaqFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Vitreen — Outils de vente pour galeries d’art contemporain" },
  description:
    "Vitreen connecte vos données d’œuvres à Gmail et WhatsApp : votre équipe retrouve les œuvres, prépare des présentations et répond aux collectionneurs sans quitter la conversation.",
  alternates: alternates("fr", "/"),
  openGraph: {
    url: "/fr",
    title: "Vitreen — Outils de vente pour galeries d’art contemporain",
    description:
      "Vitreen connecte vos données d’œuvres à Gmail et WhatsApp : votre équipe retrouve les œuvres, prépare des présentations et répond aux collectionneurs sans quitter la conversation.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />
      <LandingHeroFr />
      <LandingProblemFr />
      <LandingProductFr />
      <LandingAiFr />
      <LandingSystemFr />
      <LandingOffersFr />
      <LandingMethodFr />
      <LandingFaqFr />
      <LandingCtaFr />
    </main>
  );
}
