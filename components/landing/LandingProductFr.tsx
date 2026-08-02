"use client";

import { GalleryOsSearchWidget, WhatsAppPdfMockup } from "@/components/shared/ArtworkAddInMocks";
import {
  BODY_SM,
  CONTAINER,
  EYEBROW,
  H2,
  H2_SUB,
  LINE_INK,
  SECTION,
} from "@/components/landing/styles";

const GMAIL_FLOW = [
  {
    step: "Rechercher",
    text: "Retrouvez les œuvres par artiste, titre, année, disponibilité ou prix.",
  },
  {
    step: "Sélectionner",
    text: "Choisissez les œuvres et les informations adaptées au collectionneur.",
  },
  { step: "Insérer", text: "Ajoutez des fiches d’œuvres, un lien privé ou un PDF à l’email." },
];

const WHATSAPP_QUERIES = [
  "Œuvres disponibles de Marina Perez à moins de 20 000 €",
  "Créer une sélection avec ces quatre œuvres",
  "Préparer un PDF sans les prix visibles",
];

export default function LandingProductFr() {
  return (
    <div id="product">
      {/* Add-in Gmail */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className={EYEBROW}>Vitreen pour Gmail</p>
              <h2 className={`${H2} mt-4 max-w-md`}>Préparez la réponse sans quitter l’email.</h2>
              <p className={`${H2_SUB} max-w-md`}>
                Recherchez des œuvres, vérifiez la disponibilité et insérez images, informations,
                prix, documents ou une sélection privée directement dans le message en cours
                d’écriture.
              </p>

              <ul className="mt-8 flex list-none flex-col gap-5 p-0">
                {GMAIL_FLOW.map((item, index) => (
                  <li key={item.step} className="flex items-start gap-4">
                    <span className="mt-[3px] text-[11px] tabular-nums text-[#ADADAA]">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="font-display text-[15px] tracking-[-0.01em] text-[#111110] md:text-[16px]">
                        {item.step}
                      </span>
                      <p className={`${BODY_SM} mt-0.5 max-w-xs`}>{item.text}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center overflow-hidden rounded-[16px] bg-[#F5F5F3] px-6 py-10 md:max-w-none md:px-10 md:py-16">
              <div className="w-full max-w-[280px] rounded-[12px] border border-[#E8E8E6] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <GalleryOsSearchWidget
                  insertLabel="Insérer une œuvre"
                  searchLabel="Recherche Vitreen"
                  searchCta="Chercher"
                  galleryViewCta="Vue galerie"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assistant WhatsApp */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className="order-2 relative mx-auto flex w-full max-w-sm items-center justify-center overflow-hidden rounded-[16px] bg-white px-6 py-10 md:order-1 md:max-w-none md:px-10 md:py-16">
              <div className="w-full max-w-[280px] rounded-[16px] border border-[#E8E8E6] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <WhatsAppPdfMockup
                  incomingLabel="Constitution de votre sélection..."
                  readyLabel="Sélection prête · 1 page"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className={EYEBROW}>Vitreen pour WhatsApp</p>
              <h2 className={`${H2} mt-4 max-w-sm`}>Transformez un message en présentation.</h2>
              <p className={`${H2_SUB} max-w-sm`}>
                Retrouvez les œuvres correspondantes, contrôlez ce que voit le collectionneur et
                partagez un lien privé ou un PDF propre, sans télécharger d’images ni refaire un
                document.
              </p>

              <ul className="mt-8 flex list-none flex-col gap-2 p-0">
                {WHATSAPP_QUERIES.map((query) => (
                  <li
                    key={query}
                    className="rounded-[8px] border border-[#DCDCD8] bg-white px-4 py-3 text-[13px] leading-[1.45] tracking-[-0.01em] text-[#111110] md:text-[14px]"
                  >
                    « {query} »
                  </li>
                ))}
              </ul>

              <p className={`${LINE_INK} mt-8 max-w-md`}>
                Vitreen prépare le support. Votre galerie vérifie et l’envoie.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
