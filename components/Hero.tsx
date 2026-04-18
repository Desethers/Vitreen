"use client";

import React from "react";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const { t } = useLang();

  const openContact = () => {
    window.dispatchEvent(new Event("open-contact-modal"));
  };

  return (
    <section className="relative flex flex-col px-4 md:px-6 overflow-hidden bg-white pt-36 md:pt-44 pb-10 md:pb-14">
      <div className="max-w-7xl w-full mx-auto relative text-[22px] md:text-[30px] leading-[1.3]">
        <h1
          className="font-display tracking-[-0.04em] max-w-4xl hero-fade-up m-0 leading-[inherit]"
          style={{ color: "#111110" }}
        >
          {t.hero.title}
        </h1>
        <p
          className="font-normal tracking-[-0.03em] max-w-3xl md:max-w-4xl hero-fade-up hero-fade-up-delay m-0 leading-[inherit] text-[22px] md:text-[30px]"
          style={{ color: "#6B6A67" }}
        >
          {t.hero.subtitle}
        </p>
        <div className="hero-fade-up hero-fade-up-delay mt-[16px] md:mt-[20px]">
          <Button size="lg" onClick={openContact}>
            {t.hero.ctaPrimary}
          </Button>
        </div>
      </div>
    </section>
  );
}
