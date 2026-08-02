"use client";

import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const GUARANTEES = [
  "Groundée sur vos fiches d’œuvres",
  "Validation humaine, toujours",
  "Répond dans la langue du collectionneur",
  "Vos données restent à vous",
];

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
      className="shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Version française de LandingAi — moteur derrière Product, pas une 5e
 * offre : volontairement plus sobre que les mockups Gmail/WhatsApp (pas
 * d'ombre, pas de couleur).
 */
export default function LandingAiFr() {
  return (
    <section className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>Vitreen AI</p>
        <h2 className={`${H2} mt-4 max-w-2xl`}>
          Derrière chaque réponse, une IA qui a lu tout votre inventaire.
        </h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Quand un collectionneur écrit, Vitreen a déjà préparé le brouillon : les bonnes œuvres, le
          bon prix, la bonne langue. Elle ne peut répondre que depuis vos fiches — et rien ne part
          sans votre clic.
        </p>

        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-10">
          <ul className="flex flex-col gap-3 md:gap-4">
            {GUARANTEES.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckIcon />
                <span className={BODY_SM}>{item}</span>
              </li>
            ))}
          </ul>

          <div className="w-full max-w-sm rounded-[12px] border border-[#E8E8E6] bg-white p-4 md:p-5">
            <p className="text-[11px] text-[#ADADAA]">Message reçu — collectionneur</p>
            <p className="mt-1 text-[13px] leading-[1.5] text-[#111110]">
              « Avez-vous encore des œuvres de Marina Perez disponibles ? »
            </p>
            <div className="my-4 border-t border-dashed border-[#E1E1DE]" aria-hidden />
            <p className="text-[11px] text-[#ADADAA]">Vitreen AI — brouillon</p>
            <p className="mt-1 text-[13px] leading-[1.5] text-[#111110]">
              Deux œuvres disponibles — « Evening Field » et « Low Tide », sur demande. Envoi des
              détails en cours.
            </p>
            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full border border-[#E8E8E6] py-2 text-[12px] font-medium text-[#ADADAA]"
            >
              Relire et envoyer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
