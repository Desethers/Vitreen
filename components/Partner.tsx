"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const items = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    label: "Ajout d'expositions",
    desc: "Chaque nouvelle exposition publiée en quelques minutes.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    label: "Mise à jour des œuvres",
    desc: "Disponibilité, prix, nouvelles pièces — toujours à jour.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="m16.24 7.76 2.83-2.83" />
        <path d="M22 12h-4" />
        <path d="m19.07 19.07-2.83-2.83" />
        <path d="M12 18v4" />
        <path d="m7.76 16.24-2.83 2.83" />
        <path d="M6 12H2" />
        <path d="m4.93 4.93 2.83 2.83" />
      </svg>
    ),
    label: "Évolutions continues",
    desc: "Nouvelles fonctionnalités, améliorations et support inclus.",
  },
];

export default function Partner() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto bg-[#F7F7F5] rounded-3xl px-10 md:px-16 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight tracking-tight mb-6">
              Un site qui évolue avec vous
            </h2>
            <p className="text-[#999997] text-base leading-relaxed max-w-md">
              Votre galerie change — votre site doit suivre
            </p>
          </motion.div>

          {/* Right — items */}
          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="flex gap-5 items-start border-b border-[#2a2a28] pb-6 last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded border border-[#2a2a28] flex items-center justify-center text-[#999997]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">{item.label}</p>
                  <p className="text-[#666663] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
