"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease, delay },
});

const categories = ["Galeries", "Artistes", "Art Advisors", "Collection privée"];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-20 bg-white">
      <div className="max-w-6xl w-full mx-auto">

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display text-[clamp(2.8rem,7vw,6rem)] text-[#111110] leading-[1.04] tracking-[-0.02em] mb-8 max-w-4xl"
        >
          L'art doit être vu<br />dans son époque.
        </motion.h1>

        {/* Body */}
        <motion.p
          {...fadeUp(0.22)}
          className="text-[#6B6A67] text-base md:text-lg leading-relaxed max-w-xl mb-8"
        >
          Vitreen conçoit des interfaces digitales contemporaines pour galeries, artistes et art advisors.
        </motion.p>

        {/* Category pills */}
        <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((label, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? "inline-flex items-center px-4 py-2 rounded-full text-sm bg-[#111110] text-white"
                  : "inline-flex items-center px-4 py-2 rounded-full text-sm border border-[#111110] text-[#111110] bg-transparent"
              }
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.hr
          {...fadeUp(0.4)}
          className="border-0 border-t border-[#E8E8E6]"
        />

      </div>
    </section>
  );
}
