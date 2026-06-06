"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
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

/** Mono eyebrow with a tiny gradient status dot — the dev-tool tell. */
function MonoEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B6A67]">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
      {children}
    </span>
  );
}

export default function ToolPageTech({ slug }: { slug: ToolSlug }) {
  const { t } = useLang();
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

  // Bento span pattern: two half-width tiles, then rows of thirds — asymmetric.
  const bentoSpan = (i: number) => {
    const p = i % 5;
    return p === 0 || p === 1 ? "lg:col-span-3" : "lg:col-span-2";
  };

  return (
    <main className="relative bg-white text-[#111110]">
      <Nav />

      <div className="mx-auto max-w-6xl border-x border-[#E8E8E6]">
        {/* ─── Hero: asymmetric split, product window bleeds off the right edge ─── */}
        <section className="relative overflow-hidden border-b border-[#E8E8E6]">
          {/* fine engineering grid, masked from top-left */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(17,17,16,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,16,0.045) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse 90% 70% at 15% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 70% at 15% 0%, #000 30%, transparent 100%)",
            }}
          />
          {/* pale gradient glow upper-right, behind the window */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 -z-0 h-[420px] w-[60%]"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 80% 10%, rgba(99,102,241,0.12), transparent 70%)",
            }}
          />

          <div className="grid items-center md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            {/* Copy */}
            <motion.div
              {...fadeUp(0)}
              className="relative z-10 px-5 pt-32 pb-12 md:py-28 md:pl-10 md:pr-6"
            >
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#ADADAA] transition-colors hover:text-[#6B6A67]"
              >
                ← {tools.backToHome}
              </Link>

              <div className="mb-5">
                <MonoEyebrow>{content.eyebrow}</MonoEyebrow>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-[34px] font-normal leading-[1.0] tracking-[-0.045em] text-[#111110] md:text-[52px]">
                  {content.title}
                </h1>
                {content.badge ? (
                  <span className="rounded-full border border-[#E8E8E6] bg-[#FAFAFA] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6B6A67]">
                    {content.badge}
                  </span>
                ) : null}
              </div>

              <p className="mt-5 max-w-md font-display text-[19px] font-normal leading-[1.3] tracking-[-0.02em] text-[#454543] md:text-[23px]">
                {content.subtitle}
              </p>
              <p className="mt-5 max-w-md text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                {content.body}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={openContact}>
                  {content.cta}
                </Button>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E8E6] bg-white px-5 py-3 text-[14px] font-medium tracking-[-0.01em] text-[#111110] transition-colors hover:bg-[#FAFAFA]"
                >
                  View capabilities
                  <span className="text-[#ADADAA]">↓</span>
                </a>
              </div>
            </motion.div>

            {/* Product window — oversized, bleeds past the right border */}
            {Mock ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
                className="relative px-5 pb-12 md:py-20 md:pl-0 md:pr-0"
              >
                <div className="md:translate-x-10 lg:translate-x-16">
                  <div className="overflow-hidden rounded-xl border border-[#E8E8E6] bg-white shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_70px_rgba(17,17,16,0.14)]">
                    {/* window chrome */}
                    <div className="flex items-center gap-3 border-b border-[#EFEFED] bg-gradient-to-b from-white to-[#FAFAFA] px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#E2E1DD]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#E2E1DD]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#E2E1DD]" />
                      </div>
                      <span className="font-mono text-[11px] tracking-tight text-[#ADADAA]">
                        vitreen / {slug}
                      </span>
                      <span className="ml-auto hidden items-center gap-1 rounded border border-[#E8E8E6] px-1.5 py-0.5 font-mono text-[10px] text-[#ADADAA] sm:inline-flex">
                        ⌘K
                      </span>
                    </div>
                    <div className="relative h-[360px] bg-[#FAFAFA] md:h-[460px]">
                      <Mock />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </section>

        {/* ─── Body: sticky mono index rail + bento content ─── */}
        <div className="md:grid md:grid-cols-[170px_minmax(0,1fr)]">
          {/* Sticky index rail */}
          <aside className="hidden border-r border-[#E8E8E6] md:block">
            <div className="sticky top-24 space-y-5 p-6">
              <a
                href="#capabilities"
                className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B6A67] transition-colors hover:text-[#111110]"
              >
                <span className="text-[#C4C4C0]">01</span> {tools.featuresLabel}
              </a>
              {pillar ? (
                <a
                  href="#related"
                  className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B6A67] transition-colors hover:text-[#111110]"
                >
                  <span className="text-[#C4C4C0]">02</span> {tools.relatedLabel}
                </a>
              ) : null}
            </div>
          </aside>

          <div>
            {/* Capabilities — asymmetric bento */}
            <section
              id="capabilities"
              className="border-b border-[#E8E8E6] px-5 py-14 md:px-10 md:py-16"
            >
              <motion.div {...fadeUp(0)}>
                <MonoEyebrow>{tools.featuresLabel}</MonoEyebrow>
                <div className="mt-7 grid grid-cols-1 overflow-hidden rounded-xl border border-[#E8E8E6] sm:grid-cols-2 lg:grid-cols-6">
                  {content.features.map((feature, index) => (
                    <div
                      key={feature}
                      className={`group relative flex flex-col justify-between gap-8 border-b border-r border-[#E8E8E6] p-6 transition-colors hover:bg-[#FAFAFA] ${bentoSpan(
                        index
                      )}`}
                    >
                      {index === 0 ? (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute right-0 top-0 h-24 w-24"
                          style={{
                            background:
                              "radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.12), transparent 70%)",
                          }}
                        />
                      ) : null}
                      <span className="font-mono text-[12px] text-[#C4C4C0] transition-colors group-hover:text-indigo-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[15px]">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Related products */}
            {pillar ? (
              <section id="related" className="px-5 py-14 md:px-10 md:py-16">
                <motion.div {...fadeUp(0)}>
                  <MonoEyebrow>{tools.relatedLabel}</MonoEyebrow>
                  <div className="mt-7 grid overflow-hidden rounded-xl border border-[#E8E8E6] sm:grid-cols-2 lg:grid-cols-4">
                    {PILLAR_SLUGS.map((pillarSlug, index) => {
                      const item = productItems[index];
                      const active = pillarSlug === slug;
                      return (
                        <Link
                          key={pillarSlug}
                          href={PILLAR_HREF[pillarSlug]}
                          aria-current={active ? "page" : undefined}
                          className={`group border-b border-r border-[#E8E8E6] p-5 transition-colors ${
                            active ? "bg-[#111110]" : "bg-white hover:bg-[#FAFAFA]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[11px] tracking-tight ${
                              active ? "text-white/50" : "text-[#C4C4C0]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p
                            className={`mt-3 font-display text-[14px] leading-snug tracking-[-0.01em] ${
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
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <CtaBand />
      <Footer />
    </main>
  );
}
