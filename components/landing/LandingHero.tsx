"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
export default function LandingHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-36 md:px-6 md:pb-20 md:pt-44">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-[30px] leading-[1.3]">
          <h1
            className="hero-fade-up m-0 max-w-xl text-balance leading-[inherit] tracking-[-0.04em] font-display"
            style={{ color: "#111110" }}
          >
            We build better systems for selling art.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mt-[16px] max-w-4xl leading-[inherit] tracking-[-0.02em] text-[#6B6A67]">
            Vitreen connects artwork information to collector conversations, from first interest to
            sale.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mt-[18px] flex flex-wrap items-center gap-3 md:mt-[22px]">
            <Button size="lg" onClick={openContact}>
              Book a demo
            </Button>
            <Button
              size="lg"
              href="#how-it-works"
              variant="inverse"
              className="border border-[#E8E8E6]"
            >
              See how it works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
