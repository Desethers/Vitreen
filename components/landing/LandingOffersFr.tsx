"use client";

import { OfferCard } from "@/components/landing/OfferCard";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const SETUP = [
  "Migration de la base d’œuvres",
  "Artistes, œuvres, images, prix et disponibilité",
  "Add-in Gmail",
  "Outils de vente WhatsApp",
  "Configuration Gmail et WhatsApp",
  "Configuration de l’assistant IA",
  "Éditeur de sélections et suivi",
  "Prise en main de l’équipe",
];

const PARTNER = [
  "Session de travail mensuelle",
  "Améliorations de workflow",
  "Nouveaux formats email et PDF",
  "Formation et accompagnement de l’équipe",
  "Configuration de l’assistant IA",
  "Accompagnement inventaire et données",
  "Assistance technique prioritaire",
];

export default function LandingOffersFr() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choisissez comment travailler avec Vitreen.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Utilisez nos outils seuls, ou faites-les évoluer avec nous chaque mois.
        </p>

        <div className="mt-10 grid gap-6 px-8 md:mt-14 md:grid-cols-2 md:gap-8 md:px-20">
          <OfferCard
            title="Vitreen Sales"
            price="390 €/mois"
            subline="Engagement 12 mois · Installation incluse"
            description="Nous installons le système dont votre galerie a besoin aujourd’hui : base d’œuvres et outils de vente pour vos collectionneurs."
            items={SETUP}
            clarification="Livré en ~3 semaines."
            cta="Démarrer avec Vitreen"
            featured
          />
          <OfferCard
            title="Vitreen Partner"
            price="590 €/mois"
            subline="Engagement 12 mois · Accompagnement continu inclus"
            description="Gardez Vitreen impliqué pour faire évoluer le système à mesure que votre galerie, votre équipe et vos workflows collectionneurs évoluent."
            items={PARTNER}
            cta="Travailler avec Vitreen"
          />
        </div>
      </div>
    </section>
  );
}
