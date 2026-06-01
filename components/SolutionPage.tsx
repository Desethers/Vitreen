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

export const ROLE_SLUGS = ["galleries", "advisors", "artists", "collectors", "estates"] as const;

export type RoleSlug = (typeof ROLE_SLUGS)[number];

const ROLE_HREF: Record<RoleSlug, string> = {
  galleries: "/solutions/galleries",
  advisors: "/solutions/advisors",
  artists: "/solutions/artists",
  collectors: "/solutions/collectors",
  estates: "/solutions/estates",
};

type SolutionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  features: readonly string[];
  cta: string;
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

export default function SolutionPage({ slug }: { slug: RoleSlug }) {
  const { t } = useLang();
  const solutions = t.solutions as unknown as Record<RoleSlug, SolutionContent> & {
    sectionLabel: string;
    backToHome: string;
    featuresLabel: string;
    relatedLabel: string;
  };
  const content = solutions[slug];
  const roleItems = t.nav.solutionsMenu.columns[0].items;

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      {/* Hero */}
      <section className="px-4 pt-32 pb-10 md:px-6 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/"
              className="mb-8 inline-block text-[12px] text-[#ADADAA] transition-colors hover:text-[#6B6A67]"
            >
              ← {solutions.backToHome}
            </Link>

            <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {content.eyebrow}
            </p>

            <h1 className="font-display text-[32px] font-normal leading-[1.06] tracking-[-0.04em] text-[#111110] md:text-[48px]">
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl font-display text-[20px] font-normal leading-[1.3] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
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
      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {solutions.featuresLabel}
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

      {/* Related roles */}
      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {solutions.relatedLabel}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ROLE_SLUGS.map((roleSlug, index) => {
                const item = roleItems[index];
                const active = roleSlug === slug;
                return (
                  <Link
                    key={roleSlug}
                    href={ROLE_HREF[roleSlug]}
                    aria-current={active ? "page" : undefined}
                    className={`group rounded-lg border px-4 py-4 transition-all ${
                      active
                        ? "border-[#111110] bg-[#111110] text-white"
                        : "border-[#E8E8E6] bg-white hover:border-[#111110]/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    <p
                      className={`font-display text-[14px] leading-snug tracking-[-0.01em] ${
                        active ? "text-white" : "text-[#111110]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`mt-1.5 text-[11px] leading-[1.45] ${
                        active ? "text-white/70" : "text-[#6B6A67]"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
