"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import HeroObjects from "@/components/landing/HeroObjects";

export default function LandingHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="m-0 mx-auto max-w-5xl text-balance text-[clamp(30px,9vw,44px)] font-medium leading-[1.2] tracking-[-0.04em] font-display md:text-[68px]"
            style={{ color: "#111110" }}
          >
            <span className="hero-reveal hero-d-1 md:block">
              Sell what
              <HeroObjects object="poster" order={0} />
              <br className="md:hidden" /> doesn&rsquo;t sell
              {/* Phones: the chair sits between "sell" and "like". */}
              <span className="md:hidden">
                <HeroObjects object="chair" order={1} />
              </span>
            </span>{" "}
            <span className="hero-reveal hero-d-2 md:block">
              like
              <span className="hidden md:contents">
                <HeroObjects object="chair" order={1} />
              </span>
              <br className="md:hidden" /> everything
              <HeroObjects object="dog" order={2} /> else.
            </span>
          </h1>

          <p className="hero-soft hero-d-3 mx-auto mt-[16px] max-w-4xl text-balance min-[900px]:max-w-none min-[900px]:text-nowrap text-[20px] leading-[1.35] tracking-[0em] text-[#6B6A67]">
            <span className="md:max-[899px]:block">
              Sales and inventory tools for galleries and dealers
            </span>{" "}
            <span className="md:max-[899px]:block">in art, design and collectible objects.</span>
          </p>

          <div className="hero-soft hero-d-4 mx-auto mt-[18px] flex max-w-[300px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:mt-[22px]">
            <Button size="lg" onClick={openContact} className="w-full sm:w-auto">
              Book a demo
            </Button>
            <Button
              size="lg"
              href="#how-it-works"
              variant="inverse"
              className="w-full border border-[#E8E8E6] sm:w-auto"
            >
              See how it works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
