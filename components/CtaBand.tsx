"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CtaBand() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden bg-white">
      {/* Gradient subtil centré */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 65%)",
        }}
      />

      {/* Ligne haute */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-[#E8E8E6]"
      />

      <div className="max-w-7xl mx-auto relative px-1 sm:px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center text-center rounded-2xl border border-white/[0.12] bg-[#0a0a0a] px-6 py-14 sm:px-10 md:px-14 md:py-16 lg:px-20"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide mb-8 border border-white/[0.12] bg-white/[0.05] text-white/40"
          >
            Démarrer un projet
          </span>

          <h2
            className="font-display text-[26px] leading-[1.05] tracking-[-0.03em] mb-6 max-w-3xl text-[#f5f5f3]"
          >
            Donnez une nouvelle dimension à votre galerie.
          </h2>

          <p className="text-base md:text-lg leading-relaxed max-w-md mb-10 text-white/40">
            Discutons de votre projet — sans engagement.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: "#f5f5f3",
                color: "#0a0a0a",
                padding: "13px 28px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(245,245,243,0.85)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f5f5f3")
              }
            >
              Commençons
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
