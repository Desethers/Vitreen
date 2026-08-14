"use client";

import { OutputsSection, type OutputsCopy } from "@/components/landing/LandingOutputs";

/* Mêmes mockups que la version EN — seuls les libellés changent (voir §6 i18n). */
const FR_COPY: OutputsCopy = {
  labels: ["Base d’œuvres", "Gmail", "Add-ins WhatsApp", "Éditeur de sélections"],
  action: "Découvrir",
  hrefs: ["/fr/products/archive"],
};

export default function LandingOutputsFr() {
  return <OutputsSection copy={FR_COPY} />;
}
