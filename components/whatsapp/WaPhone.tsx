"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { WA, WaBubble, WaTyping, type WaMessage } from "@/components/whatsapp/WaChat";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The flat grey phone of the home (no bezel, same island, same borders) running
 * the dealer's WhatsApp thread with the assistant. Messages arrive one by one,
 * the assistant "types" before each answer, then the scene loops.
 */
export default function WaPhone({
  name,
  status,
  messages,
  placeholder,
}: {
  name: string;
  status: string;
  messages: WaMessage[];
  placeholder: string;
}) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.4 });
  const [shown, setShown] = useState(reduceMotion ? messages.length : 0);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let t: number;
    if (shown >= messages.length) {
      t = window.setTimeout(() => setShown(0), 5000);
      return () => window.clearTimeout(t);
    }
    const next = messages[shown];
    const wait = shown === 0 ? 900 : 700;
    if (next.from === "bot") {
      t = window.setTimeout(() => {
        setTyping(true);
        t = window.setTimeout(() => {
          setTyping(false);
          setShown((s) => s + 1);
        }, 1100);
      }, wait);
    } else {
      t = window.setTimeout(() => setShown((s) => s + 1), wait + 500);
    }
    return () => window.clearTimeout(t);
  }, [shown, messages, reduceMotion, inView]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className="relative mx-auto h-[640px] w-full max-w-[340px] rounded-[56px] border-[0.5px] border-[#E8E8E6] bg-[#F5F5F3]"
    >
      <div className="absolute left-1/2 top-4 h-[28px] w-[116px] -translate-x-1/2 rounded-full border-[0.5px] border-[#E8E8E6] bg-[#E8E8E6]" />

      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[56px] pt-[62px]">
        <div className="flex items-center gap-2.5 border-b border-[#E8E8E6] px-5 pb-3 pt-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111110] font-display text-[14px] text-white">
            V
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-medium text-[#111110]">{name}</p>
            <p className="text-[11.5px]" style={{ color: typing ? WA.green : "#ADADAA" }}>
              {typing ? "…" : status}
            </p>
          </div>
        </div>

        <div ref={scroller} className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
          <div className="flex-1" />
          <AnimatePresence initial={false}>
            {messages.slice(0, shown).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease }}
              >
                <WaBubble m={m} />
              </motion.div>
            ))}
            {typing ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <WaTyping />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="px-4 pb-6 pt-1">
          <div className="rounded-full border-[0.5px] border-[#E8E8E6] bg-white px-4 py-2.5 text-[13px] text-[#ADADAA]">
            {placeholder}
          </div>
        </div>
      </div>
    </div>
  );
}
