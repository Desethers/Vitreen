"use client";

import {
  RelationshipsSection,
  type RelationshipsCopy,
} from "@/components/landing/LandingRelationships";

const FR_COPY: RelationshipsCopy = {
  eyebrow: "Intelligence relationnelle",
  title: "Gardez en mémoire ce qui compte dans chaque relation avec un collectionneur.",
  intro:
    "Vitreen garde la mémoire de chaque conversation {gmail}Gmail et {whatsapp}WhatsApp, reliée aux œuvres dont vous parlez.",
  memory: {
    person: {
      id: "beaumont-marie",
      name: "Marie Beaumont",
      groups: "collection établie · Paris · priorité haute",
      email: "beaumont.marie@gmail.com",
      phone: "+33 6 12 34 56 78",
    },
    channels: { whatsapp: "WhatsApp", gmail: "Gmail" },
    timeline: "Chronologie",
    count: "16 moments",
    filters: [
      { label: "Tout", count: 16 },
      { label: "WhatsApp", count: 4 },
      { label: "Gmail", count: 2 },
      { label: "Rendez-vous", count: 3 },
      { label: "Notes", count: 5 },
      { label: "Sélections", count: 2 },
    ],

    today: "Aujourd’hui",
    todayDate: "6 octobre 2026",
    period: "Septembre",
    toPickUp: "À reprendre",

    exchange: {
      label: "Échange repéré",
      date: "9 sept.",
      text: "Vous a écrit à propos de « Evening field »",
      quote:
        "Bonsoir, Evening field est-elle toujours disponible ? Pouvez-vous me rappeler ses dimensions ?",
      work: { image: "/artworks/painting-05.jpg", artist: "Sacha Elron", title: "Evening field" },
      channel: "WhatsApp",
      action: "Ouvrir dans WhatsApp",
    },
  },
};

export default function LandingRelationshipsFr() {
  return <RelationshipsSection copy={FR_COPY} />;
}
