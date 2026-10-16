"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Cut-outs made from public/icons_hero (transparent background, 288px tall). */
const OBJECTS = ["/hero-objects/poster.webp", "/hero-objects/chair.webp", "/hero-objects/dog.webp"];

const START_DELAY_MS = 1500;
const HOLD_MS = 2400;
/** How long the room takes to open when the first object arrives. */
const SLOT_MS = 800;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Inline slot sitting in the hero title. Sized in `em`, so it follows the
 * title's font size. The slot has a fixed size: objects appear one at a time
 * inside it and the line never shifts.
 */
export default function HeroObjects() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(reduceMotion ? 0 : -1);

  useEffect(() => {
    OBJECTS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIndex(0);
      return;
    }
    const first = window.setTimeout(() => setIndex(0), START_DELAY_MS);
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % OBJECTS.length),
      START_DELAY_MS + HOLD_MS
    );
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [reduceMotion]);

  const opened = index >= 0;

  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[1.08em]"
      style={{
        verticalAlign: "-0.22em",
        // Closed until the first object arrives: the title reads as plain text
        // (no gap). Then the room opens smoothly and stays open for good.
        width: opened ? "1.1em" : "0em",
        marginLeft: opened ? "0.4em" : "0em",
        marginRight: opened ? "0.14em" : "0em",
        transition: `width ${SLOT_MS}ms cubic-bezier(0.16, 1, 0.3, 1), margin ${SLOT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {index >= 0 ? (
          <motion.img
            key={OBJECTS[index]}
            src={OBJECTS[index]}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain"
            initial={{ opacity: 0, scale: 0.55, y: "0.3em", rotate: -5, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: "0em", rotate: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, y: "-0.2em", filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          />
        ) : null}
      </AnimatePresence>
    </span>
  );
}
