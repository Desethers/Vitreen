"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

export default function LandingHeroFr() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="hero-fade-up m-0 mx-auto max-w-2xl text-balance text-[36px] leading-[1.2] tracking-[-0.04em] font-display md:text-[52px]"
            style={{ color: "#111110" }}
          >
            Des outils pensés pour mieux vendre l’art.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mx-auto mt-[16px] max-w-4xl text-balance text-[20px] leading-[1.35] tracking-[0em] text-[#6B6A67]">
            Pour celles et ceux qui présentent, partagent et vendent des œuvres.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mt-[18px] flex flex-wrap items-center justify-center gap-3 md:mt-[22px]">
            <Button size="md" onClick={openContact}>
              Réserver une démo
            </Button>
            <Button
              size="md"
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
