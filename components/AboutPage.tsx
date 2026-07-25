"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

export default function AboutPage() {
  const { t } = useLang();
  const about = t.about;
  const letter = about.letter;

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      {/* Hero — same rhythm as the solutions pages */}
      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-display text-[30px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110]">
              {about.title}
            </h1>
            <p className="mt-2 max-w-4xl text-[30px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67]">
              {about.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                {about.cta}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder's letter — one readable column, kept narrow on purpose */}
      <section className="px-4 pb-14 md:px-6 md:pb-[72px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)} className="max-w-[36rem]">
            <h2 className="font-display text-[18px] font-normal leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[20px]">
              {letter.title}
            </h2>

            <div className="mt-7 space-y-3">
              {letter.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] leading-[1.7] tracking-[-0.01em] text-[#6B6A67] md:text-[16px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[#E8E8E6] pt-6">
              <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[15px]">
                {letter.signature.name}
              </p>
              <p className="mt-0.5 text-[13px] leading-[1.5] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
                {letter.signature.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two audiences, side by side */}
      <section className="px-4 pb-14 md:px-6 md:pb-[72px]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {about.audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                {...fadeUp(index * 0.06)}
                className="rounded-[12px] bg-[#F5F5F3] px-6 py-7 md:px-7 md:py-8"
              >
                <h2 className="font-display text-[18px] font-normal leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[20px]">
                  {audience.title}
                </h2>
                <p className="mt-3 max-w-sm text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                  {audience.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand compactTop />
      <Footer />
    </main>
  );
}
