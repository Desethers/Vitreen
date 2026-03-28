"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Structure",
    body: "Organisation des contenus (artistes, œuvres, expositions).",
    days: "Semaine 1",
  },
  {
    number: "02",
    title: "Mise en place",
    body: "Design et intégration.",
    days: "Semaine 2",
  },
  {
    number: "03",
    title: "Mise en ligne",
    body: "Site prêt à être utilisé immédiatement.",
    days: "Semaine 2",
  },
];

export default function Process() {
  return (
    <section id="processus" className="py-28 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-[#ADADAA] mb-4">
            Processus
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight">
            Passez à une nouvelle génération de sites pour galeries.
          </h2>
          <p className="mt-4 text-[#6B6A67] text-base leading-relaxed">
            En ligne en 2 semaines.
          </p>
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
