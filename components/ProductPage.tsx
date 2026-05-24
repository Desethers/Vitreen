"use client";

import Link from "next/link";
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

export type ProductSlug =
  | "artworks-archives"
  | "publishing"
  | "collector-relationships"
  | "assistants";

type ProductContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  features: readonly string[];
  cta: string;
  badge?: string;
};

export default function ProductPage({ slug }: { slug: ProductSlug }) {
  const { t } = useLang();
  const products = t.products as unknown as Record<ProductSlug, ProductContent> & {
    sectionLabel: string;
    backToHome: string;
    featuresLabel: string;
  };
  const content = products[slug];

  return (
    <main className="relative bg-white">
      <Nav />

      <section className="px-4 pt-28 pb-12 md:px-6 md:pt-32 md:pb-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)} className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:gap-14">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                {content.eyebrow}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-[#111110] md:text-[40px]">
                  {content.title}
                </h1>
                {content.badge ? (
                  <span className="rounded-full bg-[#111110] px-2 py-0.5 text-[10px] font-medium leading-none text-white">
                    {content.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
                {content.subtitle}
              </p>
              <p className="mt-5 max-w-xl text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                {content.body}
              </p>
              <div className="mt-7">
                <Button
                  size="md"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                >
                  {content.cta}
                </Button>
              </div>
              <div className="mt-8">
                <Link
                  href="/"
                  className="text-[13px] text-[#6B6A67] underline-offset-4 hover:underline"
                >
                  ← {products.backToHome}
                </Link>
              </div>
            </div>

            <div className="rounded bg-[#FAFAF8] p-5 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                {products.featuresLabel}
              </p>
              <ul className="mt-4 flex flex-col">
                {content.features.map((feature, i) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 py-3 text-[14px] leading-[1.55] tracking-[-0.01em] text-[#111110] md:text-[15px] ${
                      i === 0 ? "" : "border-t border-[#E8E8E6]"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-1 shrink-0 text-[#ADADAA]"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
