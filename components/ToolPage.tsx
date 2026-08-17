"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import LandingNavFr from "@/components/landing/LandingNavFr";
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

export type ToolSlug = "overview";

type ToolContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  features: readonly string[];
  cta: string;
  badge?: string;
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-[#ADADAA]"
    >
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ToolPage({ slug }: { slug: ToolSlug }) {
  const { t, href, lang } = useLang();
  const tools = t.tools as unknown as Record<ToolSlug, ToolContent> & {
    sectionLabel: string;
    backToHome: string;
    featuresLabel: string;
  };
  const content = tools[slug];

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      {lang === "fr" ? <LandingNavFr /> : <LandingNav />}

      {/* Hero */}
      <section className="px-4 pt-32 pb-10 md:px-6 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <Link
              href={href("/")}
              className="mb-8 inline-block text-[12px] text-[#ADADAA] transition-colors hover:text-[#6B6A67]"
            >
              ← {tools.backToHome}
            </Link>

            <p className="mb-4 text-[14px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {content.eyebrow}
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-display text-[22px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110] md:text-[48px] md:leading-[1.06]">
                {content.title}
              </h1>
              {content.badge ? (
                <span className="rounded-full bg-[#111110] px-2 py-0.5 text-[10px] font-medium leading-none text-white">
                  {content.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-5 max-w-3xl font-display text-[22px] font-normal leading-[1.3] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
              {content.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              {content.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                {content.cta}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="px-4 py-14 md:px-6 md:py-[72px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {tools.featuresLabel}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-lg border border-[#E8E8E6] px-5 py-4 transition-colors hover:border-[#111110]/20"
                >
                  <CheckIcon />
                  <p className="text-[14px] leading-[1.55] tracking-[-0.01em] text-[#111110] md:text-[15px]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
