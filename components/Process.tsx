"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Structure",
    body: "Audit, arborescence, collecte des contenus. On pose les fondations ensemble.",
    days: "Jours 1–3",
  },
  {
    number: "02",
    title: "Design & développement",
    body: "Création sur-mesure, intégration de vos contenus, mise en place du CMS.",
    days: "Jours 4–11",
  },
  {
    number: "03",
    title: "Lancement",
    body: "Tests, optimisations, formation à l'outil. Votre site est en ligne.",
    days: "Jours 12–14",
  },
];

export default function Process() {
  return (
    <section id="processus" className="py-28 px-6 border-t border-[#E8E8E6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="inline-block text-xs tracking-widest uppercase text-[#6B6A67] glass px-3 py-1.5 rounded-full mb-5">
            Processus
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight">
            Trois étapes. Deux semaines.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-4xl text-[#E8E8E6]">{step.number}</span>
                <span className="text-xs text-[#ADADAA] mt-1">{step.days}</span>
              </div>
              <h3 className="text-[#111110] text-sm font-medium mb-3">{step.title}</h3>
              <p className="text-[#6B6A67] text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
