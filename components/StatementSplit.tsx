"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease, delay },
});

const BLOCK_ICONS = [
  <svg key="chart" width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#111110]">
    <path d="M2 11L6 7L9 10L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 4H14V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="globe" width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#111110]">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2C8 2 6 5 6 8C6 11 8 14 8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  <svg key="shield" width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#111110]">
    <path d="M8 2L3 4.5V8C3 11.5 5.5 13.8 8 14.5C10.5 13.8 13 11.5 13 8V4.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

export default function StatementSplit() {
  const { t } = useLang();
  return (
    <section className="px-4 md:px-6 bg-[#F7F7F5]">
      <div className="pt-12 md:pt-[80px] pb-20 md:pb-[120px]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-14">
          <h2 className="font-display font-normal text-[#111110] text-[22px] leading-[1.25] tracking-[-0.02em] text-center sm:text-[26px] md:text-[32px] lg:text-[38px] md:leading-[1.3]">
            {t.statementSplit.statTitle}
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.06)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.statementSplit.stats.map((m) => (
            <div
              key={m.value}
              className="flex flex-col justify-between min-h-[260px] md:min-h-[320px] px-6 py-8 md:px-8 md:py-10 border border-[#111110]/[0.12] rounded transition-all duration-200 hover:border-[#111110]/25 hover:bg-[#111110]/[0.04]"
            >
              <span className="font-display text-[1.75rem] md:text-[2rem] font-normal text-[#111110] leading-[1.05] tracking-[-0.03em]">
                {m.value}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-normal text-[#111110] leading-snug tracking-[-0.02em]">
                  {m.label}
                </span>
                <span className="text-[11px] font-normal leading-snug text-[#6B6A67] tracking-[-0.01em]">
                  {m.sub}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.09)} className="mt-24 md:mt-36">
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-3xl mb-5 md:mb-[48px]">
            {t.statementSplit.amplifyTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {t.statementSplit.blocks.map((block, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded border border-[#111110]/20 flex items-center justify-center shrink-0 text-[#111110]">
                  {BLOCK_ICONS[i]}
                </div>
                <p className="text-[15px] text-[#6B6A67] leading-relaxed tracking-[-0.01em]">
                  <span className="font-medium text-[#111110]">{block.heading}</span>
                  {" "}
                  {block.body1}
                </p>
                <p className="text-[15px] text-[#6B6A67] leading-relaxed tracking-[-0.01em]">
                  {block.body2}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
