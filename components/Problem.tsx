"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    title: "Design obsolète",
    body: "Un site qui ne reflète pas la qualité de vos expositions.",
  },
  {
    title: "Mises à jour complexes",
    body: "Ajouter un artiste ne devrait pas nécessiter un développeur.",
  },
  {
    title: "Aucune archive",
    body: "Vos expositions passées disparaissent au lieu de constituer votre histoire.",
  },
];

export default function Problem() {
  return (
    <section className="py-28 px-6 border-t border-[#E8E8E6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight mb-5">
            La plupart des sites de galeries n'ont pas évolué depuis dix ans.
          </h2>
          <p className="text-[#6B6A67] text-base leading-relaxed">
            Design daté. Mises à jour pénibles. Artistes mal présentés.
            Expositions passées introuvables. Expérience mobile inexistante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-[#111110] text-sm font-medium mb-3">{card.title}</h3>
              <p className="text-[#6B6A67] text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
