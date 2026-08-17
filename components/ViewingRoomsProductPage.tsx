"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import LandingNav from "@/components/landing/LandingNav";
import LandingNavFr from "@/components/landing/LandingNavFr";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import ViewingRoomsScrollStory from "@/components/ViewingRoomsScrollStory";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

export default function ViewingRoomsProductPage() {
  const { lang } = useLang();
  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      {lang === "fr" ? <LandingNavFr /> : <LandingNav />}

      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <p className="mb-4 text-[12px] font-medium tracking-[-0.01em] text-[#858581]">
              Viewing Room
            </p>
            <h1 className="font-display text-[28px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110] md:text-[40px]">
              A private space for each selection.
            </h1>
            <p className="mt-1 max-w-4xl text-[26px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67] md:text-[36px]">
              Build and share collector-ready presentations from your inventory.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                Prepare a selection
              </Button>
            </div>
            <div className="border-t border-[#E8E8E6] mt-16 md:mt-[96px] -mx-4 md:-mx-6" />
          </motion.div>
        </div>
      </section>

      <div className="-mt-10 md:-mt-16">
        <ViewingRoomsScrollStory />
      </div>

      <CtaBand />
      <Footer />
    </main>
  );
}
