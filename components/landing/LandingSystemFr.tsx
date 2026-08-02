"use client";

import { ConnectedFlowDiagram } from "@/components/landing/LandingMockups";
import { BODY, BODY_SM, CONTAINER, H2, H3, SECTION } from "@/components/landing/styles";

const BENEFITS = [
  {
    title: "Répondez pendant que l’intérêt est encore vif.",
    text: "Préparez un support collectionneur complet sans naviguer entre votre base, vos dossiers et vos fichiers de présentation.",
  },
  {
    title: "Gardez chaque présentation exacte.",
    text: "Prix, disponibilité, images et informations d’œuvres proviennent de la même source connectée.",
  },
  {
    title: "Arrêtez de refaire le même support.",
    text: "Réutilisez les informations d’œuvres dans les emails, WhatsApp, liens privés et PDF.",
  },
];

export default function LandingSystemFr() {
  return (
    <>
      {/* Une source, plusieurs sorties */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>
            Une seule source d’œuvres. Toutes les sorties collectionneur.
          </h2>

          <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
            <div className="mx-auto w-full max-w-lg">
              <ConnectedFlowDiagram
                sources={["Artlogic", "Tableurs CSV", "Base existante"]}
                layerTitle="Couche d’œuvres Vitreen"
                layerSubtitle="Œuvres, artistes, images, dimensions, prix, disponibilité, documents"
                outputs={["Gmail", "WhatsApp", "Liens privés", "PDF"]}
              />
            </div>

            <div className="max-w-xl space-y-4">
              <p className={BODY}>
                Vitreen connecte les informations que votre équipe maintient déjà : œuvres,
                artistes, images, dimensions, prix, disponibilité et documents.
              </p>
              <p className={BODY}>
                Cette même information fiable peut ensuite être réutilisée partout où la
                conversation avec le collectionneur a lieu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className={`${SECTION} bg-white pt-0 md:pt-0`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>Moins de préparation entre l’intérêt et la réponse.</h2>

          <div className="mt-8 grid gap-0 md:mt-12 md:grid-cols-3 md:gap-10">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="border-t border-[#E8E8E6] py-5 last:border-b md:border-b-0 md:py-0 md:pt-6 md:last:border-b-0"
              >
                <h3 className={H3}>{benefit.title}</h3>
                <p className={`${BODY_SM} mt-2.5 max-w-sm`}>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
