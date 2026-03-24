"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars = [
  { label: "Artistes", desc: "Chaque artiste a sa page, ses œuvres, sa biographie." },
  { label: "Expositions", desc: "Passées, en cours, à venir — tout est archivé et consultable." },
  { label: "Œuvres", desc: "Fiches détaillées, images optimisées, classement par série." },
  { label: "Publication", desc: "Vous mettez à jour seul, sans compétence technique." },
];

export default function Solution() {
  return (
    <section className="py-28 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-[#ADADAA] mb-4">
            Le système
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight max-w-2xl">
            Un site pensé autour de votre contenu.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="glass rounded-2xl p-8"
            >
              <p className="text-xs tracking-widest uppercase text-[#ADADAA] mb-4">
                {p.label}
              </p>
              <p className="text-[#6B6A67] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
