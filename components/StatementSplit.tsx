"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease, delay },
});

const marketStats = [
  { value: "$10,5Mds", label: "Ventes en ligne en 2024", sub: "Marché mondial" },
  { value: "18%", label: "Du marché total", sub: "Part du digital" },
  { value: "+76%", label: "Vs avant-pandémie", sub: "Depuis 2019" },
  { value: "40,5M", label: "Transactions en 2024", sub: "+3% sur un an" },
] as const;

export default function StatementSplit() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10 md:mb-14">
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-3xl">
            Amplifiez l&apos;influence de votre galerie.
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.06)}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#E5E7EB] border border-[#E5E7EB] rounded-2xl overflow-hidden"
        >
          {marketStats.map((m) => (
            <div
              key={m.value}
              className="flex flex-col gap-2 px-6 py-8 md:px-8 md:py-10"
            >
              <span className="font-display text-[1.75rem] md:text-[2rem] font-normal text-[#111110] leading-[1.05] tracking-[-0.03em]">
                {m.value}
              </span>
              <span className="text-[13px] font-normal text-[#111110] leading-snug tracking-[-0.02em]">
                {m.label}
              </span>
              <span className="text-[11px] font-normal leading-snug text-[#ADADAA] tracking-[-0.01em]">
                {m.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
