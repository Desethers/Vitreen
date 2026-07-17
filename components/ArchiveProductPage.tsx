"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { ArchiveMock } from "@/components/showcase/PillarMocks";
import ArtworkScrollStory from "@/components/ArtworkScrollStory";
import HeroCurtainMock from "@/components/HeroCurtainMock";
import SignatureDemo from "@/components/SignatureDemo";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

function HeroArchiveMock() {
  return (
    <HeroCurtainMock>
      <ArchiveMock interactive />
    </HeroCurtainMock>
  );
}

function ArtworkMetricsStrip() {
  const metrics = [
    { metric: "×5", text: "surfaces served by one artwork record" },
    { metric: "24/7", text: "website aligned with your records" },
    { metric: "3 wks", text: "from your inventory to a working Gallery OS" },
  ];

  return (
    <section className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-4">
          {metrics.map((item, index) => (
            <motion.div
              key={item.metric}
              {...fadeUp(index * 0.06)}
              className="w-[72vw] shrink-0 snap-start rounded-lg bg-[#F5F5F3] px-5 py-5 sm:w-[42vw] md:w-auto"
            >
              <span className="font-display text-[32px] font-normal leading-none tracking-[-0.02em] text-[#111110] md:text-[36px]">
                {item.metric}
              </span>
              <p className="mt-3 max-w-[220px] text-[14px] leading-[1.4] tracking-[-0.01em] text-[#6B6A67]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssuranceIcon({ name }: { name: "lock" | "database" | "export" | "key" }) {
  const paths: Record<typeof name, React.ReactNode> = {
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </>
    ),
    export: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
        <path d="M12 15V3" />
      </>
    ),
    key: (
      <>
        <circle cx="7.5" cy="15.5" r="5.5" />
        <path d="m21 2-9.6 9.6" />
        <path d="m15.5 7.5 3 3L22 7l-3-3" />
      </>
    ),
  };

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B6A67"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function DataAssuranceSection() {
  const guarantees = [
    { label: "Private by default", icon: "lock" as const },
    { label: "Regular backups", icon: "database" as const },
    { label: "Export at any time", icon: "export" as const },
    { label: "You own your data", icon: "key" as const },
  ];

  return (
    <section className="mt-14 bg-white px-4 py-14 md:mt-[72px] md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          {...fadeUp(0)}
          className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]"
        >
          Your gallery data stays yours.
        </motion.h2>

        <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10 md:grid md:grid-cols-4 md:gap-8">
          {guarantees.map((guarantee, i) => (
            <motion.div
              key={guarantee.label}
              {...fadeUp(i * 0.06)}
              className="w-[60vw] shrink-0 snap-start rounded-[8px] border border-[#E8E8E6] bg-white px-5 py-5 sm:w-[38vw] md:w-auto"
            >
              <AssuranceIcon name={guarantee.icon} />
              <p className="mt-3 text-[14px] leading-[1.4] tracking-[-0.01em] text-[#111110]">
                {guarantee.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ArchiveProductPage() {
  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-display text-[30px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110]">
              Artworks Management
            </h1>
            <p className="mt-2 max-w-4xl text-[30px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67]">
              Keep artworks, artists and exhibitions organized in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                Structure the archive
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="relative mt-14 h-[420px] overflow-hidden rounded-xl bg-[#D8D2C8] md:mt-20 md:h-[720px]"
            style={{ isolation: "isolate", willChange: "transform" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/paula-cooper-background.jpg')" }}
            />

            <HeroArchiveMock />
          </motion.div>
        </div>
      </section>

      <ArtworkMetricsStrip />

      <ArtworkScrollStory />

      <DataAssuranceSection />

      <SignatureDemo />

      <CtaBand />
      <Footer />
    </main>
  );
}
