import type { Metadata } from "next";
import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingHeroFr from "@/components/landing/LandingHeroFr";
import LandingRecognitionFr from "@/components/landing/LandingRecognitionFr";
import LandingOutputsFr from "@/components/landing/LandingOutputsFr";
import WhoVitreenIsFor from "@/components/WhoVitreenIsFor";
import LandingOffersFr from "@/components/landing/LandingOffersFr";
import StatementSplit from "@/components/StatementSplit";
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
      <LandingOutputsFr />
      <LandingRecognitionFr />
      <WhoVitreenIsFor lang="fr" />
      <LandingOffersFr />
      <LandingFaqFr />
      <StatementSplit />
      <LandingCtaFr />
    </main>
  );
}
