"use client";

import { Offers } from "@/components/landing/Offers";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export default function LandingOffersFr() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choisissez comment travailler avec Vitreen.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Trois places fondatrices, puis un prix public unique.
        </p>

        <div className="mt-10 md:mt-14">
          <Offers lang="fr" />
        </div>
      </div>
    </section>
  );
}
