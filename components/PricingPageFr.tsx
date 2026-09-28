"use client";

import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";
import { OfferCard } from "@/components/landing/OfferCard";
import { PricingFaqItem } from "@/components/landing/PricingFaqItem";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB } from "@/components/landing/styles";

const INCLUDED = [
  "Utilisateurs illimités",
  "Import de l’inventaire depuis vos tableurs ou exports Artlogic",
  "Add-in Gmail",
  "Assistant WhatsApp",
  "Assistant IA, groundé sur vos fiches",
  "Conversations : l’historique de chaque collectionneur au même endroit",
  "Sélections privées et PDF",
  "Prise en main de l’équipe",
];

const FOUNDING = [...INCLUDED, "Accès anticipé à la capture des conversations WhatsApp"];

const REPLACES = [
  {
    title: "Outil d’inventaire",
    cost: "Environ 200–300 €/mois",
    description: "Pour stocker et maintenir les fiches d’œuvres.",
  },
  {
    title: "Agence ou prestataire web",
    cost: "Environ 4 000–8 000 € + frais par modification",
    description: "Pour construire le site puis intervenir à chaque changement.",
  },
  {
    title: "Ressaisie par l’équipe",
    cost: "Plusieurs heures chaque semaine",
    description: "Pour recopier les mêmes informations dans le site, les PDF et les emails.",
  },
];

const WEBSITE_FEATURES = [
  {
    title: "Toujours à jour",
    description: "Depuis votre inventaire.",
  },
  {
    title: "Sans développeur",
    description: "Modifiable à tout moment.",
  },
  {
    title: "Votre propre design",
    description: "Pas un modèle générique.",
  },
  {
    title: "En tête sur Google",
    description: "Faites pour être trouvées.",
  },
  {
    title: "Demandes dans Gmail",
    description: "Aucun outil supplémentaire.",
  },
  {
    title: "Dès 4 500 €",
    description: "Devisé séparément.",
    dark: true,
  },
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

const FAQ = [
  {
    q: "À qui appartiennent mes données ?",
    a: "À vous. Un export complet est possible à tout moment.",
  },
  {
    q: "Qu’est-ce qu’une galerie fondatrice ?",
    a: "L’une des trois premières galeries sur Vitreen : 149 €/mois au lieu de 249 €, conservés tant que vous restez, en échange de retours réguliers pendant que nous construisons.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "Les galeries fondatrices s’engagent trois mois, le temps de couvrir l’installation — ensuite, c’est au mois. Au prix public, il n’y a pas d’engagement, ou 199 €/mois si vous payez à l’année.",
  },
  {
    q: "Que se passe-t-il si j’arrête ?",
    a: "Vous gardez vos données. Un export complet est possible à tout moment.",
  },
  {
    q: "Combien de temps dure l’installation ?",
    a: "Une semaine environ : nous importons votre inventaire, connectons Gmail et WhatsApp, et accompagnons la prise en main de votre équipe.",
  },
  {
    q: "Qui fait fonctionner le système au quotidien ?",
    a: "Votre équipe, en autonomie avec Vitreen. Les galeries fondatrices ont aussi une ligne directe avec le fondateur.",
  },
];

export default function PricingPageFr() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />

      <section className="px-4 pt-32 md:px-6 md:pt-40">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={EYEBROW}>Tarifs</p>
            <h1 className={`${H2} mt-4`}>Un prix clair, aucune surprise.</h1>
            <p className={H2_SUB}>
              Commencez avec le système dont votre galerie a besoin aujourd’hui.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <OfferCard
                label="Galeries fondatrices · 3 places"
                title="Galerie fondatrice"
                price="149 €/mois"
                subline="3 mois minimum, puis sans engagement · Installation incluse"
                description="Pour les trois premières galeries. Votre prix reste le même tant que vous restez — en échange, vous nous aidez à façonner le produit."
                items={FOUNDING}
                clarification="En échange : 20 minutes de retours toutes les deux semaines pendant les trois premiers mois."
                cta="Candidater comme galerie fondatrice"
                featured
              />
              <OfferCard
                title="Vitreen"
                price="249 €/mois"
                priceMonthly="ou 199 €/mois payé à l’année"
                subline="Sans engagement · Installation incluse"
                description="Le prix public, une fois les places fondatrices prises."
                items={INCLUDED}
                clarification="Installé en une semaine environ."
                cta="Nous contacter"
              />
            </div>

            <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-[#6B6A67]">
              Les migrations lourdes (reprise complète d’Artlogic avec nettoyage des données) et le
              travail sur mesure sont devisés séparément.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
        <div className={CONTAINER}>
          <div className="grid gap-8 md:grid-cols-[5fr_7fr] md:items-start md:gap-12">
            <div>
              <p className={EYEBROW}>Étendre Vitreen</p>
              <h3 className="mt-3 font-display text-[24px] leading-[1.2] tracking-[-0.01em] text-[#111110] md:text-[28px]">
                Pourquoi attendre un développeur <br className="hidden md:block" />
                pour mettre à jour le site de la galerie ?
              </h3>
              <p className={`${BODY_SM} mt-4 max-w-sm`}>
                Mettez à jour le site de la galerie directement depuis votre base d’œuvres. Gardez
                artistes, expositions et œuvres à jour sans dépendre d’un développeur.
              </p>
              <Button
                size="md"
                onClick={openContact}
                className="mt-6 w-full border border-[#E8E8E6] md:w-fit"
              >
                Discuter du projet de site
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {WEBSITE_FEATURES.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-3 rounded-[12px] p-5 ${item.dark ? "bg-[#111110]" : "bg-[#F5F5F3]"}`}
                >
                  <CheckIcon />
                  <div>
                    <h4
                      className={`font-display text-[15px] ${item.dark ? "text-white" : "text-[#111110]"}`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`mt-1.5 text-[13px] leading-[1.5] ${item.dark ? "text-[#ADADAA]" : "text-[#6B6A67]"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
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

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
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
