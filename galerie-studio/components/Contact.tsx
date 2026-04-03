"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em] mb-3">
            Parlons de votre galerie.
          </h2>
          <p className="text-[#6B6A67] text-base leading-relaxed">
            Une question ou un projet ? Je vous réponds sous 48 heures.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
