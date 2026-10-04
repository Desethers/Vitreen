"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import PhoneNotifications, {
  type PhoneArtwork,
  type PhoneChat,
  type PhoneNotification,
} from "@/components/landing/PhoneNotifications";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const NOTIFICATIONS: readonly PhoneNotification[] = [
  {
    initials: "MB",
    color: "#6B7FD7",
    name: "Marie Beaumont",
    subject: "Disponibilité — Autoportrait",
    time: "10:24",
    body: "L’Autoportrait de Van Gogh est-il toujours disponible ?",
  },
  {
    initials: "TB",
    color: "#C97B4A",
    name: "Thomas Baur",
    subject: "Van Gogh",
    time: "Hier",
    body: "Pourriez-vous m’envoyer le prix et les dimensions de l’Autoportrait ?",
  },
  {
    initials: "LM",
    color: "#4E9C82",
    name: "Léa Morin",
    subject: "Œuvres disponibles",
    time: "Il y a 2 jours",
    body: "Avez-vous d’autres œuvres de Van Gogh disponibles en ce moment ?",
  },
];

const CHAT: PhoneChat = {
  incoming: { text: "Bonjour, avez-vous encore les Tournesols de Van Gogh ?", time: "10:42" },
  outgoing: { text: "Bonjour Marie, oui — je vous envoie la fiche tout de suite.", time: "10:43" },
};

const ARTWORKS: readonly [PhoneArtwork, PhoneArtwork] = [
  {
    image: "/artworks/van-gogh-self-portrait.jpg",
    artist: "Vincent van Gogh",
    title: "Autoportrait",
    year: "1887",
    medium: "Huile sur carton d’artiste, marouflé sur panneau parqueté",
    size: "41 × 32,5 cm",
    price: "Prix sur demande",
    cta: "Se renseigner",
  },
  {
    image: "/artworks/van-gogh-sunflowers.jpg",
    artist: "Vincent van Gogh",
    title: "Les Tournesols",
    year: "1889",
    medium: "Huile sur toile",
    size: "95 × 73 cm",
    price: "Prix sur demande",
    cta: "Se renseigner",
  },
];

export default function LandingRecognitionFr() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid gap-10 md:grid-cols-[0.7fr_1fr] md:items-start md:gap-16`}>
        <div className="max-w-xl">
          <h2 className={H2}>Chaque vente commence par une conversation.</h2>
          <p className={H2_SUB}>La bonne information, prête à relire et à envoyer.</p>

          <p className="mt-6 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Un collectionneur demande d’autres œuvres.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Connectez votre WhatsApp et votre Gmail
            <span className="mx-2 inline-flex items-center align-middle" aria-hidden="true">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white">
                <img
                  src="/logos/whatsapp.svg"
                  alt=""
                  className="h-[18px] w-[18px] object-contain"
                />
              </span>
              <span className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white">
                <img
                  src="/logos/icon-gmail-96.png"
                  alt=""
                  className="h-[18px] w-[18px] object-contain"
                />
              </span>
            </span>
            à Vitreen.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Commence alors la recherche : images, prix, dimensions, disponibilités, anciens envois —
            dispersés entre tableurs, dossiers et emails.
          </p>

          <div className="mt-7">
            <Button size="lg" onClick={openContact}>
              Réserver une démo
            </Button>
          </div>
        </div>

        <PhoneNotifications
          notifications={NOTIFICATIONS}
          toMeLabel="à moi"
          chat={CHAT}
          artworks={ARTWORKS}
        />
      </div>
    </section>
  );
}
