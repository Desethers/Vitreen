"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER, H2, SECTION } from "@/components/landing/styles";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    q: "Quelle est la différence entre Send et Agent ?",
    a: "Les deux partent du même inventaire connecté et fonctionnent dans Gmail et WhatsApp. Avec Send, vous cherchez et vous rédigez — simplement beaucoup plus vite. Avec Agent, la réponse est déjà rédigée quand vous ouvrez l’email, et vous la relisez avant de l’envoyer.",
  },
  {
    q: "Vitreen remplace-t-il Artlogic ?",
    a: "Non. Vitreen s’y connecte — ou à vos tableurs, dossiers ou tout autre système existant — et rend ces informations utilisables dans Gmail et WhatsApp.",
  },
  {
    q: "Dois-je d’abord migrer ma base ?",
    a: "Non. Nous connectons ce que vous avez déjà. Si vos informations d’œuvres ne sont pas encore structurées, Vitreen peut s’en charger.",
  },
  {
    q: "Vitreen envoie-t-il des messages aux collectionneurs automatiquement ?",
    a: "Non. Vitreen prépare les réponses et le support à partir de vos fiches d’œuvres. Une personne de votre équipe vérifie et envoie toujours.",
  },
  {
    q: "D’où l’IA tire-t-elle ses réponses ?",
    a: "Uniquement de vos propres fiches : œuvres, prix, disponibilités, contacts. Elle ne peut pas inventer d’information, et chaque brouillon est relu par votre équipe avant envoi.",
  },
  {
    q: "Ai-je besoin d’un nouveau site ?",
    a: "Non. Le Site connecté est une option séparée pour les galeries qui le souhaitent, construite sur les mêmes fiches. La plupart des galeries démarrent avec Conversations seul.",
  },
  {
    q: "Combien de temps prend la mise en place ?",
    a: "Environ trois semaines, du premier échange jusqu’à l’utilisation des modules Gmail et WhatsApp par votre équipe.",
  },
  {
    q: "Que se passe-t-il si j’arrête ?",
    a: "Vous gardez vos données. Un export complet est disponible à tout moment.",
  },
] as const;

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E8E6]">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-8 py-6 text-left"
      >
        <span className="font-display text-[16px] tracking-[-0.01em] text-[#111110] transition-colors group-hover:text-[#3a3a38]">
          {q}
        </span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E8E8E6] text-[#6B6A67] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-[14px] leading-relaxed text-[#6B6A67] md:text-[15px]">
              {a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function LandingFaqFr() {
  return (
    <section id="faq" className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Questions.</h2>
        <div className="mt-8 md:mt-10">
          {ITEMS.map((item) => (
            <Item key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
