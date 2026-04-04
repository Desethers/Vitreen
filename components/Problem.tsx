"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    title: "Design obsolète",
    body: "Un site qui ne reflète pas la qualité de votre programme artistique.",
  },
  {
    title: "Mises à jour pénibles",
    body: "Ajouter un artiste ou une exposition nécessite un prestataire externe.",
  },
  {
    title: "Aucun lien site ↔ communication",
    body: "Newsletter, viewing rooms, partage d'œuvres : tout est déconnecté du site.",
  },
  {
    title: "Structure inadaptée",
    body: "Pas de pages artistes, pas d'archives d'expositions, pas d'organisation du contenu.",
  },
];

export default function Problem() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            La plupart des sites de galeries n&apos;ont pas évolué depuis dix ans.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="glass rounded-[10px] p-8"
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
