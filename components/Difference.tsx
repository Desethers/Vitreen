"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Difference() {
  return (
    <section className="py-28 px-8 md:px-14">
      <div className="max-w-4xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-2xl md:text-3xl lg:text-4xl text-[#111110] leading-relaxed tracking-tight"
        >
          "Pas de Wordpress. Pas de Squarespace.{" "}
          <span className="text-[#CECCC8]">
            Un site conçu sur-mesure, avec des outils modernes, pensé pour durer
            et évoluer avec votre galerie."
          </span>
        </motion.blockquote>
      </div>
    </section>
  );
}
