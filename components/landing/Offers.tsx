"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, H3 } from "@/components/landing/styles";

/*
 * The two offer cards and the shared "included" list, used by the home
 * (LandingOffers / LandingOffersFr) and /pricing (PricingPage / PricingPageFr).
 * Any pricing change happens here, in both languages.
 */

type Offer = {
  title: string;
  badge?: string;
  price: string;
  per: string;
  terms: string;
  description: string;
  cta: string;
  featured?: boolean;
};

type Copy = {
  offers: [Offer, Offer];
  includedTitle: string;
  included: { title: string; detail: string }[];
  notes: string[];
};

const COPY: Record<"en" | "fr", Copy> = {
  en: {
    offers: [
      {
        title: "Founding gallery",
        badge: "3 places",
        price: "€149",
        per: "/month",
        terms: "3-month minimum, then month to month",
        description:
          "For our first three galleries. Your price never changes while you stay. In return: 20 minutes of feedback every two weeks for three months.",
        cta: "Apply as a founding gallery",
        featured: true,
      },
      {
        title: "Vitreen",
        price: "€249",
        per: "/month",
        terms: "No commitment · or €199/month billed yearly",
        description: "The public price, once the founding places are taken.",
        cta: "Talk to us",
      },
    ],
    includedTitle: "Included in both",
    included: [
      {
        title: "Inventory",
        detail:
          "Your artworks, artists, prices and availability, imported from your spreadsheets or Artlogic exports.",
      },
      {
        title: "Gmail add-in",
        detail:
          "Find a work, insert it into your reply and see the collector’s history — without leaving Gmail.",
      },
      {
        title: "WhatsApp assistant",
        detail:
          "A number for your team: ask for a work, get its details or a PDF, ready to forward to the collector.",
      },
      {
        title: "AI assistant",
        detail: "Prepares your replies from your records only. You review, you send.",
      },
      {
        title: "Conversations",
        detail:
          "Each collector’s history: what they asked for and received through Vitreen, and when to follow up.",
      },
      {
        title: "Private selections and PDFs",
        detail: "A private link or a PDF of the chosen works, generated from your inventory.",
      },
      {
        title: "Unlimited users",
        detail: "Your whole team, with no per-person fee.",
      },
      {
        title: "Setup in about a week",
        detail: "We import your inventory, connect Gmail and WhatsApp, and train your team.",
      },
    ],
    notes: [
      "Founding galleries also get early access to WhatsApp conversation capture.",
      "Quoted separately: a full Artlogic takeover with data cleanup, and custom work.",
    ],
  },
  fr: {
    offers: [
      {
        title: "Galerie fondatrice",
        badge: "3 places",
        price: "149 €",
        per: "/mois",
        terms: "3 mois minimum, puis au mois",
        description:
          "Pour nos trois premières galeries. Votre prix ne change pas tant que vous restez. En échange : 20 minutes de retours toutes les deux semaines pendant trois mois.",
        cta: "Candidater comme galerie fondatrice",
        featured: true,
      },
      {
        title: "Vitreen",
        price: "249 €",
        per: "/mois",
        terms: "Sans engagement · ou 199 €/mois payé à l’année",
        description: "Le prix public, une fois les places fondatrices prises.",
        cta: "Nous contacter",
      },
    ],
    includedTitle: "Inclus dans les deux",
    included: [
      {
        title: "Inventaire",
        detail:
          "Vos œuvres, artistes, prix et disponibilités, importés depuis vos tableurs ou exports Artlogic.",
      },
      {
        title: "Add-in Gmail",
        detail:
          "Retrouvez une œuvre, insérez-la dans votre réponse et voyez l’historique du collectionneur — sans quitter Gmail.",
      },
      {
        title: "Assistant WhatsApp",
        detail:
          "Un numéro pour votre équipe : demandez une œuvre, recevez sa fiche ou un PDF, prêt à transférer au collectionneur.",
      },
      {
        title: "Assistant IA",
        detail:
          "Prépare vos réponses uniquement à partir de vos fiches. Vous relisez, vous envoyez.",
      },
      {
        title: "Conversations",
        detail:
          "L’historique de chaque collectionneur : ce qu’il a demandé et reçu via Vitreen, et quand le relancer.",
      },
      {
        title: "Sélections privées et PDF",
        detail: "Un lien privé ou un PDF avec les œuvres choisies, généré depuis votre inventaire.",
      },
      {
        title: "Utilisateurs illimités",
        detail: "Toute votre équipe, sans surcoût par personne.",
      },
      {
        title: "Installation en une semaine environ",
        detail:
          "Nous importons votre inventaire, connectons Gmail et WhatsApp et formons votre équipe.",
      },
    ],
    notes: [
      "Les galeries fondatrices ont aussi un accès anticipé à la capture des conversations WhatsApp.",
      "Devisé à part : reprise complète d’Artlogic avec nettoyage des données, et travail sur mesure.",
    ],
  },
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ADADAA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      className={`flex flex-col rounded-[12px] p-6 md:p-8 ${offer.featured ? "bg-[#F5F5F3]" : "border border-[#E8E8E6] bg-white"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-[20px] tracking-[-0.02em] text-[#111110] md:text-[22px]">
          {offer.title}
        </h3>
        {offer.badge ? (
          <span className="rounded-full border border-[#DCDCD8] px-3 py-1 text-[12px] text-[#6B6A67]">
            {offer.badge}
          </span>
        ) : null}
      </div>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-[36px] tracking-[-0.03em] text-[#111110] md:text-[40px]">
          {offer.price}
        </span>
        <span className="text-[15px] text-[#6B6A67]">{offer.per}</span>
      </p>
      <p className="mt-1 text-[13px] text-[#6B6A67]">{offer.terms}</p>

      <p className={`${BODY_SM} mt-6 mb-8`}>{offer.description}</p>

      <Button
        size="md"
        variant={offer.featured ? "primary" : "inverse"}
        onClick={openContact}
        className="mt-auto w-full border border-[#E8E8E6]"
      >
        {offer.cta}
      </Button>
    </article>
  );
}

export function Offers({ lang }: { lang: "en" | "fr" }) {
  const copy = COPY[lang];
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        {copy.offers.map((offer) => (
          <OfferCard key={offer.title} offer={offer} />
        ))}
      </div>

      <div className="mt-6 rounded-[12px] border border-[#E8E8E6] p-6 md:p-8">
        <h3 className={H3}>{copy.includedTitle}</h3>
        <ul className="mt-6 grid list-none gap-x-10 gap-y-5 pl-0 sm:grid-cols-2">
          {copy.included.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <CheckIcon />
              <div>
                <p className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111110] md:text-[15px]">
                  {item.title}
                </p>
                <p className="mt-1 text-[13px] leading-[1.5] text-[#6B6A67] md:text-[14px]">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-1 border-t border-[#E8E8E6] pt-5">
          {copy.notes.map((note) => (
            <p key={note} className="text-[13px] leading-[1.5] text-[#6B6A67]">
              {note}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
