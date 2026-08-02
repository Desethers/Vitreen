"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER, H2, SECTION } from "@/components/landing/styles";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    q: "What is the difference between Send and Agent?",
    a: "Both start from the same connected inventory and both work in Gmail and WhatsApp. With Send, you search and compose — it is just much faster. With Agent, the reply is already drafted when you open the email, and you review it before sending.",
  },
  {
    q: "Does Vitreen replace Artlogic?",
    a: "No. Vitreen connects to it — or to spreadsheets, folders or another existing system — and makes that information usable in Gmail and WhatsApp.",
  },
  {
    q: "Do I need to migrate my database first?",
    a: "No. We connect what you already have. If your artwork information isn't structured yet, Vitreen can build that part for you.",
  },
  {
    q: "Does Vitreen send messages to collectors automatically?",
    a: "No. Vitreen prepares replies and material from your artwork records. A person on your team always reviews and sends.",
  },
  {
    q: "Where does the AI get its answers?",
    a: "Only from your own records: artworks, prices, availability, contacts. It cannot invent information, and every draft is reviewed by your team before sending.",
  },
  {
    q: "Do I need a new website?",
    a: "No. Connected Website is a separate option for galleries that want one, built on the same records. Most galleries start with Conversations alone.",
  },
  {
    q: "How long does setup take?",
    a: "Around three weeks, from the first conversation to your team using Gmail and WhatsApp add-ins.",
  },
  {
    q: "What happens if I stop?",
    a: "You keep your data. A complete export is available at any time.",
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

export default function LandingFaq() {
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
