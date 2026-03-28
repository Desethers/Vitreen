"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

const audiences = ["Galeries", "Artistes", "Art Advisors", "Collection Privée"] as const;

export default function Hero() {
  const [activeAudience, setActiveAudience] = useState(0);

  return (
    <section className="relative flex flex-col justify-center px-4 md:px-6 overflow-hidden bg-white pt-36 md:pt-44 pb-16 md:pb-20">
      <div className="max-w-7xl w-full mx-auto relative">
        <motion.h1
          {...fadeUp(0.08)}
          className="font-display font-medium text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.03em] text-[#000000] max-w-4xl mb-6"
        >
          L&apos;art doit être vu
          <br />
          dans son époque.
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          className="text-[26px] leading-[1.2] tracking-[-0.02em] text-[#000000] max-w-xl mb-10"
        >
          Vitreen équipe les galeries et artistes d&apos;une infrastructure
          digitale conçue pour les futurs du marché de l&apos;art.
        </motion.p>

        <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-2">
          {audiences.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveAudience(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-200 tracking-[-0.01em] border border-[#000000] bg-white text-[#000000] ${
                i === activeAudience ? "font-medium" : "font-normal"
              }`}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#000000]"
                aria-hidden
              />
              {label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
