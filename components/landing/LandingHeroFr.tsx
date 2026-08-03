"use client";

import { ServicesGrid } from "@/components/Services";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

export default function LandingHeroFr() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-36 md:px-6 md:pb-20 md:pt-44">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-[22px] leading-[1.3] md:text-[30px]">
          <p className="hero-fade-up mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#ADADAA] md:mb-4">
            Outils de vente pour galeries d’art contemporain
          </p>

          <h1
            className="hero-fade-up m-0 max-w-xl text-balance leading-[inherit] tracking-[-0.04em] font-display"
            style={{ color: "#111110" }}
          >
            Donnez des superpouvoirs à votre galerie.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mt-[16px] max-w-lg leading-[inherit] tracking-[-0.02em] text-[#6B6A67]">
            Connectez des agents IA à votre inventaire d’œuvres et transformez vos données
            existantes en emails, sélections et PDF prêts pour vos collectionneurs, dans Gmail et
            WhatsApp.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mt-[18px] flex flex-wrap items-center gap-3 md:mt-[22px]">
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

          <p className="hero-fade-up hero-fade-up-delay mt-5 text-[13px] leading-[1.5] tracking-[-0.01em] text-[#ADADAA] md:text-[14px]">
            Fonctionne avec Artlogic, vos tableurs et vos bases d’œuvres existantes.
          </p>
        </div>

        <div className="hero-fade-up hero-fade-up-delay mt-10 md:mt-14">
          <ServicesGrid />
        </div>
      </div>
    </section>
  );
}
