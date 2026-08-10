"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

export default function LandingWhereYouSellFr() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid gap-10 md:grid-cols-2 md:items-center md:gap-16`}>
        <div>
          <p className={EYEBROW}>Là où vous vendez</p>
          <h2 className={`${H2} mt-4 max-w-lg`}>
            Enfin votre base d’œuvres là où vous vendez vraiment.
          </h2>
          <p className={`${BODY} mt-5 max-w-lg`}>
            Accédez aux œuvres, images, prix et disponibilités directement depuis Gmail et WhatsApp,
            que vous soyez à la galerie, sur une foire ou en déplacement.
          </p>
          <div className="mt-7">
            <Button size="lg" onClick={openContact}>
              Réserver une démo
            </Button>
          </div>
        </div>

        <div className="aspect-[4/3] w-full rounded-[12px] bg-[#F5F5F3] md:aspect-auto md:h-[320px]" />
      </div>
    </section>
  );
}
