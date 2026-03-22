"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto w-full">
        <motion.p
          {...fadeUp(0.05)}
          className="text-xs tracking-widest uppercase text-[#ADADAA] mb-8"
        >
          Sites web pour galeries d'art contemporain
        </motion.p>

        <motion.h1
          {...fadeUp(0.15)}
          className="font-display text-5xl md:text-6xl lg:text-[80px] text-[#111110] leading-[1.05] tracking-tight mb-8 max-w-3xl"
        >
          L'art doit être vu
          <br />
          dans son époque.
        </motion.h1>

        <motion.p
          {...fadeUp(0.28)}
          className="text-[#6B6A67] text-base md:text-lg leading-relaxed max-w-lg mb-5"
        >
          Vitreen conçoit des interfaces digitales contemporaines pour le monde de l'art.
        </motion.p>

        <motion.div
          {...fadeUp(0.35)}
          className="flex flex-wrap gap-2 mb-12"
        >
          {[
            { label: "Galeries", color: "#111110" },
            { label: "Artistes", color: "#A07850" },
            { label: "Art Advisors", color: "#7B6FA0" },
            { label: "Collection privée", color: "#4A7A5A" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-[#6B6A67]"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#111110] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#2a2a28] transition-colors duration-200"
          >
            Discutons de votre galerie →
          </a>
          <a
            href="#offre"
            className="inline-flex items-center justify-center glass text-[#6B6A67] px-6 py-3 rounded-full text-sm hover:text-[#111110] hover:bg-black/5 transition-colors duration-200"
          >
            Voir les offres
          </a>
        </motion.div>
      </div>
    </section>
  );
}
