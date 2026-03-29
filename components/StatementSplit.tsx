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
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {marketStats.map((m) => (
            <div
              key={m.value}
              className="flex flex-col gap-2 px-6 py-8 md:px-8 md:py-10 border border-[#E5E7EB] rounded-[8px]"
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

        <motion.blockquote
          {...fadeUp(0.12)}
          className="mt-16 font-display text-2xl md:text-3xl lg:text-4xl text-[#111110] leading-relaxed tracking-tight max-w-4xl"
        >
          "The digital space is a natural extension of the gallery's storefront.{" "}
          <span>
            In the current era, a robust online program and dedicated strategy is
            essential in the art world."
          </span>
          <footer className="mt-8 flex items-center gap-4 not-italic">
            <img
              src="https://res.cloudinary.com/dqzqcuqf9/image/upload/v1772530245/vip-benefits-images/bztubujvn9fb0hhxyaxh.png"
              alt="Elena Soboleva"
              className="w-11 h-11 rounded-full object-cover flex-shrink-0 grayscale"
            />
            <div className="font-sans">
              <p className="text-sm font-medium text-[#111110] leading-tight">Elena Soboleva</p>
              <p className="text-xs text-[#ADADAA] mt-0.5">Global Head of Audience Growth & Intelligence, Art Basel</p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
