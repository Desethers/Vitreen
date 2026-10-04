"use client";

import {
  RelationshipsSection,
  type RelationshipsCopy,
} from "@/components/landing/LandingRelationships";

const FR_COPY: RelationshipsCopy = {
  eyebrow: "Intelligence relationnelle",
  title: "Le CRM où se garde la mémoire de vos conversations de vente.",
  subtitle: "Gmail, WhatsApp et votre inventaire l’alimentent. Rien à saisir.",
  intro:
    "Les demandes que vous recevez et les œuvres que vous envoyez, dans Gmail et WhatsApp, restent ensemble sur la fiche de chaque collectionneur. L’assistant lit cette mémoire pour préparer votre journée. Vous relisez, vous envoyez.",
  link: {
    eyebrow: "Lien",
    title: "Conversations et inventaire, dans une même fiche.",
    body: "Chaque demande et chaque œuvre envoyée avec Vitreen est rattachée au collectionneur et à l’œuvre : qui a demandé, qui l’a reçue, et si elle a été ouverte.",
    mock: {
      image: "/artworks/van-gogh-self-portrait.jpg",
      work: "Autoportrait",
      meta: "Vincent van Gogh · 1887",
      usedIn: "Utilisée dans",
      usedInSub: "Où vit cette œuvre en ce moment",
      rows: [
        {
          initials: "MB",
          color: "#6B7FD7",
          name: "Marie Beaumont",
          detail: "Envoyée par mail · 14 mars",
          tag: "Ouvert",
        },
        {
          initials: "AR",
          color: "#4E9C82",
          name: "Anna Roche",
          detail: "Sélection de printemps (PDF) · 2 mars",
          tag: "PDF consulté",
        },
        {
          initials: "TB",
          color: "#C97B4A",
          name: "Thomas Baur",
          detail: "Prix demandé · 18 février",
          tag: "Demande",
        },
      ],
    },
  },
  memory: {
    eyebrow: "Mémoire",
    title: "Chaque échange avec un collectionneur, gardé en mémoire.",
    body: "Ses demandes et les œuvres que vous lui envoyez, depuis Gmail et WhatsApp, sont gardées sur sa fiche, avec les œuvres affichées à côté de chaque message.",
    mock: {
      person: { initials: "MB", color: "#6B7FD7", name: "Marie Beaumont" },
      email: "mariebeaumont@gmail.com",
      channel: "Gmail",
      date: "14 mars",
      excerpt: "L’Autoportrait de Van Gogh est-il toujours disponible ?",
      works: [
        { image: "/artworks/van-gogh-self-portrait.jpg", title: "Autoportrait" },
        { image: "/artworks/van-gogh-sunflowers.jpg", title: "Les Tournesols" },
      ],
      followLabel: "À suivre",
      follow: "Envoyer la fiche des Tournesols",
    },
  },
  assistant: {
    eyebrow: "Assistant",
    title: "Votre brief de vente du matin.",
    body: "L’assistant lit cette mémoire pour vous dire qui attend une réponse et qui recontacter. Interrogez-le sur votre inventaire ou vos collectionneurs : il répond uniquement depuis vos fiches.",
    mock: {
      greeting: "Bonjour.",
      briefLabel: "À reprendre",
      briefChannel: "Gmail",
      brief: "Marie Beaumont attend une réponse au sujet de « Autoportrait ».",
      person: { initials: "MB", color: "#6B7FD7", name: "Marie Beaumont" },
      listTitle: "À suivre aujourd’hui",
      rows: [
        {
          initials: "MB",
          color: "#6B7FD7",
          name: "Marie Beaumont",
          reason: "Répondre à la demande",
          since: "14 mars",
        },
        {
          initials: "TB",
          color: "#C97B4A",
          name: "Thomas Baur",
          reason: "Message à relire",
          since: "Hier",
        },
        {
          initials: "AR",
          color: "#4E9C82",
          name: "Anna Roche",
          reason: "Reprendre contact",
          since: "2 mars",
        },
      ],
      question: "Qui m’a parlé de Van Gogh ?",
      answer: "Marie Beaumont et Thomas Baur.",
    },
  },
};

export default function LandingRelationshipsFr() {
  return <RelationshipsSection copy={FR_COPY} />;
}
