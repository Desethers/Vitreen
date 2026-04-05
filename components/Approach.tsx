"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Approach() {
  return (
    <section id="approche" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Conçu par un artiste.
            <br />
            <span className="text-[#CECCC8]">Pensé pour les galeries.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="text-[#6B6A67] text-base leading-relaxed"
          >
            Je suis artiste et je connais le fonctionnement d'une galerie de
            l'intérieur — la relation avec les artistes, la documentation des
            œuvres, le rythme des expositions.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="text-[#6B6A67] text-base leading-relaxed"
          >
            Je construis votre site sur des outils simples et éprouvés. Vous
            gardez le contrôle. Formation complète et accompagnement inclus
            après la livraison.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
