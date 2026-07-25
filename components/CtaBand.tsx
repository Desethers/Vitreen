"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CtaBand({
  title,
  subtitle,
  cta,
  compactTop = false,
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
  compactTop?: boolean;
} = {}) {
  const { t } = useLang();
  const heading = title ?? t.ctaBand.title;
  const sub = subtitle ?? t.ctaBand.subtitle;
  const button = cta ?? t.ctaBand.cta;
  return (
    <section
      className={`relative overflow-hidden bg-[var(--background)] px-4 pb-14 md:px-6 md:pb-[72px] ${
        compactTop ? "pt-0" : "pt-14 md:pt-[72px]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className={`px-6 pb-12 md:px-12 md:pb-20 lg:pb-24 ${
            compactTop ? "pt-4 md:pt-6 lg:pt-8" : "pt-12 md:pt-20 lg:pt-24"
          }`}
        >
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h2
              className={`font-display font-normal text-[#111110] text-[30px] md:text-[44px] leading-[1.15] tracking-[-0.03em] mb-0 max-w-[22ch] md:max-w-none ${
                title ? "md:max-w-4xl" : "md:whitespace-nowrap"
              }`}
            >
              {heading}
            </h2>

            <p className="font-normal text-[#6B6A67] text-[30px] md:text-[44px] leading-[1.15] tracking-[-0.03em] max-w-3xl mt-0 mb-10 md:mb-12">
              {sub}
            </p>

            <Button
              size="lg"
              variant="primary"
              onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
            >
              {button}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
