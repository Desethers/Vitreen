"use client";

import { CONTAINER, EYEBROW, H2, H3, SECTION } from "@/components/landing/styles";

const STEPS = [
  {
    number: "01",
    title: "Importez votre inventaire",
    text: "Depuis un CSV, Excel ou Artlogic. Nous importons tout et vos données restent confidentielles.",
  },
  {
    number: "02",
    title: "Accédez",
    text: "Retrouvez œuvres, images, prix et disponibilité directement dans Gmail et WhatsApp.",
  },
  {
    number: "03",
    title: "Envoyez",
    text: "Envoyez des documents professionnels par Gmail, WhatsApp, PDF ou sélection privée en quelques clics.",
  },
];

export default function LandingHowItWorksFr() {
  return (
    <section id="how-it-works" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>Comment ça marche</p>
        <h2 className={`${H2} mt-4 max-w-2xl`}>
          De votre base d’œuvres à la réponse au collectionneur.
        </h2>

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="rounded-[12px] border border-[#E8E8E6] p-6 md:p-7"
            >
              <p className="text-[13px] text-[#ADADAA]">{step.number}</p>
              <h3 className={`${H3} mt-3`}>{step.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
