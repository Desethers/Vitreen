"use client";

import { ServicesGrid } from "@/components/Services";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export default function LandingProduct() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>What you receive</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Your artwork database, AI assistant, and add-ins for Gmail and WhatsApp.
        </p>

        <div className="mt-10 md:mt-12">
          <ServicesGrid />
        </div>
      </div>
    </section>
  );
}
