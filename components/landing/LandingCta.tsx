"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { CONTAINER } from "@/components/landing/styles";

export default function LandingCta() {
  return (
    <>
      {/* Same title+subtitle scale as CtaBand.tsx on main: both 30/44, leading-[1.15], tracking-[-0.03em]. */}
      <section className="bg-white px-6 pb-12 pt-12 md:px-12 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-0 max-w-[22ch] font-display text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#111110] md:max-w-none md:text-[44px]">
            Make your artwork information easier to use.
          </h2>
          <p className="mb-10 mt-0 max-w-3xl text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#6B6A67] md:mb-12 md:text-[44px]">
            See how Vitreen connects your records to Gmail and WhatsApp.
          </p>

          <Button size="lg" onClick={openContact}>
            Book a demo
          </Button>

          <p className="mt-4 text-[13px] leading-[1.5] text-[#ADADAA] md:text-[14px]">
            A 30-minute walkthrough based on your current gallery workflow.
          </p>
        </div>
      </section>

      {/* Light footer strip — the landing stays light theme throughout. */}
      <footer className="border-t border-[#E8E8E6] bg-white px-4 py-8 md:px-6">
        <div
          className={`${CONTAINER} flex flex-col gap-2 text-[12px] text-[#ADADAA] sm:flex-row sm:items-center sm:justify-between`}
        >
          <span className="font-display text-[15px] tracking-tight text-[#111110]">Vitreen</span>
          <span>© 2026 Vitreen · Paris, France</span>
        </div>
      </footer>
    </>
  );
}
