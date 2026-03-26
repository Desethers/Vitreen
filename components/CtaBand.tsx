"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CtaBand() {
  return (
    <section
      className="relative py-20 px-4 md:px-6 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Gradient subtil centré */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Ligne haute */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center text-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide mb-8"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Démarrer un projet
          </span>

          <h2
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] mb-6 max-w-3xl"
            style={{ color: "#f5f5f3" }}
          >
            Votre galerie mérite une présence à sa hauteur.
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed max-w-md mb-10"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
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
