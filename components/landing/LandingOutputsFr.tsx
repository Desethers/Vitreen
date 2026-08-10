"use client";

import { OutputsSection, type OutputsCopy } from "@/components/landing/LandingOutputs";

/* Mêmes mockups que la version EN — seuls les libellés changent (voir §6 i18n). */
const FR_COPY: OutputsCopy = {
  eyebrow: "Prêt à envoyer",
  title: "Un inventaire. Plusieurs façons de le faire travailler.",
  subtitle: "Gérez, répondez, partagez et publiez depuis un seul endroit.",
  labels: ["Base d’œuvres", "Gmail", "Add-ins WhatsApp", "Éditeur de sélections"],
  action: "Découvrir",
};

export default function LandingOutputsFr() {
  return <OutputsSection copy={FR_COPY} />;
}
