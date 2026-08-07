"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

export default function LandingWhereYouSell() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid gap-10 md:grid-cols-2 md:items-center md:gap-16`}>
        <div>
          <p className={EYEBROW}>Where you sell</p>
          <h2 className={`${H2} mt-4 max-w-lg`}>
            Finally, your artwork inventory where you actually sell.
          </h2>
          <p className={`${BODY} mt-5 max-w-lg`}>
            Access works, images, prices and availability directly from Gmail and WhatsApp, whether
            you are at the gallery, at a fair or on the move.
          </p>
          <div className="mt-7">
            <Button size="lg" onClick={openContact}>
              Book a demo
            </Button>
          </div>
        </div>

        <div className="aspect-[4/3] w-full rounded-[12px] bg-[#F5F5F3] md:aspect-auto md:h-[320px]" />
      </div>
    </section>
  );
}
