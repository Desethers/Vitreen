"use client";
import { useLang } from "@/lib/lang";

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative flex flex-col justify-center px-4 md:px-6 overflow-hidden bg-white pt-28 pb-3 md:pt-32 md:pb-6">
      <div className="max-w-7xl w-full mx-auto relative text-[22px] md:text-[30px] leading-[1.3]">
        <h1
          className="font-display tracking-[-0.04em] max-w-4xl hero-fade-up m-0 leading-[inherit]"
          style={{ color: "#111110" }}
        >
          {t.hero.title}
        </h1>
        <p
          className="font-normal tracking-[-0.03em] max-w-xl md:max-w-2xl hero-fade-up hero-fade-up-delay m-0 leading-[inherit] text-[22px] md:text-[30px]"
          style={{ color: "#6B6A67" }}
        >
          Vitreen empowers galleries and artists with<br className="hidden md:block" /> next-level digital experiences.
        </p>
      </div>
    </section>
  );
}
