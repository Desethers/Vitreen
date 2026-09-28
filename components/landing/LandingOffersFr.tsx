"use client";

import { OfferCard } from "@/components/landing/OfferCard";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

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

export default function LandingOffersFr() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choisissez comment travailler avec Vitreen.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Trois places fondatrices, puis un prix public unique.
        </p>

        <div className="mt-10 grid gap-6 px-8 md:mt-14 md:grid-cols-2 md:gap-8 md:px-20">
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
      </div>
    </section>
  );
}
