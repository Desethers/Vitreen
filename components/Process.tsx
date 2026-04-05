"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Structure.",
    body: "Organisation de vos contenus — artistes, œuvres, expositions — et définition de l'arborescence du site. Une base claire pour une navigation fluide et une mise en valeur optimale de vos œuvres.",
    days: "Semaine 1",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Design & intégration.",
    body: "Création de l'interface sur-mesure, intégration des contenus et mise en place de votre CMS. Un design précis, adapté à votre identité, pensé pour séduire collectionneurs et professionnels.",
    days: "Semaine 2",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Mise en ligne.",
    body: "Site livré, formation à l'outil incluse. Vous êtes autonome dès le premier jour. Un système simple et durable pour faire évoluer vos contenus en toute indépendance.",
    days: "Semaine 2",
  },
];

export default function Process() {
  return (
    <section id="processus" className="py-12 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 md:mb-16 max-w-2xl"
        >
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Passez d&apos;un site statique à un outil actif
          </h2>
          <p className="mt-0 text-[#6B6A67] text-[20px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.02em]">
            En ligne en 2 semaines — des outils pensés pour présenter, diffuser et vendre vos œuvres efficacement
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              className="bg-white flex flex-col"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-[10px] border border-[#E8E8E6] flex items-center justify-center text-[#111110] mb-4">
                {step.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-base text-[#111110] leading-[1.6] mb-1">
                  <span className="font-semibold">{step.title}</span>{" "}
                  <span className="text-[#6B6A67]">{step.body}</span>
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
