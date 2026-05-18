"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

export default function ArtworkSourceSection() {
  const { t } = useLang();

  return (
    <section id="inventory-source" className="bg-white px-4 pb-12 pt-0 md:px-6 md:pb-[60px]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-start md:gap-14"
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {t.artworkSource.kicker}
            </p>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {t.artworkSource.title}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              {t.artworkSource.body}
            </p>
          </div>

          <div className="h-[580px] w-[580px] overflow-hidden rounded bg-[#FAFAF8] md:self-start md:justify-self-end">
            <video
              className="h-full w-full object-cover"
              src="/icons-wheel2.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t.artworkSource.kicker}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
