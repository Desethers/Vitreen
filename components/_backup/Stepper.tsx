"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    action: "Publier une œuvre",
    result: "Ajoutez une œuvre ou une exposition → elle apparaît instantanément sur votre site.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    ),
  },
  {
    number: "02",
    action: "Partager",
    result: "Partagez instantanément : liens publics, Viewing Rooms privés ou emails ciblés.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="m16 6-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
    ),
  },
  {
    number: "03",
    action: "Convertir & Fidéliser",
    result: "Les demandes arrivent directement, sans intermédiaire. Vous créez des relations de confiance et préparez les ventes de demain.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Stepper() {
  return (
    <section className="py-24 px-8 md:px-14 border-t border-[#E8E8E6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-[#ADADAA] mb-4">
            Le flux
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight max-w-2xl">
            Du contenu à la diffusion : un flux simple et stratégique.
          </h2>
        </motion.div>

        <div className="relative flex flex-col md:flex-row gap-0">
          {/* connecting line on desktop */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-[#E8E8E6]" style={{ zIndex: 0 }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              className="relative flex-1 flex flex-col md:pr-12 pb-12 md:pb-0"
            >
              {/* vertical connector on mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute left-6 top-12 bottom-0 w-px bg-[#E8E8E6]" />
              )}

              {/* step indicator */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#E8E8E6] mb-8 text-[#111110]">
                {step.icon}
              </div>

              <span className="text-xs tracking-widest uppercase text-[#ADADAA] mb-2">
                {step.number}
              </span>
              <p className="font-medium text-[#111110] text-lg mb-1">
                {step.action}
              </p>
              <p className="text-[#6B6A67] text-sm leading-relaxed">
                {step.result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
