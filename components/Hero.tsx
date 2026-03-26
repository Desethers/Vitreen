"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center px-4 md:px-6 overflow-hidden bg-white pt-48 pb-10">
      <div className="max-w-7xl w-full mx-auto relative">
        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display text-[clamp(1.8rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em] mb-7 max-w-4xl"
          style={{ color: "#111110" }}
        >
          L'art doit être vu<br />dans son époque.
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-[26px] font-normal leading-[1.3] tracking-[-0.02em] max-w-xl"
          style={{ color: "#6B6A67" }}
        >
          Vitreen conçoit des interfaces digitales contemporaines pour galeries,
          artistes et art advisors.
        </motion.p>
      </div>
    </section>
  );
}
