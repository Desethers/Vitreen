"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

export default function QuoteSection() {
  const { t } = useLang();
  const q = t.quoteSection;
  return (
    <section className="px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto pt-10 pb-10 md:pt-32 md:pb-32 md:px-8">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="max-w-4xl mx-auto font-display text-[20px] md:text-[26px] text-[#111110] leading-relaxed tracking-tight"
        >
          <p>&ldquo;{q.quote}&rdquo;</p>
          <footer className="mt-8 md:mt-10 flex items-center gap-4 not-italic font-sans">
            <img
              src="https://res.cloudinary.com/dqzqcuqf9/image/upload/v1772530245/vip-benefits-images/bztubujvn9fb0hhxyaxh.png"
              alt=""
              className="w-11 h-11 rounded-full object-cover flex-shrink-0 grayscale"
            />
            <div>
              <p className="text-sm md:text-base font-normal text-[#111110] leading-tight">{q.name}</p>
              <p className="text-xs md:text-sm text-[#6B6A67] mt-0.5">{q.role}</p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
