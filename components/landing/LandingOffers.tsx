"use client";

import { Offers } from "@/components/landing/Offers";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choose how to work with Vitreen.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>Three founding places, then one public price.</p>

        <div className="mt-10 md:mt-14">
          <Offers lang="en" />
        </div>
      </div>
    </section>
  );
}
