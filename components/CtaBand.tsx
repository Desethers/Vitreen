"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CtaBand() {
  return (
    <section className="py-28 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="glass rounded-3xl px-10 py-16 md:py-20 text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl text-[#111110] leading-tight tracking-tight mb-8">
            Votre galerie en ligne.
            <br />
            <span className="text-[#CECCC8]">Commençons.</span>
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center bg-[#111110] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#2a2a28] transition-colors duration-200"
          >
            Discutons de votre projet →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
