"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { AppIcon } from "@/components/icons/AppIcon";
import { ArchiveMock } from "@/components/showcase/PillarMocks";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const workflow = [
  "Artwork added",
  "Website updated",
  "PDF created",
  "Shared by Gmail",
  "Sent on WhatsApp",
  "Follow-up tracked",
];

const modules = ["Artworks", "Artists", "Exhibitions", "Documents", "Availability"];
const integrations = ["Artlogic", "CSV", "Google Drive", "Dropbox", "Gmail", "WhatsApp"];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function SmallArtworkSwatch({ color = "#1B2A4A" }: { color?: string }) {
  return (
    <div
      className="h-10 w-9 shrink-0 overflow-hidden rounded-[3px] bg-white"
      style={{ border: "0.5px solid #E8E8E6" }}
    >
      <div className="h-[68%] w-full" style={{ background: color }} />
      <div className="h-[32%] w-full bg-[#E8E8E6]" />
    </div>
  );
}

function ArtworkRecordCard() {
  return (
    <div className="h-full rounded-lg border border-[#E8E8E6] bg-white p-5">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">Gallery OS</p>
          <h3 className="mt-3 font-display text-[24px] font-normal leading-tight tracking-[-0.03em] text-[#111110]">
            Evening Field
          </h3>
          <p className="mt-1 text-[14px] leading-[1.5] text-[#6B6A67]">Sacha Elron, 2023</p>
        </div>
        <span className="rounded-full border border-[#1FA854]/30 bg-[#1FA854]/[0.06] px-2.5 py-1 text-[11px] text-[#1FA854]">
          Available
        </span>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
        <div className="aspect-[4/5] rounded-[4px] bg-[#1B2A4A]" />
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-[13px] leading-tight">
            {[
              ["Medium", "Acrylic on canvas"],
              ["Dimensions", "120 × 120 cm"],
              ["Price", "8 000 €"],
              ["Location", "Paris storage"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[#ADADAA]">{label}</p>
                <p className="mt-1 text-[#111110]">{value}</p>
              </div>
            ))}
          </div>
          <div className="h-px bg-[#E8E8E6]" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">Documents</p>
            <div className="mt-3 flex flex-col gap-2">
              {["Provenance.pdf", "Condition report.pdf", "Installation image.jpg"].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between rounded-[5px] border border-[#E8E8E6] px-3 py-2 text-[12px] text-[#111110]"
                >
                  <span>{doc}</span>
                  <span className="text-[#ADADAA]">Ready</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GmailOutputCard() {
  return (
    <div className="rounded-lg border border-[#E8E8E6] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/logos/google-gmail-svgrepo-com.svg"
            alt=""
            aria-hidden="true"
            className="h-[22px] w-[22px] object-contain"
          />
          <h3 className="font-display text-[18px] font-normal tracking-[-0.02em] text-[#111110]">
            Gmail add-in
          </h3>
        </div>
        <span className="text-[11px] text-[#ADADAA]">Email thread</span>
      </div>
      <p className="mt-4 text-[14px] leading-[1.6] text-[#6B6A67]">
        Prepare artwork sheets, collector PDFs and follow-ups without leaving the email thread.
      </p>
      <div className="mt-5 rounded-[6px] border border-[#E8E8E6] p-3">
        <div className="h-2 w-2/3 rounded-full bg-[#E8E8E6]" />
        <div className="mt-2 flex items-center gap-2">
          <SmallArtworkSwatch />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-[#111110]">Evening Field</p>
            <p className="text-[11px] text-[#6B6A67]">PDF · artwork sheet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppOutputCard() {
  return (
    <div className="rounded-lg border border-[#E8E8E6] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AppIcon brand="whatsapp" size={22} />
          <h3 className="font-display text-[18px] font-normal tracking-[-0.02em] text-[#111110]">
            WhatsApp sharing
          </h3>
        </div>
        <span className="text-[11px] text-[#ADADAA]">Collector selection</span>
      </div>
      <p className="mt-4 text-[14px] leading-[1.6] text-[#6B6A67]">
        Select artworks from the archive and turn them into a clean collector selection.
      </p>
      <div className="mt-5 rounded-[6px] bg-[#111110] p-3 text-white">
        <p className="text-[11px] text-white/45">Selection ready</p>
        <div className="mt-2 flex items-center gap-2">
          <SmallArtworkSwatch color="#E8D34A" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium">3 works selected</p>
            <p className="text-[11px] text-white/50">Private link prepared</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowIcon({ index }: { index: number }) {
  const shapes = ["▦", "↻", "PDF", "@", "◉", "✓"];
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8E8E6] text-[10px] text-[#6B6A67]">
      {shapes[index]}
    </span>
  );
}

export default function ArchiveProductPage() {
  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      <section className="px-4 pt-32 pb-10 md:px-6 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/"
              className="mb-8 inline-block text-[12px] text-[#ADADAA] transition-colors hover:text-[#6B6A67]"
            >
              ← Back to home
            </Link>
            <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              TOOLS · ARTWORKS MANAGEMENT
            </p>
            <h1 className="font-display text-[32px] font-normal leading-[1.06] tracking-[-0.04em] text-[#111110] md:text-[48px]">
              Artworks Management
            </h1>
            <p className="mt-5 max-w-3xl font-display text-[20px] font-normal leading-[1.3] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
              Keep artworks, artists and exhibitions organized in one place.
            </p>
            <p className="mt-5 max-w-2xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              Every artwork can then be reused across your website, collector PDFs, viewing rooms
              and conversations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                Structure the archive
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...fadeUp(0)}
            className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-end"
          >
            <div>
              <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[30px]">
                One place for your artwork information
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                Store artworks, artists, exhibitions, images, documents and availability. Update
                information once and use it across the gallery’s website, private selections and
                collector conversations.
              </p>
            </div>
            <div className="text-[12px] leading-[1.6] text-[#ADADAA] md:text-right">
              Artwork archive · Gallery OS
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.04)}
            className="mt-8 overflow-hidden rounded-lg border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
          >
            <div className="relative h-[420px] md:h-[560px]">
              <ArchiveMock />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[30px]">
              From artwork record to collector conversation
            </h2>
            <p className="mt-4 text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              When a collector asks about an artwork, the gallery can reuse the same information
              directly inside Gmail or WhatsApp.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.05)}
            className="relative mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch"
          >
            <div className="hidden lg:block absolute left-[61.5%] top-1/2 h-px w-[8%] bg-[#E8E8E6]" />
            <ArtworkRecordCard />
            <div className="grid gap-4">
              <GmailOutputCard />
              <WhatsAppOutputCard />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...fadeUp(0)}
            className="grid gap-8 md:grid-cols-[0.45fr_1fr] md:items-start"
          >
            <div>
              <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[30px]">
                One artwork, many uses
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                A single artwork record can power the public website, private viewing rooms,
                collector PDFs and sales follow-up.
              </p>
            </div>
            <div className="overflow-hidden">
              <div className="grid grid-cols-6 items-start gap-0">
                {workflow.map((step, index) => (
                  <div key={step} className="relative flex flex-col items-center gap-3 text-center">
                    {index < workflow.length - 1 ? (
                      <div className="absolute left-1/2 top-[14px] h-px w-full bg-[#E8E8E6]" />
                    ) : null}
                    <div className="relative z-10 flex flex-col items-center gap-3 bg-white px-2">
                      <WorkflowIcon index={index} />
                      <p className="max-w-[96px] text-[12px] leading-snug text-[#111110]">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...fadeUp(0)}
            className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-start"
          >
            <div>
              <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[30px]">
                Built for the way galleries organize work
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                Vitreen keeps the archive simple enough for daily use, while structured enough to
                support publishing and sales.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
              <div className="rounded-lg border border-[#E8E8E6] bg-white p-3">
                {modules.map((module, index) => (
                  <div
                    key={module}
                    className={`flex items-center justify-between rounded-[6px] px-3 py-3 text-[14px] ${
                      index === 0 ? "bg-[#111110] text-white" : "text-[#6B6A67]"
                    }`}
                  >
                    <span>{module}</span>
                    {index === 0 ? <span className="text-white/45">Selected</span> : null}
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#E8E8E6] bg-white p-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">Artworks</p>
                <h3 className="mt-3 font-display text-[22px] font-normal tracking-[-0.02em] text-[#111110]">
                  Controls artwork records
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#6B6A67]">
                  Title, artist, year, medium, dimensions, status, price, images and documents stay
                  in one editable record.
                </p>
                <div className="mt-6 grid gap-2">
                  {["Images", "Documents", "Availability", "Publishing status"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-[5px] border border-[#E8E8E6] px-3 py-2 text-[13px] text-[#111110]"
                    >
                      <span className="text-[#ADADAA]">
                        <CheckIcon />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...fadeUp(0)}
            className="grid gap-8 border-y border-[#E8E8E6] py-10 md:grid-cols-[0.45fr_1fr] md:items-center"
          >
            <div>
              <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[30px]">
                Connect what the gallery already uses
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                Vitreen can start from existing records, files and communication habits instead of
                forcing the team into a new system from day one.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {integrations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#E8E8E6] px-4 py-2 text-[13px] text-[#111110]"
                >
                  {item}
                </span>
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
