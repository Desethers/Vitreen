"use client";

import { IntegrationsFrame } from "@/components/GalleryAssistantProductPage";
import { BODY, CONTAINER, EYEBROW, H2, LINE_INK, SECTION } from "@/components/landing/styles";

export default function LandingProblem() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
          <div>
            <p className={EYEBROW}>THE PROBLEM</p>
            <h2 className={`${H2} mt-4 max-w-xl`}>
              Selling art still means rebuilding the same material again and again.
            </h2>
            <p className={`${BODY} mt-5 max-w-xl`}>
              Artwork information is spread across folders, spreadsheets and previous PDFs. Every
              collector request means finding images, checking details and reopening InDesign to
              prepare another document.
            </p>
            <p className={`${LINE_INK} mt-6 max-w-xl`}>
              Vitreen turns that material into sales emails, WhatsApp messages and collector PDFs
              ready to send.
            </p>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-[12px] bg-white md:h-[380px]">
            <IntegrationsFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
