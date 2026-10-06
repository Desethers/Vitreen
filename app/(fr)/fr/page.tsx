import type { Metadata } from "next";
import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingHeroFr from "@/components/landing/LandingHeroFr";
import LandingRecognitionFr from "@/components/landing/LandingRecognitionFr";
import LandingOutputsFr from "@/components/landing/LandingOutputsFr";
import LandingRelationshipsFr from "@/components/landing/LandingRelationshipsFr";
import WhoVitreenIsFor from "@/components/WhoVitreenIsFor";
import LandingOffersFr from "@/components/landing/LandingOffersFr";
import StatementSplit from "@/components/StatementSplit";
import LandingFaqFr from "@/components/landing/LandingFaqFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute:
      "Vitreen — Outils de vente et inventaire pour l’art, le design et les objets de collection",
  },
  description:
    "Vitreen propose des outils de vente et de gestion d’inventaire pour les galeries d’art, marchands de design et professionnels des objets de collection. Retrouvez œuvres, prix, disponibilités et relations clients depuis Gmail, WhatsApp et Gallery OS.",
  alternates: alternates("fr", "/"),
  openGraph: {
    url: "/fr",
    title:
      "Vitreen — Outils de vente et inventaire pour l’art, le design et les objets de collection",
    description:
      "Vitreen propose des outils de vente et de gestion d’inventaire pour les galeries d’art, marchands de design et professionnels des objets de collection. Retrouvez œuvres, prix, disponibilités et relations clients depuis Gmail, WhatsApp et Gallery OS.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />
      <LandingHeroFr />
      <LandingOutputsFr />
      <LandingRecognitionFr />
      <LandingRelationshipsFr />
      <WhoVitreenIsFor lang="fr" />
      <LandingOffersFr />
      <LandingFaqFr />
      <StatementSplit />
      <LandingCtaFr />
    </main>
  );
}
