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

function ToggleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      stroke={active ? "#111110" : "#6B6A67"}
      strokeWidth="1.3"
      strokeLinecap="round"
      className="shrink-0"
    >
      {active ? <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" /> : <path d="M7 2v10M2 7h10" />}
    </svg>
  );
}

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
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-start md:gap-14"
        >
          {/* Left — title, subtitle, accordion of steps */}
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {t.artworkSource.title}
            </h2>
            <p className="mt-1 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
              Tailored to your artists, collectors and operations.
            </p>
            <p className="mt-5 text-[13px] leading-[1.7] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
              {t.artworkSource.body}
            </p>

            {/* Accordion */}
            <div className="mt-16" role="tablist" aria-label={t.artworkSource.title}>
              {PILLARS.map((p, i) => {
                const active = i === current;
                return (
                  <div key={p.number} className="relative border-t border-[#E8E8E6]">
                    {/* Progress fill on the top border of the active item */}
                    <span className="absolute -top-px left-0 right-0 h-[1.5px] overflow-hidden">
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

                    <button
                      role="tab"
                      aria-selected={active}
                      onClick={() => goTo(i)}
                      className="group flex w-full items-center justify-between gap-4 py-2 text-left focus:outline-none"
                    >
                      <span
                        className={`font-display text-[12.5px] tracking-[-0.01em] transition-colors md:text-[13px] ${
                          active ? "text-[#111110]" : "text-[#6B6A67] group-hover:text-[#111110]"
                        }`}
                      >
                        {p.title}
                      </span>
                      <ToggleIcon active={active} />
                    </button>

                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-md pb-2 text-[12px] leading-[1.35] text-[#6B6A67] md:text-[13px]">
                            {p.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="border-t border-[#E8E8E6]" />
            </div>
          </div>

          {/* Right — active mock */}
          <div
            className="md:ml-auto md:self-start"
            style={{ maxWidth: 640, width: "100%" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative rounded-lg bg-white" style={{ height: 470 }}>
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
