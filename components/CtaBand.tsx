"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CtaBand() {
  const { t } = useLang();
  return (
    <section className="relative pt-20 pb-8 md:pt-[100px] md:pb-[60px] px-4 md:px-6 overflow-hidden bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="px-6 py-12 md:px-12 md:py-20 lg:py-24"
        >
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h2 className="font-display font-normal text-[#111110] text-[30px] md:text-[44px] leading-[1.15] tracking-[-0.03em] mb-0 max-w-[22ch] md:max-w-none md:whitespace-nowrap">
              {t.ctaBand.title}
            </h2>

            <p className="font-normal text-[#6B6A67] text-[30px] md:text-[44px] leading-[1.15] tracking-[-0.03em] max-w-3xl mt-0 mb-10 md:mb-12">
              {t.ctaBand.subtitle}
            </p>

            <Button
              size="lg"
              variant="primary"
              onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
            >
              {t.ctaBand.cta}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
