"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

export default function LandingHeroFr() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-36 md:px-6 md:pb-20 md:pt-44">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="hero-fade-up m-0 mx-auto max-w-2xl text-balance text-[32px] leading-[1.2] tracking-[-0.04em] font-display md:text-[46px]"
            style={{ color: "#111110" }}
          >
            Nous construisons de meilleurs systèmes pour vendre l’art.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mx-auto mt-[16px] max-w-4xl text-[24px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67]">
            Vitreen connecte les informations de vos œuvres aux conversations avec vos
            collectionneurs, du premier contact jusqu’à la vente.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mt-[18px] flex flex-wrap items-center justify-center gap-3 md:mt-[22px]">
            <Button size="lg" onClick={openContact}>
              Réserver une démo
            </Button>
            <Button
              size="lg"
              href="#how-it-works"
              variant="inverse"
              className="border border-[#E8E8E6]"
            >
              Voir comment ça marche
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
