"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
export default function LandingHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="hero-fade-up m-0 mx-auto max-w-2xl text-[36px] leading-[1.2] tracking-[-0.04em] font-display md:text-[52px]"
            style={{ color: "#111110" }}
          >
            Better tools
            <br />
            for every way you sell art.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mx-auto mt-[16px] max-w-4xl text-balance text-[20px] leading-[1.35] tracking-[0em] text-[#6B6A67]">
            Your inventory, Gmail, WhatsApp and private selections, connected.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mx-auto mt-[18px] flex max-w-[300px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:mt-[22px]">
            <Button size="md" onClick={openContact} className="w-full sm:w-auto">
              Book a demo
            </Button>
            <Button
              size="md"
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
