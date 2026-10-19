"use client";

import { Offers } from "@/components/landing/Offers";
import { CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export default function LandingOffersFr() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>Tarifs</p>
        <h2 className={`${H2} mt-5`}>Choisissez comment travailler avec Vitreen.</h2>
        <p className={H2_SUB}>Trois places fondatrices, puis un prix public unique.</p>

        <div className="mt-10 md:mt-14">
          <Offers lang="fr" />
        </div>
      </div>
    </section>
  );
}
