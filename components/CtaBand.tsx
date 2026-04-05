"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CtaBand() {
  return (
    <section className="relative py-8 md:py-12 px-4 md:px-6 overflow-hidden bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="rounded-[28px] md:rounded-[32px] bg-[#000000] px-6 py-12 md:px-12 md:py-20 lg:py-24"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] md:text-xs font-medium tracking-wide mb-8 md:mb-10 border border-white/[0.14] bg-white/[0.06] text-white/50"
            >
              Démarrer un projet
            </span>

            <h2 className="font-display text-white text-[clamp(1.25rem,3vw,1.75rem)] md:text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.12] tracking-[-0.03em] mb-5 md:mb-6 max-w-[22ch] md:max-w-none">
              Donnez une nouvelle dimension à votre galerie
            </h2>

            <p className="text-base md:text-lg leading-relaxed max-w-lg mb-10 md:mb-12 text-white/45">
              Discutons de votre projet — sans engagement
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full text-[15px] md:text-base font-medium transition-opacity duration-200 bg-white text-black px-8 py-3.5 md:px-10 md:py-4 hover:opacity-90"
            >
              Commençons
              <span className="text-lg leading-none" aria-hidden>
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
