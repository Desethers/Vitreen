"use client";

import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";
import { OfferCard } from "@/components/landing/OfferCard";
import { PricingFaqItem } from "@/components/landing/PricingFaqItem";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY, BODY_SM, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

const SETUP = [
  "Import de l’inventaire",
  "Configuration de l’assistant IA",
  "Configuration Gmail et WhatsApp",
  "Formats email et PDF",
  "Formation de l’équipe",
  "Maintenance technique",
];

const PARTNER = [
  "Tout Setup inclus",
  "Session de travail mensuelle",
  "Accès direct au fondateur",
  "Améliorations de workflow",
  "Nouveaux formats et cas d’usage",
  "Évolution continue du produit",
];

const REPLACES = [
  {
    title: "Outil d’inventaire",
    cost: "Environ 200–300 €/mois",
    description: "Pour stocker et maintenir les fiches d’œuvres.",
  },
  {
    title: "Ressaisie par l’équipe",
    cost: "Plusieurs heures chaque semaine",
    description: "Pour recopier les mêmes informations dans les PDF et les emails.",
  },
];

const FAQ = [
  {
    q: "À qui appartiennent mes données ?",
    a: "À vous. Un export complet est possible à tout moment.",
  },
  {
    q: "Pourquoi un minimum de 6 mois sur Partner ?",
    a: "Partner est une relation de travail, pas un forfait — six mois suffisent pour voir de vraies améliorations dans votre workflow, pas juste un ajustement ponctuel.",
  },
  {
    q: "Que se passe-t-il si j’arrête ?",
    a: "Vous gardez vos données et votre système Vitreen. Un export complet est possible à tout moment.",
  },
  {
    q: "Combien de temps dure l’installation ?",
    a: "Environ trois semaines, du premier échange à l’utilisation des extensions Gmail et WhatsApp par votre équipe.",
  },
  {
    q: "Qui fait fonctionner le système au quotidien ?",
    a: "Votre équipe, en autonomie avec Vitreen. Si vous préférez un accompagnement plus direct, Partner inclut une session de travail mensuelle et un accès direct au fondateur.",
  },
];

export default function PricingPageFr() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />

      <section className={`${SECTION} pt-32 md:pt-40`}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>Tarifs</p>
          <h1 className={`${H2} mt-4 max-w-2xl`}>Un prix clair, aucune surprise.</h1>
          <p className={`${BODY} mt-5 max-w-2xl`}>
            Une installation unique, ou un partenariat suivi — deux façons de travailler avec
            Vitreen.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E8E8E6] bg-white px-4 pb-14 pt-0 md:px-6 md:pb-[72px]">
        <div className={CONTAINER}>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <OfferCard
              label="PROJET UNIQUE"
              title="Vitreen Setup"
              price="3 000 € une fois"
              description="Un système Vitreen complet et stable, installé pour votre galerie."
              items={SETUP}
              clarification="Le système livré reste stable. Les nouvelles fonctionnalités et évolutions de workflow ne sont pas incluses."
              cta="Choisir Setup"
            />
            <OfferCard
              label="PARTENARIAT SUIVI"
              title="Vitreen Partner"
              price="950 €/mois"
              subline="Minimum 6 mois"
              description="Vitreen reste à vos côtés pour accompagner votre équipe et faire évoluer le système dans le temps."
              items={PARTNER}
              cta="Choisir Partner"
              featured
            />
          </div>
          <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-[#6B6A67]">
            Le périmètre exact se définit lors d’un premier échange — c’est lui qui précise le devis
            final.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E8E8E6] bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>Ce que remplace Vitreen</h2>
          <div className="mt-8 border-t border-[#E8E8E6]">
            {REPLACES.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-b border-[#E8E8E6] py-6 md:grid-cols-[0.8fr_1fr_1.3fr] md:items-baseline md:gap-8"
              >
                <h3 className="font-display text-[16px] text-[#111110]">{item.title}</h3>
                <p className="text-[14px] text-[#111110]">{item.cost}</p>
                <p className={BODY_SM}>{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-display text-[20px] text-[#111110]">
            Un système, un interlocuteur.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E8E8E6] bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
        <div
          className={`${CONTAINER} grid gap-6 rounded-[12px] bg-[#F5F5F3] px-5 py-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8 md:p-10`}
        >
          <div>
            <p className={EYEBROW}>Programme pilote</p>
            <h2 className="mt-2.5 font-display text-[25px] font-normal leading-[1.15] tracking-[-0.025em] text-[#111110] md:mt-3 md:text-[26px] md:leading-[1.2] md:tracking-[-0.02em]">
              Trois galeries pilotes
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-[1.55] text-[#6B6A67] md:text-[14px] md:leading-relaxed">
              Les trois premières galeries bénéficient d’une installation Setup à tarif pilote, en
              échange d’une étude de cas publiée.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 md:mt-8 md:items-baseline">
              <span className="order-1 font-display text-[32px] leading-none tracking-[-0.035em] text-[#111110] md:order-3 md:text-[30px] md:leading-normal md:tracking-[-0.03em]">
                1 500 €
              </span>
              <span className="order-2 rounded-full border border-[#DEDEDA] bg-white px-2.5 py-1 text-[11px] font-medium text-[#111110]">
                −50 %
              </span>
              <span className="order-3 w-full text-[12px] text-[#ADADAA] line-through md:order-1 md:w-auto md:text-[14px]">
                3 000 €
              </span>
            </div>
            <p className="mt-2 text-[12px] text-[#6B6A67] md:mt-3">
              3 places — premier arrivé, premier servi.
            </p>
          </div>
          <Button size="md" onClick={openContact} className="w-full justify-center md:w-fit">
            Parlons-en
          </Button>
        </div>
      </section>

      <section className="border-t border-[#E8E8E6] bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>Questions sur l’offre</h2>
          <div className="mt-8">
            {FAQ.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      <LandingCtaFr />
    </main>
  );
}
