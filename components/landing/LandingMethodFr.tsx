"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, H2, H3, SECTION } from "@/components/landing/styles";

const STEPS = [
  {
    title: "Audit",
    text: "Nous examinons comment votre galerie stocke les informations d’œuvres, traite les demandes et prépare le support collectionneur.",
  },
  {
    title: "Connexion",
    text: "Nous connectons les champs, images et documents nécessaires à votre fonctionnement.",
  },
  {
    title: "Configuration",
    text: "Nous adaptons Gmail, WhatsApp et les formats de présentation à votre galerie.",
  },
  {
    title: "Amélioration",
    text: "Votre équipe utilise le système en autonomie, ou continue avec Vitreen via l’offre Partner.",
  },
];

const SCENARIO = [
  "Un collectionneur demande les œuvres disponibles d’un artiste.",
  "La galerie effectue la recherche depuis Gmail.",
  "Vitreen affiche les œuvres, prix et disponibilités à jour.",
  "La galerie sélectionne quatre œuvres.",
  "Une présentation privée est insérée dans la réponse.",
];

export default function LandingMethodFr() {
  return (
    <div id="how-it-works">
      {/* Méthode */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>
            Construit autour de la façon dont votre galerie fonctionne déjà.
          </h2>

          <ol className="mt-8 grid list-none gap-0 p-0 md:mt-12 md:grid-cols-4 md:gap-10">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="border-t border-[#E8E8E6] py-5 last:border-b md:border-b-0 md:py-0 md:pt-6 md:last:border-b-0"
              >
                <span className="text-[11px] tabular-nums text-[#ADADAA]">0{index + 1}</span>
                <h3 className={`${H3} mt-2`}>{step.title}</h3>
                <p className={`${BODY_SM} mt-2.5`}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Déroulé d'une demande */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>
            Voyez une demande de collectionneur traitée de bout en bout.
          </h2>

          <ol className="mt-8 flex list-none flex-col gap-0 p-0 md:mt-10 md:max-w-3xl">
            {SCENARIO.map((line, index) => (
              <li
                key={line}
                className="flex items-start gap-4 border-t border-[#DCDCD8] py-4 last:border-b md:gap-6 md:py-5"
              >
                <span className="mt-[3px] shrink-0 text-[11px] tabular-nums text-[#ADADAA]">
                  0{index + 1}
                </span>
                <span className="text-[15px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[17px]">
                  {line}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 md:mt-10">
            <Button size="lg" onClick={openContact}>
              Réserver une démo en direct
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
