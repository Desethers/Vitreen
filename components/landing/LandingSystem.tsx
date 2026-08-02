"use client";

import { ConnectedFlowDiagram } from "@/components/landing/LandingMockups";
import { BODY, BODY_SM, CONTAINER, H2, H3, SECTION } from "@/components/landing/styles";

const BENEFITS = [
  {
    title: "Respond while the interest is active.",
    text: "Prepare complete collector material without moving between your database, folders and presentation files.",
  },
  {
    title: "Keep every presentation accurate.",
    text: "Prices, availability, images and artwork details come from the same connected source.",
  },
  {
    title: "Stop rebuilding the same material.",
    text: "Reuse artwork information across emails, WhatsApp, private links and PDFs.",
  },
];

export default function LandingSystem() {
  return (
    <>
      {/* One source, many outputs */}
      <section className={`${SECTION} bg-white`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>One artwork source. Every collector output.</h2>

          <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
            <div className="mx-auto w-full max-w-lg">
              <ConnectedFlowDiagram />
            </div>

            <div className="max-w-xl space-y-4">
              <p className={BODY}>
                Vitreen connects the information your team already maintains: artworks, artists,
                images, dimensions, prices, availability and documents.
              </p>
              <p className={BODY}>
                The same reliable information can then be reused wherever the collector conversation
                happens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`${SECTION} bg-white pt-0 md:pt-0`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>Less preparation between interest and reply.</h2>

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
