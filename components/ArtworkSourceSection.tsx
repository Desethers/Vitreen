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
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:gap-14"
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

          <div className="rounded bg-[#FAFAF8] p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                  {t.artworkSource.connectedLabel}
                </p>
                <h3 className="mt-3 font-display text-[18px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[22px]">
                  {t.artworkSource.connectedTitle}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.55] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
                  {t.artworkSource.connectedBody}
                </p>
              </div>

              <div className="flex items-center justify-center md:px-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] text-[#ADADAA]">
                  {t.artworkSource.orLabel}
                </span>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                  {t.artworkSource.nativeLabel}
                </p>
                <h3 className="mt-3 font-display text-[18px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[22px]">
                  {t.artworkSource.nativeTitle}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.55] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
                  {t.artworkSource.nativeBody}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-[13px] leading-[1.55] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
              {t.artworkSource.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
