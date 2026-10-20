"use client";

import { Offers } from "@/components/landing/Offers";
import { CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>Pricing</p>
        <h2 className={`${H2} mt-5`}>Simple pricing.</h2>
        <p className={H2_SUB}>One price, no commitment.</p>

        <div className="mt-10 md:mt-14">
          <Offers lang="en" />
        </div>
      </div>
    </section>
  );
}
