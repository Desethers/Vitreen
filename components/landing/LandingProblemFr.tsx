"use client";

import { BODY, CONTAINER, H2, H3, LINE_INK, SECTION } from "@/components/landing/styles";

const BENEFITS = [
  "Retrouvez la bonne œuvre plus vite.",
  "Vérifiez le prix et la disponibilité exacts.",
  "Partagez un support prêt pour le collectionneur, immédiatement.",
];

const LIMITS = [
  "Pas de remplacement de votre base existante.",
  "Pas de seconde plateforme de vente.",
  "Pas de présentation à refaire de zéro.",
];

export default function LandingProblemFr() {
  return (
    <>
      <section className={`${SECTION} bg-white`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-3xl`}>
            Les informations de vos œuvres et vos conversations collectionneurs vivent dans des
            endroits différents.
          </h2>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div className="max-w-xl space-y-4">
              <p className={BODY}>Un collectionneur demande les œuvres disponibles.</p>
              <p className={BODY}>
                L’email reste ouvert pendant qu’on vérifie la base, cherche les images, confirme le
                prix et refait une présentation.
              </p>
              <p className={`${LINE_INK} pt-1`}>Vitreen relie ces étapes.</p>
            </div>

            <ul className="flex list-none flex-col gap-0 p-0">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="border-t border-[#E8E8E6] py-4 last:border-b md:py-5">
                  <p className={H3}>{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div>
              <h2 className={`${H2} max-w-2xl`}>
                Votre base stocke les œuvres. Vitreen vous aide à vous en servir.
              </h2>
              <div className="mt-6 max-w-xl space-y-4 md:mt-8">
                <p className={BODY}>
                  Vitreen ajoute une couche commerciale pratique aux outils que votre galerie
                  utilise déjà.
                </p>
                <p className={BODY}>
                  Nous connectons les informations d’œuvres nécessaires aux conversations avec les
                  collectionneurs, puis les rendons disponibles depuis Gmail et WhatsApp.
                </p>
              </div>
            </div>

            <ul className="flex list-none flex-col gap-0 self-start p-0">
              {LIMITS.map((limit) => (
                <li key={limit} className="border-t border-[#DCDCD8] py-4 last:border-b md:py-5">
                  <p className={LINE_INK}>{limit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
