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
  link: {
    eyebrow: "Lien",
    title: "Conversations et inventaire, dans une même fiche.",
    body: "Chaque demande et chaque œuvre envoyée avec Vitreen est rattachée au collectionneur et à l’œuvre : qui a demandé, qui l’a reçue, et si elle a été ouverte.",
    mock: {
      works: {
        title: "Œuvres évoquées",
        inventory: "Inventaire",
        items: [
          {
            image: "/artworks/painting-05.jpg",
            artist: "Sacha Elron",
            title: "Evening field",
            meta: "Disponible · 10 000 €",
          },
          {
            image: "/artworks/painting-03.jpg",
            artist: "Sacha Elron",
            title: "Crimson Field",
            meta: "Vendue · 9 500 €",
          },
          {
            image: "/artworks/painting-04.jpg",
            artist: "Sacha Elron",
            title: "Sage Interval",
            meta: "Disponible · 6 500 €",
          },
          {
            image: "/artworks/painting-10.jpg",
            artist: "Sacha Elron",
            title: "Amber Nocturne",
            meta: "Vendue · 14 000 €",
          },
        ],
      },
      usage: {
        title: "Usage et activité",
        tabs: [
          { label: "Sélections privées", count: 1 },
          { label: "Expositions", count: 0 },
          { label: "Historique des partages", count: 3 },
        ],
        summary: "2 consultées · 1 non ouverte",
        sends: [
          {
            name: "Anna Roche",
            pill: "Ouverte",
            tone: "blue",
            meta: "Carte e-mail · Ouverte le 30 sept. 2026",
          },
          {
            name: "Marie Beaumont",
            pill: "PDF consulté",
            tone: "emerald",
            meta: "PDF · Consulté le 10 sept. 2026",
          },
          {
            name: "Thomas Baur",
            pill: "Préparée",
            tone: "zinc",
            meta: "WhatsApp · Préparée le 15 sept. 2026",
          },
        ],
      },
      conversations: {
        title: "Conversations",
        rows: [
          {
            name: "Anna Roche",
            channel: "Gmail",
            state: "A ouvert la fiche",
            when: "il y a 6 jours",
          },
          {
            name: "Marie Beaumont",
            channel: "WhatsApp",
            state: "A écrit à propos de cette œuvre",
            when: "il y a 27 jours",
          },
        ],
      },
    },
  },
  memory: {
    eyebrow: "Mémoire",
    title: "Chaque échange avec un collectionneur, gardé en mémoire.",
    body: "Ses demandes et les œuvres que vous lui envoyez, depuis Gmail et WhatsApp, sont gardées sur sa fiche, avec les œuvres affichées à côté de chaque message.",
    mock: {
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
  },
  assistant: {
    eyebrow: "Assistant",
    title: "Votre brief de vente du matin.",
    body: "L’assistant lit cette mémoire pour vous dire qui attend une réponse et qui recontacter. Interrogez-le sur votre inventaire ou vos collectionneurs : il répond uniquement depuis vos fiches.",
    mock: {
      greeting: "Bonjour",
      placeholder: "Demandez à Vitreen…",
      hint: "L’assistant lit vos fiches — il ne peut rien envoyer.",
      frames: ["Une personne", "Une œuvre", "Une réponse", "Ma journée"],
      enter: "Entrée pour envoyer",
      question: "Qui attend une réponse ce matin ?",
      answerIntro: "Un collectionneur attend une réponse :",
      answerItems: [
        {
          title: "Marie Beaumont",
          rest: " a écrit sur WhatsApp le 9 septembre : « Evening field » est-elle toujours disponible, et quelles sont ses dimensions ?",
        },
      ],
      tools: "Depuis vos fiches · searchConversations",
      clear: "Effacer",
      now: "Maintenant",
      waiting: {
        id: "marie-beaumont",
        name: "Marie Beaumont",
        title: "Marie Beaumont vous a écrit à propos de « Autoportrait »",
        detail: "L’Autoportrait de Van Gogh est-il toujours disponible ?",
        channel: "Gmail",
        date: "14 mars",
        work: {
          image: "/artworks/van-gogh-self-portrait.jpg",
          artist: "Vincent van Gogh",
          title: "Autoportrait",
          status: "Disponible",
        },
      },
    },
  },
};

export default function LandingRelationshipsFr() {
  return <RelationshipsSection copy={FR_COPY} />;
}
