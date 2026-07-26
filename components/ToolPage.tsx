"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import CollectorConversationBento from "@/components/CollectorConversationBento";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/lang";
import {
  ArchiveMock,
  AssistantMock,
  CollectorsMock,
  PublishingMock,
} from "@/components/showcase/PillarMocks";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

export type ToolSlug =
  | "overview"
  | "archive"
  | "viewing-rooms"
  | "previews"
  | "publishing"
  | "inquiries"
  | "mobile"
  | "custom-operations";

type ToolContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  features: readonly string[];
  cta: string;
  badge?: string;
};

const PILLAR_SLUGS = ["archive", "publishing", "inquiries", "custom-operations"] as const;
type PillarSlug = (typeof PILLAR_SLUGS)[number];

const PILLAR_MOCKS: Record<PillarSlug, React.ComponentType> = {
  archive: ArchiveMock,
  publishing: PublishingMock,
  inquiries: CollectorsMock,
  "custom-operations": AssistantMock,
};

const PILLAR_HREF: Record<PillarSlug, string> = {
  archive: "/products/archive",
  publishing: "/products/publishing",
  inquiries: "/products/inquiries",
  "custom-operations": "/products/custom-operations",
};

function isPillarSlug(slug: ToolSlug): slug is PillarSlug {
  return (PILLAR_SLUGS as readonly string[]).includes(slug);
}

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
  const { t, href } = useLang();
  const tools = t.tools as unknown as Record<ToolSlug, ToolContent> & {
    sectionLabel: string;
    backToHome: string;
    featuresLabel: string;
    relatedLabel: string;
    mockCaption: string;
  };
  const content = tools[slug];
  const pillar = isPillarSlug(slug);
  const Mock = pillar ? PILLAR_MOCKS[slug] : null;
  const productItems = t.nav.productMenu.items;

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
              href={href("/")}
              className="mb-8 inline-block text-[12px] text-[#ADADAA] transition-colors hover:text-[#6B6A67]"
            >
              ← {tools.backToHome}
            </Link>

            <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
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

      {/* Product mock */}
      {Mock ? (
        <section className="bg-[#F5F5F3] px-4 py-14 md:px-6 md:py-[72px]">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp(0.04)}>
              <p className="mb-5 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                {tools.mockCaption}
              </p>
              <div className="overflow-hidden rounded-lg border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="relative h-[420px] md:h-[480px]">
                  <Mock />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {slug === "inquiries" ? <CollectorConversationBento /> : null}

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

      {/* Related products */}
      {pillar ? (
        <section className="px-4 py-14 md:px-6 md:py-[72px]">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp(0)}>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                {tools.relatedLabel}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PILLAR_SLUGS.map((pillarSlug, index) => {
                  const item = productItems[index];
                  const active = pillarSlug === slug;
                  return (
                    <Link
                      key={pillarSlug}
                      href={href(PILLAR_HREF[pillarSlug])}
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
      ) : null}

      <CtaBand />
      <Footer />
    </main>
  );
}
