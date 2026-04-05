"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Reframe() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-2xl md:text-3xl lg:text-4xl text-[#111110] leading-relaxed tracking-tight"
        >
          "Un site de galerie n'est pas une brochure.{" "}
          <span className="text-[#CECCC8]">
            C'est une archive vivante — de vos artistes, de vos expositions, de
            votre programme."
          </span>
        </motion.blockquote>
      </div>
    </section>
  );
}
