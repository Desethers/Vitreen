"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "Puis-je modifier le site moi-même ?",
    a: "Oui, via une interface simple. Pas besoin de compétences techniques — vous gérez vos contenus en autonomie.",
  },
  {
    q: "Combien de temps prend la mise en ligne ?",
    a: "Environ 2 semaines, du premier échange à la mise en ligne.",
  },
  {
    q: "Dois-je utiliser un logiciel spécifique ?",
    a: "Non. Tout se gère depuis votre navigateur, sans installation.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E8E6]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-8 group"
      >
        <span className="font-medium text-[#111110] text-base group-hover:text-[#3a3a38] transition-colors">
          {q}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#E8E8E6] flex items-center justify-center text-[#6B6A67] transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="text-[#6B6A67] text-sm leading-relaxed pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col gap-10"
        >
          <h2 className="font-display text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em]">
            Questions fréquentes.
          </h2>
          <div>
            {faqs.map((f) => (
              <Item key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
