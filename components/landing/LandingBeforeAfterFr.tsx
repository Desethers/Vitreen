"use client";

import { BeforeAfterSection, type BeforeAfterCopy } from "@/components/landing/LandingBeforeAfter";

const COPY: BeforeAfterCopy = {
  title: "Votre galerie, avant et après Vitreen.",
  subtitle: "Les mêmes collectionneurs. Les mêmes œuvres. Moins de recherches.",
  before: {
    label: "Avant",
    items: [
      "« Est-elle toujours disponible ? » Vous fouillez dossiers, tableurs et vieux emails.",
      "Le prix est dans un fichier, l’image dans un autre.",
      "Personne ne se souvient de ce que Marie a reçu le mois dernier.",
      "Votre CRM est vide. Encore.",
      "Un collègue part. Ses collectionneurs partent avec lui.",
    ],
  },
  after: {
    label: "Après",
    items: [
      "L’œuvre, son prix et sa disponibilité, là où vous répondez.",
      "Chaque demande reliée au collectionneur et à l’œuvre.",
      "Vous voyez qui a reçu quoi, et qui l’a ouvert.",
      "Chaque matin : qui attend, qui relancer.",
      "La galerie se souvient, même quand une personne oublie.",
    ],
  },
};

export default function LandingBeforeAfterFr() {
  return <BeforeAfterSection copy={COPY} />;
}
