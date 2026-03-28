"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease, delay },
});

export default function Hero() {
  return (
    <section className="flex flex-col justify-center px-8 md:px-14 pt-56 pb-10 bg-white">
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


      </div>
    </section>
  );
}
