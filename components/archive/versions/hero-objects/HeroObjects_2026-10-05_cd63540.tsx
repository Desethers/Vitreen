"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Cut-outs made from public/icons_hero (transparent background, 288px tall). */
export type HeroObjectName = "poster" | "chair" | "dog";

const SRC: Record<HeroObjectName, string> = {
  poster: "/hero-objects/poster.webp",
  chair: "/hero-objects/chair.webp",
  dog: "/hero-objects/dog.webp",
};

const SLOT_MS = 800;
const START_MS = 1500;
/** Time each object stays visible, then the slot closes before the next opens. */
const SHOW_MS = 2200;
const STEP_MS = 3200;
const CYCLE_MS = STEP_MS * 3;
const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  object: HeroObjectName;
  /** Position in the sequence (0, 1, 2): objects take turns, one visible at a time. */
  order: number;
  /** Space on each side. Use "none" where punctuation follows directly. */
  spaceBefore?: boolean;
  spaceAfter?: boolean;
};

/**
 * Inline slot sitting in the hero title. Sized in `em`, so it follows the
 * title's font size. Each slot holds one object: closed (zero width) until its
 * turn, then the room opens and the object stays for good.
 */
export default function HeroObjects({
  object,
  order,
  spaceBefore = true,
  spaceAfter = true,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(!!reduceMotion && order === 0);

  useEffect(() => {
    const img = new Image();
    img.src = SRC[object];
  }, [object]);

  useEffect(() => {
    if (reduceMotion) {
      setOpened(order === 0);
      return;
    }
    let showId: number | undefined;
    let hideId: number | undefined;
    const cycle = () => {
      setOpened(true);
      hideId = window.setTimeout(() => setOpened(false), SHOW_MS);
    };
    const startId = window.setTimeout(
      () => {
        cycle();
        showId = window.setInterval(cycle, CYCLE_MS);
      },
      START_MS + order * STEP_MS
    );
    return () => {
      window.clearTimeout(startId);
      window.clearTimeout(hideId);
      window.clearInterval(showId);
    };
  }, [reduceMotion, order]);

  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[1.08em]"
      style={{
        verticalAlign: "-0.22em",
        width: opened ? "1.1em" : "0em",
        marginLeft: opened && spaceBefore ? "0.4em" : "0em",
        marginRight: opened && spaceAfter ? "0.14em" : "0em",
        transition: `width ${SLOT_MS}ms cubic-bezier(0.16, 1, 0.3, 1), margin ${SLOT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {opened ? (
          <motion.img
            key={object}
            src={SRC[object]}
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
