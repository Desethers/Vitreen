"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

export default function LandingHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="m-0 mx-auto max-w-5xl text-balance text-[clamp(30px,9vw,44px)] font-medium leading-[1.2] tracking-[-0.04em] font-display md:text-[68px]"
            style={{ color: "#111110" }}
          >
            <span className="hero-reveal hero-d-1 md:block">The CRM that builds itself</span>{" "}
            <span className="hero-reveal hero-d-2 md:block">from your Gmail and WhatsApp.</span>
          </h1>

          <p className="hero-soft hero-d-3 mx-auto mt-[18px] max-w-3xl text-balance text-[18px] leading-[1.45] tracking-[-0.01em] text-[#6B6A67] md:text-[20px]">
            Vitreen links every collector conversation to your artworks, and tells you who to
            answer, what they’ve seen and what comes next.
          </p>

          <div className="hero-soft hero-d-4 mx-auto mt-[22px] flex max-w-[320px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:mt-[26px]">
            <Button size="lg" onClick={openContact} className="w-full sm:w-auto">
              Claim a founding spot
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

          <p className="hero-soft hero-d-4 mt-4 text-[13px] leading-[1.5] text-[#ADADAA] md:text-[14px]">
            3 founding galleries at €149/month · WhatsApp capture in early access
          </p>
        </div>
      </div>
    </section>
  );
}
