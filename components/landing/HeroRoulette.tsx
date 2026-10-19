"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * A slot-machine reel inline in the hero title: it clicks one notch at a time,
 * poster, chair, dog and round again, each landing with a small overshoot.
 * Sized in `em`, so it follows the title's font size, like HeroObjects.
 */

const OBJECTS = ["/hero-objects/poster.webp", "/hero-objects/chair.webp", "/hero-objects/dog.webp"];
const ITEM_EM = 1.25;
/** Copies of the three objects stacked in the reel; it rewinds before reaching the end. */
const COPIES = 12;
/** One notch per turn: the next object. */
const STEP = 1;
const START_MS = 1600;
const SPIN_MS = 900;
const HOLD_MS = 1900;

/** `display` sets where the reel shows, e.g. only on phones or only from md up. */
export default function HeroRoulette({ display = "inline-block" }: { display?: string }) {
  const reduce = useReducedMotion();
  // Index of the reel item showing in the window.
  const [pos, setPos] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    OBJECTS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(
      () => {
        if (spinning) {
          // Landed. Rewind silently to the same object near the top of the reel.
          setSpinning(false);
          setPos((p) => p % OBJECTS.length);
        } else {
          setSpinning(true);
          setPos((p) => p + STEP);
        }
      },
      spinning ? SPIN_MS : pos === 0 ? START_MS : HOLD_MS
    );
    return () => window.clearTimeout(t);
  }, [spinning, pos, reduce]);

  return (
    <span
      aria-hidden="true"
      className={`relative mx-[0.3em] overflow-hidden ${display}`}
      style={{ height: `${ITEM_EM}em`, width: "1.3em", verticalAlign: "-0.3em" }}
    >
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-pos * ITEM_EM}em` }}
        transition={
          spinning
            ? // A notch: quick, past the mark, then settles back.
              { type: "spring", stiffness: 420, damping: 17, mass: 0.9 }
            : { duration: 0 }
        }
      >
        {Array.from({ length: OBJECTS.length * COPIES }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={OBJECTS[i % OBJECTS.length]}
            alt=""
            draggable={false}
            className="block w-full shrink-0 select-none object-contain"
            style={{ height: `${ITEM_EM}em` }}
          />
        ))}
      </motion.span>
    </span>
  );
}
