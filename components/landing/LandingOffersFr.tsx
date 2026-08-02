"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const SEND_FEATURES = [
  "Modules Gmail et WhatsApp",
  "Recherche en langage naturel dans votre inventaire",
  "Sélections privées et export PDF",
  "Vos données d’œuvres connectées — exports Artlogic, tableurs ou base existante",
];

const AGENT_FEATURES = [
  "Réponses collectionneurs rédigées à partir de l’email reçu",
  "Alternatives proposées quand une œuvre est vendue",
  "Discrétion sur les prix gérée pour vous",
  "Répond dans la langue du collectionneur",
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
      className="mt-[3px] shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckIcon />
          <span className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111110]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Version française : deux barreaux d’une même échelle, pas un catalogue.
 * Send est la base (carte ouverte), Agent le même produit avec l’IA qui
 * rédige (carte pleine, recommandée). Site et Coaching passent dessous en
 * services — volontairement discrets.
 */
export default function LandingOffersFr() {
  return (
    <section id="services" className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Un inventaire, deux niveaux d’aide.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          L’un vous fait travailler plus vite. L’autre travaille à votre place.
        </p>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {/* Send — le barreau de base */}
          <div className="flex flex-col rounded-[12px] border border-[#E8E8E6] bg-white p-6 md:p-8">
            <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
              Vitreen Send
            </h3>
            <p className="mt-1.5 max-w-sm text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
              Vos œuvres, prêtes à partir depuis Gmail et WhatsApp.
            </p>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                450 €/mois
              </p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <FeatureList items={SEND_FEATURES} />

            <Button
              size="md"
              variant="inverse"
              onClick={openContact}
              className="mt-6 w-full border border-[#E8E8E6]"
            >
              Réserver une démo
            </Button>
          </div>

          {/* Agent — le barreau recommandé */}
          <div className="flex flex-col rounded-[12px] bg-[#F5F5F3] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
                Vitreen Agent
              </h3>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-normal leading-none text-[#6B6A67]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#168044]" aria-hidden />
                Recommandé
              </span>
            </div>
            <p className="mt-1.5 max-w-sm text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
              La réponse est déjà rédigée quand vous ouvrez l’email.
            </p>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                950 €/mois
              </p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <p className="mb-3 text-[13px] text-[#6B6A67]">Tout Send, plus :</p>
            <FeatureList items={AGENT_FEATURES} />

            <p className="mt-5 text-[12px] text-[#ADADAA]">Rien ne part sans votre clic.</p>

            <Button size="md" variant="primary" onClick={openContact} className="mt-6 w-full">
              Réserver une démo
            </Button>
          </div>
        </div>

        <p className="mt-6 text-[13px] leading-[1.5] text-[#6B6A67]">
          Les deux incluent un onboarding unique de 4 500 € — nous structurons votre inventaire pour
          que tout le reste reste exact. Partenariat de 12 mois, hébergement et support inclus.
        </p>

        {/* Services — sous l’échelle, volontairement discrets */}
        <div className="mt-12 border-t border-[#E8E8E6] pt-8 md:mt-16 md:pt-10">
          <p className={EYEBROW}>Également disponible</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110] md:text-[17px]">
                Site connecté
              </h3>
              <p className={`${BODY_SM} mt-1 max-w-sm`}>
                Un site construit sur le même inventaire, pour les galeries qui en ont besoin.
                Périmètre fixe, devis après un premier échange. Vous avez déjà un site ? Vitreen
                fonctionne à côté.
              </p>
            </div>
            <div>
              <h3 className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110] md:text-[17px]">
                Coaching IA
              </h3>
              <p className={`${BODY_SM} mt-1 max-w-sm`}>
                Des sessions pratiques pour intégrer l’IA au travail quotidien de la galerie — avec
                l’équipe qui construit l’IA des galeries. À partir de 400 € la session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
