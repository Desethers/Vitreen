"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import HeroObjects from "@/components/landing/HeroObjects";

export default function LandingHeroFr() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="m-0 mx-auto max-w-7xl text-balance text-[clamp(30px,9vw,44px)] leading-[1.2] tracking-[-0.04em] font-display md:text-[68px]"
            style={{ color: "#111110" }}
          >
            <span className="hero-reveal hero-d-1 md:block">
              Pour vendre
              <HeroObjects object="poster" order={0} /> ce qui ne se vend pas
            </span>{" "}
            <span className="hero-reveal hero-d-2 md:block">
              comme
              <HeroObjects object="chair" order={1} /> le reste
              <HeroObjects object="dog" order={2} spaceAfter={false} />.
            </span>
          </h1>

          <p className="hero-soft hero-d-3 mx-auto mt-[16px] max-w-4xl text-balance text-[20px] leading-[1.35] tracking-[0em] text-[#6B6A67]">
            <span className="md:block">Des outils de vente et d’inventaire pour les galeries</span>{" "}
            <span className="md:block">
              et marchands d’art, de design et d’objets de collection.
            </span>
          </p>

          <div className="hero-soft hero-d-4 mx-auto mt-[18px] flex max-w-[300px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:mt-[22px]">
            <Button size="lg" onClick={openContact} className="w-full sm:w-auto">
              Réserver une démo
            </Button>
            <Button
              size="lg"
              href="#how-it-works"
              variant="inverse"
              className="w-full border border-[#E8E8E6] sm:w-auto"
            >
              Voir comment ça marche
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
