"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { PILLARS } from "@/components/PillarMocks";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const SLIDE_DURATION = 5000;

export default function ArtworkSourceSection() {
  const { t } = useLang();
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % PILLARS.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, prefersReduced]);

  const goTo = (i: number) => {
    setCurrent(i);
    setProgressKey((k) => k + 1);
  };

  const pillar = PILLARS[current];
  const Mock = pillar.Mock;

  return (
    <section
      id="inventory-source"
      className="bg-white px-4 pt-12 pb-12 md:px-6 md:pt-[60px] md:pb-[60px]"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:items-start md:gap-14"
        >
          {/* Left — text */}
          <div>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:whitespace-nowrap md:text-[26px]">
              {t.artworkSource.title}
            </h2>
            <p className="mt-1 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
              Tailored to your artists, collectors and operations.
            </p>
            <p className="mt-4 text-[13px] leading-[1.7] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
              {t.artworkSource.body}
            </p>
          </div>

          {/* Right — process tabs + active mock */}
          <div
            className="md:ml-auto md:self-start"
            style={{ maxWidth: 640, width: "100%" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Process tabs (number + title, progress underline on the active one) */}
            <div
              role="tablist"
              aria-label={t.artworkSource.title}
              className="flex border-b border-[#E8E8E6]"
            >
              {PILLARS.map((p, i) => {
                const active = i === current;
                return (
                  <button
                    key={p.number}
                    role="tab"
                    aria-selected={active}
                    onClick={() => goTo(i)}
                    className="group relative flex-1 pb-2.5 text-left focus:outline-none"
                  >
                    <span className="flex items-baseline gap-1.5">
                      <span className="text-[11px] tabular-nums text-[#ADADAA]">{p.number}</span>
                      <span
                        className={`font-display text-[14px] tracking-[-0.02em] transition-colors ${
                          active ? "text-[#111110]" : "text-[#6B6A67] group-hover:text-[#111110]"
                        }`}
                      >
                        {p.title}
                      </span>
                    </span>
                    {/* Progress underline, sitting on the shared border */}
                    <span className="absolute -bottom-px left-0 right-0 h-[1.5px] overflow-hidden">
                      {active && (
                        <motion.span
                          key={progressKey}
                          className="block h-full bg-[#111110]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: prefersReduced ? 0 : SLIDE_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                      {i < current && <span className="block h-full w-full bg-[#111110]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active step description — height reserved to avoid layout shift */}
            <div className="mt-3 min-h-[40px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${current}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl text-[13px] leading-[1.6] text-[#6B6A67] md:text-[14px]"
                >
                  {pillar.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Mock panel (last element — residual whitespace blends into section padding) */}
            <div className="relative mt-4 rounded-lg bg-white" style={{ height: 410 }}>
              <AnimatePresence mode="wait">
                <Mock key={current} />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
