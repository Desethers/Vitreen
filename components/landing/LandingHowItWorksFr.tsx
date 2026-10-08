"use client";

import { HowItWorksSection, type HowItWorksCopy } from "@/components/landing/LandingHowItWorks";

const COPY: HowItWorksCopy = {
  eyebrow: "Comment ça marche",
  title: "Connecter. Relier. Savoir.",
  subtitle: "Trois étapes, mises en place avec vous en une semaine environ.",
  steps: [
    {
      title: "Connecter",
      body: "Gmail, WhatsApp et votre inventaire, importé depuis vos tableurs ou vos exports Artlogic.",
    },
    {
      title: "Relier",
      body: "Chaque demande est rattachée au collectionneur et à l’œuvre : qui a demandé, ce que vous avez envoyé, s’il l’a ouvert.",
    },
    {
      title: "Savoir",
      body: "Chaque matin, Vitreen vous dit qui attend une réponse, qui relancer et ce que chaque collectionneur a déjà vu.",
    },
  ],
};

export default function LandingHowItWorksFr() {
  return <HowItWorksSection copy={COPY} />;
}
