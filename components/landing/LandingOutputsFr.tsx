"use client";

import { OutputsSection, type OutputsCopy } from "@/components/landing/LandingOutputs";

/* Mêmes mockups que la version EN — seuls les libellés changent (voir §6 i18n). */
const FR_COPY: OutputsCopy = {
  labels: ["Base d’œuvres", "Gmail", "WhatsApp", "Sélections privées"],
  action: "Découvrir",
  heading: {
    eyebrow: "Vendre",
    title: "Vos œuvres, prêtes dans Gmail et WhatsApp.",
    subtitle: "Tout ce qu’il faut pour répondre, là où vous répondez déjà.",
  },
  captions: [
    "Retrouvez une œuvre, son prix et sa disponibilité.",
    "Insérez-la dans votre réponse Gmail.",
    "Demandez sur WhatsApp, recevez la fiche ou un PDF.",
    "Envoyez une sélection privée d’œuvres.",
  ],
  hrefs: [
    "/fr/tools/artwork-inventory",
    "/fr/tools/sales-assistant",
    "/fr/tools/sales-assistant",
    "/fr/tools/viewing-rooms",
  ],
};

export default function LandingOutputsFr() {
  return <OutputsSection copy={FR_COPY} />;
}
