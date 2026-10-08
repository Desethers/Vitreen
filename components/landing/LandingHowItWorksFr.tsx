"use client";

import { HowItWorksSection, type HowItWorksCopy } from "@/components/landing/LandingHowItWorks";

const COPY: HowItWorksCopy = {
  eyebrow: "Comment ça marche",
  title: "Une boucle. Chaque réponse facilite la suivante.",
  subtitle: "Mis en place avec vous en une semaine environ.",
  steps: [
    {
      title: "Vous répondez",
      body: "Depuis Gmail ou WhatsApp, avec l’œuvre, son prix et sa disponibilité.",
    },
    {
      title: "Vitreen se souvient",
      body: "Ce qui a été demandé, ce que vous avez envoyé et s’il l’a ouvert, sur la fiche du collectionneur.",
    },
    {
      title: "Vous savez quoi faire ensuite",
      body: "Chaque matin, qui attend une réponse et qui relancer.",
    },
  ],
};

export default function LandingHowItWorksFr() {
  return <HowItWorksSection copy={COPY} />;
}
