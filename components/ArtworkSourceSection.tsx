"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % PILLARS.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => {
    setCurrent(i);
    setProgressKey((k) => k + 1);
  };

  const pillar = PILLARS[current];
  const Mock = pillar.Mock;

  return (
    <section id="inventory-source" className="bg-white px-4 pb-12 pt-0 md:px-6 md:pb-[60px]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-start md:gap-14"
        >
          {/* Left — text */}
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {t.artworkSource.kicker}
            </p>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {t.artworkSource.title}
            </h2>
            <p className="mt-4 text-[13px] leading-[1.7] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
              {t.artworkSource.body}
            </p>
          </div>

          {/* Right — pillar mockup slideshow */}
          <div className="md:ml-auto md:self-start" style={{ maxWidth: 440, width: "100%" }}>
            {/* Mock panel */}
            <div className="relative overflow-hidden rounded-lg bg-white" style={{ height: 260 }}>
              <AnimatePresence mode="wait">
                <Mock key={current} />
              </AnimatePresence>
            </div>

            {/* Pillar info + progress */}
            <div className="mt-4 flex flex-col gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${current}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-[#111110]">
                    <span className="mr-2 text-[11px] text-[#ADADAA]">{pillar.number}</span>
                    {pillar.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-[1.55] text-[#6B6A67]">{pillar.desc}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress segments */}
              <div className="mt-1 flex items-center gap-1.5">
                {PILLARS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Pillar ${i + 1}`}
                    className="relative h-px flex-1 overflow-hidden rounded-full bg-[#E8E8E6]"
                  >
                    {i === current && (
                      <motion.span
                        key={progressKey}
                        className="absolute inset-y-0 left-0 rounded-full bg-[#111110]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                      />
                    )}
                    {i < current && <span className="absolute inset-0 rounded-full bg-[#111110]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
