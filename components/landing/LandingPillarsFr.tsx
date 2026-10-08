"use client";

import { PillarsSection, type PillarsCopy } from "@/components/landing/LandingPillars";

const COPY: PillarsCopy = {
  title: "Deux choses, un seul produit.",
  pillars: [
    {
      verb: "Vendre",
      title: "Vos œuvres, prêtes dans Gmail et WhatsApp.",
      body: "Retrouvez une œuvre, son prix et sa disponibilité, et envoyez-la là où le collectionneur a écrit.",
      link: "Voir les outils de vente",
      href: "#sell",
    },
    {
      verb: "Se souvenir",
      title: "Chaque collectionneur, en mémoire.",
      body: "Qui a demandé, ce que vous avez envoyé, qui attend. Le CRM se remplit pendant que vous travaillez.",
      link: "Voir la mémoire",
      href: "#remember",
    },
  ],
};

export default function LandingPillarsFr() {
  return <PillarsSection copy={COPY} />;
}
