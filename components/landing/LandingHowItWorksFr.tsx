"use client";

import { HowItWorksSection, type HowItWorksCopy } from "@/components/landing/LandingHowItWorks";

const COPY: HowItWorksCopy = {
  eyebrow: "Mise en place",
  title: "Mis en place avec vous, en une semaine environ.",
  subtitle: "Rien à installer. Votre équipe garde WhatsApp.",
  steps: [
    {
      title: "Envoyez-nous votre inventaire",
      body: "Un tableur, un dossier d’images ou vos exports Artlogic. Nous le nettoyons et le chargeons.",
    },
    {
      title: "Nous connectons vos deux numéros",
      body: "Le numéro Assistant pour votre équipe, le numéro dédié pour vos collectionneurs.",
    },
    {
      title: "Votre équipe demande depuis WhatsApp",
      body: "Dès le premier jour : retrouver une œuvre, la préparer pour quelqu’un, voir qui attend.",
    },
  ],
};

export default function LandingHowItWorksFr() {
  return <HowItWorksSection copy={COPY} />;
}
