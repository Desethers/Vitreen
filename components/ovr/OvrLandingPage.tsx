"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useOptionalUser, clerkEnabled } from "@/lib/useOptionalUser";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { HeroRoomMockup } from "@/components/ovr/HeroRoomMockup";

const ease = [0.16, 1, 0.3, 1] as const;

/** Lignes communes aux deux formules (même produit, facturation différente). */
const planIncludes = [
  "Unlimited sends",
  "Browser editor: images, text, quotes, drag and drop",
  "High-definition PDF exports aligned with the preview",
  "Polished HTML emails + private online viewing links for your contacts",
  "Personalization by recipient (headline, intro, captions, INQUIRE)",
] as const;

const mockupStories = [
  {
    title: "Images",
    desc: "Import your artworks and compose a clear sequence, ready to reorganize in the room.",
    visual: "image",
  },
  {
    title: "Quotes",
    desc: "Add a standalone quote, then pair it with an artwork to create an image + text block.",
    visual: "quote",
  },
  {
    title: "Layouts",
    desc: "Turn a selection into full page, diptych, triptych, or editorial layouts.",
    visual: "layout",
  },
  {
    title: "Exports",
    desc: "The finalized room becomes a private link, an HTML email, or a high-definition PDF.",
    visual: "export",
  },
] as const;

const howSteps = [
  {
    n: "01",
    title: "Import your artworks",
    desc: "Bring in works from your inventory, a folder of images, or a spreadsheet — no reformatting.",
  },
  {
    n: "02",
    title: "Compose the room",
    desc: "Arrange full-page, diptych, triptych and image-with-text blocks by drag and drop.",
  },
  {
    n: "03",
    title: "Send it your way",
    desc: "Publish a private link, export a high-definition PDF, or send a polished HTML email.",
  },
] as const;

const faqs = [
  {
    q: "Do collectors need an account?",
    a: "No. Each room opens from a single private link on any device — nothing to download, no login.",
  },
  {
    q: "Can I export to PDF?",
    a: "Yes. Every room becomes a high-definition PDF aligned with the on-screen layout, ready to print or archive.",
  },
  {
    q: "Does it replace my website or CRM?",
    a: "No. Viewing Room Studio sits alongside your existing tools — you compose and send, with nothing to migrate.",
  },
  {
    q: "How is billing handled?",
    a: "Monthly or yearly through Stripe. Unlimited rooms, exports and sharing, cancel anytime.",
  },
] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E6] bg-[#F5F5F3] px-3 py-1 text-[11px] tracking-tight text-[#6B6A67]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#111110]" />
      {children}
    </span>
  );
}

const importFiles = [
  { src: "/artworks/painting-03.jpg", name: "evening-field.jpg", size: "3.2 MB" },
  { src: "/artworks/painting-05.jpg", name: "dawn-study-07.jpg", size: "2.8 MB" },
  { src: "/artworks/painting-07.jpg", name: "northern-light.jpg", size: "4.1 MB" },
  { src: "/artworks/painting-08.jpg", name: "untitled-2024.jpg", size: "2.5 MB" },
  { src: "/artworks/painting-10.jpg", name: "horizon-iii.jpg", size: "3.7 MB" },
] as const;

function ImportMock() {
  return (
    <div
      className="relative h-full min-h-[300px] overflow-hidden rounded-lg border border-[#E8E8E6] bg-[#FAFAFA] md:min-h-[340px]"
      style={{
        backgroundImage: "radial-gradient(rgba(17,17,16,0.12) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Dropzone pill */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center px-6">
        <div className="inline-flex items-center gap-3 rounded-full bg-[#111110] px-6 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="text-[14px] font-medium text-white">Choose images</span>
          <span className="text-[13px] text-white/40">or drag them here</span>
        </div>
      </div>

      {/* Folder modal */}
      <div className="absolute left-1/2 top-5 w-[88%] max-w-[360px] -translate-x-1/2 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),0_18px_44px_rgba(0,0,0,0.14)]">
        {/* Title bar */}
        <div className="flex items-center gap-2.5 border-b border-black/[0.06] bg-gradient-to-b from-[#FBFBFA] to-[#F4F4F2] px-3.5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              fill="#ADADAA"
            />
          </svg>
          <span className="text-[12px] font-medium tracking-tight text-[#111110]">
            Gallery inventory
          </span>
          <span className="ml-auto text-[11px] text-[#ADADAA]">5 images</span>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-1.5 p-3">
          {importFiles.map((f) => (
            <div key={f.name}>
              <div className="relative overflow-hidden rounded-[5px] bg-[#EFEFEC] ring-1 ring-[#111110]/15">
                <img src={f.src} alt={f.name} className="aspect-square w-full object-cover" />
                <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#111110]">
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3 8l3.5 3.5L13 4"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-black/[0.06] px-3.5 py-2.5">
          <span className="text-[11px] text-[#6B6A67]">5 selected · 16.3 MB</span>
          <span className="rounded-full bg-[#111110] px-3 py-1.5 text-[11px] font-medium text-white">
            Import artworks
          </span>
        </div>
      </div>
    </div>
  );
}

function DragHandle() {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8E8E6] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
      aria-hidden
    >
      <span className="grid grid-cols-2 gap-x-[3px] gap-y-[2.5px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-[3px] w-[3px] rounded-full bg-[#ADADAA]" />
        ))}
      </span>
    </span>
  );
}

function WirePlaceholder() {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#F0F0EE]">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#CFCFCB" strokeWidth="1.4" />
        <circle cx="8.5" cy="8.5" r="1.6" fill="#CFCFCB" />
        <path
          d="M21 16l-5-5-9 9"
          stroke="#CFCFCB"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function WireCaption() {
  return (
    <div className="space-y-1.5 px-4 py-3">
      <span className="block h-2 w-1/2 rounded-full bg-[#E2E2DF]" />
      <span className="block h-2 w-1/3 rounded-full bg-[#ECECE9]" />
    </div>
  );
}

function GrabCursor() {
  // Small "grabbing hand" pointer so the gesture reads as drag-and-drop
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
      aria-hidden
    >
      <path
        d="M9 11V6.5a1.5 1.5 0 0 1 3 0V11m0-1.2V5.6a1.5 1.5 0 0 1 3 0V11m0-1.2a1.5 1.5 0 0 1 3 0V14c0 3-2 5-5 5h-1.2c-1.6 0-2.5-.5-3.4-1.7l-2.2-3c-.7-1-.4-2 .6-2.5.7-.4 1.5-.2 2 .4L9 13.5V8.5a1.5 1.5 0 0 1 3 0"
        fill="#111110"
        stroke="#fff"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Phase 1 — one block is dragged into the empty slot next to the target. */
function ComposeDragScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-7"
    >
      <div className="flex w-full max-w-[420px] items-start justify-center gap-3">
        {/* Target block (stays put) */}
        <div className="relative w-[46%]">
          <div className="absolute -left-3 top-3 z-30">
            <DragHandle />
          </div>
          <div className="overflow-hidden rounded-md border border-[#E0E0DC] bg-white">
            <WirePlaceholder />
            <WireCaption />
          </div>
        </div>

        {/* Empty slot + the block flying into it */}
        <div className="relative w-[46%]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md border border-dashed border-[#3b82f6]/40 bg-[#3b82f6]/[0.06]">
            <span className="text-[11px] text-[#3b82f6]">Move here</span>
          </div>
          <motion.div
            className="relative z-10"
            initial={{ y: 150, x: 26, rotate: -6, scale: 1.05, opacity: 0.92 }}
            animate={{ y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease, delay: 0.25 }}
          >
            <div className="absolute -top-3 left-1/2 z-30 -translate-x-1/2">
              <DragHandle />
            </div>
            <span className="absolute -top-1.5 left-[calc(50%+8px)] z-40">
              <GrabCursor />
            </span>
            <div className="overflow-hidden rounded-md border border-[#D8D8D4] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
              <WirePlaceholder />
              <WireCaption />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.span
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-medium text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.4, ease }}
      >
        Make diptych
      </motion.span>
    </motion.div>
  );
}

/** Phase 2 — the two blocks have merged into a single diptych. */
function ComposeMergedScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-7"
    >
      <div className="relative w-full max-w-[420px]">
        <div className="absolute -left-3 -top-3 z-30">
          <DragHandle />
        </div>
        <div className="overflow-hidden rounded-md border border-[#111110]/15 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
          <div className="grid grid-cols-2 divide-x divide-[#E0E0DC]">
            <WirePlaceholder />
            <WirePlaceholder />
          </div>
          <WireCaption />
        </div>
        <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-medium text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8l3.5 3.5L13 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Diptych created
        </span>
      </div>
    </motion.div>
  );
}

function ComposeMock() {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"drag" | "merged">("drag");

  // Loop the sequence: drag the block in, hold on the merged diptych, repeat.
  useEffect(() => {
    if (prefersReduced) return;
    const id = setTimeout(
      () => setPhase((p) => (p === "drag" ? "merged" : "drag")),
      phase === "drag" ? 2600 : 2200
    );
    return () => clearTimeout(id);
  }, [phase, prefersReduced]);

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden rounded-lg border border-dashed border-[#E0E0DC] bg-[#FAFAFA] md:min-h-[340px]">
      {prefersReduced ? (
        <ComposeMergedScene />
      ) : (
        <AnimatePresence mode="wait">
          {phase === "drag" ? <ComposeDragScene key="drag" /> : <ComposeMergedScene key="merged" />}
        </AnimatePresence>
      )}
    </div>
  );
}

/** ── Quartr-style bento: light-gray card, a floating white mock, title + desc ── */
function BentoCard({
  title,
  desc,
  className = "",
  children,
}: {
  title: string;
  desc: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      {...fadeUp()}
      className={`flex flex-col overflow-hidden rounded-3xl bg-[#EFEFED] p-6 md:p-8 ${className}`}
    >
      <div className="relative mb-7 flex min-h-[190px] flex-1 items-center justify-center md:min-h-[220px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% -10%, rgba(255,255,255,0.85), transparent 65%)",
          }}
        />
        <div className="relative w-full">{children}</div>
      </div>
      <h3 className="font-display text-[20px] font-normal tracking-[-0.01em] text-[#111110] md:text-[22px]">
        {title}
      </h3>
      <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-[#6B6A67] md:text-[15px]">
        {desc}
      </p>
    </motion.div>
  );
}

const bentoShadow = "shadow-[0_14px_40px_rgba(0,0,0,0.10)]";

function CaptionBars() {
  return (
    <div className="space-y-1.5 px-3 py-2.5">
      <span className="block h-1.5 w-1/2 rounded-full bg-[#E0E0DD]" />
      <span className="block h-1.5 w-1/3 rounded-full bg-[#ECECE9]" />
    </div>
  );
}

/** Wide card — composing a room with drag-and-drop blocks. */
function ComposeVisual() {
  return (
    <div
      className={`mx-auto max-w-[440px] rounded-xl border border-black/[0.06] bg-white p-3.5 ${bentoShadow}`}
    >
      <div className="relative grid grid-cols-2 gap-2.5">
        <span className="absolute -left-2.5 -top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#E8E8E6] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <span className="grid grid-cols-2 gap-x-[3px] gap-y-[2.5px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-[2.5px] w-[2.5px] rounded-full bg-[#ADADAA]" />
            ))}
          </span>
        </span>
        <div className="overflow-hidden rounded-md border border-[#EDEDEA]">
          <div className="aspect-[16/10] bg-[#E6E6E3]" />
          <CaptionBars />
        </div>
        <div className="overflow-hidden rounded-md border border-[#EDEDEA]">
          <div className="aspect-[16/10] bg-[#E6E6E3]" />
          <CaptionBars />
        </div>
      </div>
    </div>
  );
}

/** Narrow card — output formats list. */
function FormatsVisual() {
  const rows = ["Private link", "High-definition PDF", "HTML email"];
  return (
    <div
      className={`mx-auto max-w-[240px] rounded-xl border border-black/[0.06] bg-white p-2.5 ${bentoShadow}`}
    >
      {rows.map((label, i) => (
        <div
          key={label}
          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${
            i === 0 ? "bg-[#F5F5F3]" : ""
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#111110]">
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8l3.5 3.5L13 4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[12px] tracking-tight text-[#111110]">{label}</span>
          {i === 0 ? (
            <span className="ml-auto text-[10px] font-medium text-emerald-600">Ready</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Bottom card — a personalized recipient note. */
function RecipientVisual() {
  return (
    <div
      className={`mx-auto max-w-[260px] rounded-xl border border-black/[0.06] bg-white p-3.5 ${bentoShadow}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#E4E4E1] to-[#D6D6D2]" />
        <div className="min-w-0">
          <p className="text-[12px] font-medium tracking-tight text-[#111110]">Anna Müller</p>
          <p className="text-[10px] text-[#ADADAA]">Collector</p>
        </div>
      </div>
      <p className="mt-2.5 text-[11px] leading-snug text-[#6B6A67]">
        “A private selection from the new show, chosen with you in mind.”
      </p>
      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-[#F5F5F3] px-2.5 py-1.5">
        <span className="h-5 w-5 rounded bg-[#E4E4E1]" />
        <span className="text-[10px] tracking-tight text-[#6B6A67]">Untitled, 2024</span>
        <span className="ml-auto text-[12px] leading-none text-[#ADADAA]">›</span>
      </div>
    </div>
  );
}

/** Bottom card — one private link, any device. */
function LinkVisual() {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        className={`flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-2.5 ${bentoShadow}`}
      >
        <svg
          width="13"
          height="13"
          fill="none"
          stroke="#6B6A67"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
        <span className="text-[12px] tracking-tight text-[#111110]">view.vitreen.art/anna-m</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="mt-4 flex items-end justify-center gap-2.5">
        <div className="h-[58px] w-[88px] rounded-md border border-[#E0E0DD] bg-white p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.07)]">
          <div className="h-full w-full rounded-sm bg-[#ECECEA]" />
        </div>
        <div className="h-[66px] w-[34px] rounded-md border border-[#E0E0DD] bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.07)]">
          <div className="h-full w-full rounded-sm bg-[#ECECEA]" />
        </div>
      </div>
    </div>
  );
}

/** Bottom card — high-definition PDF export. */
function PdfVisual() {
  return (
    <div className="mx-auto flex max-w-[260px] items-center justify-center">
      <div
        className={`w-[112px] -rotate-3 rounded-md border border-[#E8E8E6] bg-white p-2 ${bentoShadow}`}
      >
        <div className="aspect-[3/4] rounded-sm bg-[#ECECEA]" />
        <div className="mt-1.5 space-y-1">
          <span className="block h-1 w-2/3 rounded-full bg-[#E0E0DD]" />
          <span className="block h-1 w-1/2 rounded-full bg-[#ECECE9]" />
        </div>
      </div>
      <div
        className={`-ml-5 w-[112px] rotate-3 rounded-md border border-[#E8E8E6] bg-white p-2 ${bentoShadow}`}
      >
        <div className="relative aspect-[3/4] rounded-sm bg-[#ECECEA]">
          <span className="absolute bottom-1 right-1 rounded bg-[#111110] px-1.5 py-0.5 text-[7px] font-medium tracking-tight text-white">
            PDF · HD
          </span>
        </div>
        <div className="mt-1.5 space-y-1">
          <span className="block h-1 w-2/3 rounded-full bg-[#E0E0DD]" />
          <span className="block h-1 w-1/2 rounded-full bg-[#ECECE9]" />
        </div>
      </div>
    </div>
  );
}

/** vitreen.art-style stepper that auto-advances on a timer with a progress fill. */
const STEP_DURATION = 4200;

function HowItWorksStepper() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % howSteps.length), STEP_DURATION);
    return () => clearTimeout(id);
  }, [active, prefersReduced]);

  return (
    <motion.div
      {...fadeUp()}
      className="mt-10 grid gap-10 border-t border-[#E8E8E6] pt-10 md:mt-14 md:grid-cols-3 md:gap-px md:border-t-0 md:bg-[#E8E8E6] md:pt-0"
    >
      {howSteps.map((step, i) => {
        const isActive = !prefersReduced && i === active;
        const isPast = !prefersReduced && i < active;
        const lit = prefersReduced || isActive;
        return (
          <button
            key={step.n}
            type="button"
            onClick={() => setActive(i)}
            className="group bg-white text-left transition-colors md:px-8 md:py-9 lg:px-10"
          >
            {/* timer track */}
            <div className="mb-7 h-[2px] w-full overflow-hidden rounded-full bg-[#E8E8E6]">
              {prefersReduced ? (
                <div className="h-full w-full bg-[#111110]" />
              ) : isActive ? (
                <motion.div
                  key={`fill-${active}`}
                  className="h-full bg-[#111110]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                />
              ) : (
                <div
                  className={`h-full bg-[#111110] transition-[width] duration-500 ease-out ${
                    isPast ? "w-full" : "w-0"
                  }`}
                />
              )}
            </div>

            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full border font-display text-[18px] font-normal tracking-tight transition-colors duration-500 ${
                lit
                  ? "border-transparent bg-[#111110] text-white"
                  : "border-[#E8E8E6] text-[#ADADAA] group-hover:text-[#111110]"
              }`}
            >
              {step.n}
            </span>
            <h3
              className={`mt-6 font-display text-[19px] font-normal tracking-[-0.01em] transition-colors duration-500 ${
                lit ? "text-[#111110]" : "text-[#6B6A67]"
              }`}
            >
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-sm text-[14px] leading-relaxed text-[#6B6A67]">
              {step.desc}
            </p>
          </button>
        );
      })}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E8E6]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-8 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium tracking-[-0.01em] text-[#111110] transition-colors group-hover:text-[#3a3a38] md:text-[16px]">
          {q}
        </span>
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#E8E8E6] text-[#6B6A67] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          >
            <path d="M7 2v10M2 7h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-[14px] leading-relaxed text-[#6B6A67]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OvrLandingPage() {
  const { isSignedIn, isPro } = useOptionalUser();
  const router = useRouter();
  const pathname = usePathname();
  const [loadingCheckout, setLoadingCheckout] = useState<false | "monthly" | "yearly">(false);
  const stripeConfigured = process.env.NEXT_PUBLIC_STRIPE_CONFIGURED === "true";
  const [yearlyError, setYearlyError] = useState<string | null>(null);

  const goToEditor = () => {
    window.location.href = "/viewingroom-studio/editor";
  };

  const handleSubscribe = async (billing: "monthly" | "yearly") => {
    if (isPro) {
      goToEditor();
      return;
    }
    if (clerkEnabled && !isSignedIn) {
      router.push(
        `/viewingroom-studio/sign-in?redirect_url=${encodeURIComponent(pathname || "/viewingroom-studio/room")}`
      );
      return;
    }
    if (!stripeConfigured) {
      goToEditor();
      return;
    }
    setYearlyError(null);
    setLoadingCheckout(billing);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billing }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (billing === "yearly" && res.status === 400 && data.error === "yearly_not_configured") {
        setYearlyError("Yearly billing: add STRIPE_PRICE_ID_YEARLY on the server.");
      }
      setLoadingCheckout(false);
    } catch {
      setLoadingCheckout(false);
    }
  };

  const ctaLabel = isPro ? "Open editor" : "Try for free";

  return (
    <div className="min-h-screen bg-white text-[#111110]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8E8E6] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 md:px-6">
          <Link href="/" className="font-display text-[15px] tracking-[-0.01em] text-[#111110]">
            Viewing Room Studio
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] tracking-tight text-[#6B6A67] md:flex">
            <a href="#features" className="transition-colors hover:text-[#111110]">
              Features
            </a>
            <a href="#how" className="transition-colors hover:text-[#111110]">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-[#111110]">
              Pricing
            </a>
          </nav>
          <Button onClick={goToEditor} size="sm">
            {ctaLabel}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pb-10 pt-28 md:px-6 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto max-w-3xl text-center"
          >
            <Eyebrow>Viewing Room Studio</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-[#111110] md:text-[52px]">
              Online viewing rooms your collectors take seriously
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[18px]">
              Compose a polished room in minutes, then share it as a private link, a high-definition
              PDF or an HTML email — no InDesign, no PowerPoint, no rebuilding layouts by hand.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button onClick={goToEditor} size="lg">
                {ctaLabel}
              </Button>
              <Button
                href="#pricing"
                variant="inverse"
                size="lg"
                className="border border-[#E8E8E6]"
              >
                See pricing
              </Button>
            </div>
            <p className="mt-5 text-[12.5px] tracking-tight text-[#ADADAA]">
              Unlimited rooms · No collector login · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <HeroRoomMockup />

      {/* How it works */}
      <section id="how" className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-display text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-[#111110] md:text-[32px]">
              From inventory to a room collectors can open — in three steps
            </h2>
          </motion.div>

          {/* Stepper — auto-advancing on a timer (vitreen.art style) */}
          <HowItWorksStepper />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <Eyebrow>Features</Eyebrow>
            <h2 className="mt-4 font-display text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-[#111110] md:text-[32px]">
              Everything you need, without the clutter
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6B6A67]">
              A focused browser editor and the three outputs galleries actually send — nothing else
              to learn, nothing to migrate.
            </p>
          </motion.div>

          {/* Bento — light-gray cards with floating mocks (Quartr style) */}
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
            {/* Row 1 — wide + narrow */}
            <BentoCard
              className="md:col-span-2"
              title="Compose visually"
              desc="Full page, diptych, triptych, image with text or quote — arrange and reorder every block by drag and drop."
            >
              <ComposeVisual />
            </BentoCard>
            <BentoCard
              title="Send your way"
              desc="One room, three outputs: a private link, a high-definition PDF, or a polished HTML email."
            >
              <FormatsVisual />
            </BentoCard>

            {/* Row 2 — three equal */}
            <BentoCard
              title="Personalize each room"
              desc="Recipient, headline, intro and captions — each room is tailored to one collector."
            >
              <RecipientVisual />
            </BentoCard>
            <BentoCard
              title="One link, any device"
              desc="Each room opens from a single private link on mobile or desktop — no download, no login."
            >
              <LinkVisual />
            </BentoCard>
            <BentoCard
              title="Export in high definition"
              desc="Every room becomes a print-ready PDF aligned with the on-screen preview."
            >
              <PdfVisual />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Outputs — one room, every format */}
      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <Eyebrow>One room, every format</Eyebrow>
            <h2 className="mt-4 font-display text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-[#111110] md:text-[32px]">
              Compose once. Send it the way each collector prefers.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            {mockupStories.map((card, i) => (
              <motion.article
                key={card.title}
                {...fadeUp(i * 0.06)}
                className="group overflow-hidden rounded-lg border border-[#E8E8E6] bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F3]">
                  <div className="absolute inset-6 rounded-md border border-[#E8E8E6] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform duration-500 group-hover:-translate-y-1.5">
                    <div className="h-2 w-16 rounded-full bg-[#E2E1DD]" />
                    <div className="mt-4 space-y-1.5">
                      <span className="block h-1.5 w-full rounded-full bg-[#ECEBE7]" />
                      <span className="block h-1.5 w-4/5 rounded-full bg-[#ECEBE7]" />
                      <span className="block h-1.5 w-3/5 rounded-full bg-[#ECEBE7]" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B6A67]">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp()} className="mx-auto max-w-xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Pricing</Eyebrow>
            </div>
            <h2 className="mt-4 font-display text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-[#111110] md:text-[32px]">
              Monthly or yearly
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#6B6A67]">
              Unlimited rooms, exports and sharing. Cancel anytime.
            </p>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
            <motion.div
              {...fadeUp(0.05)}
              className="flex h-full min-h-0 flex-col rounded-lg border border-[#E8E8E6] bg-white p-7 md:p-8"
            >
              <p className="text-[12px] font-medium text-[#6B6A67]">Monthly</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl text-[#111110]">19</span>
                <span className="text-[15px] text-[#6B6A67]">€ / month</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6B6A67]">
                Flexible billing, suited to occasional sends.
              </p>
              <ul className="mt-5 flex-1 space-y-2.5" aria-label="Included in the monthly plan">
                {planIncludes.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-[#454543]">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe("monthly")}
                size="lg"
                variant="inverse"
                className="mt-8 w-full justify-center border border-[#E8E8E6]"
                disabled={!!loadingCheckout}
              >
                {loadingCheckout === "monthly"
                  ? "Redirecting…"
                  : isPro
                    ? "Open editor"
                    : "Subscribe — €19/month"}
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp(0.12)}
              className="relative flex h-full min-h-0 flex-col rounded-lg bg-[#111110] p-7 text-white md:p-8"
            >
              <span className="absolute right-6 top-7 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-tight text-white/80 md:top-8">
                Best value
              </span>
              <p className="text-[12px] font-medium text-white/65">Yearly</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl">110</span>
                <span className="text-[15px] text-white/70">€ / year</span>
              </div>
              <p className="mt-1 text-[13px] text-white/55">
                Around €9.17 / month · ~52% cheaper than 12 months at the monthly rate
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/70">
                Same access, yearly commitment.
              </p>
              <ul className="mt-5 flex-1 space-y-2.5" aria-label="Included in the yearly plan">
                {planIncludes.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-white/85">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe("yearly")}
                size="lg"
                variant="inverse"
                className="mt-8 w-full justify-center border-0 bg-white text-[#111110] hover:bg-neutral-100"
                disabled={!!loadingCheckout}
              >
                {loadingCheckout === "yearly"
                  ? "Redirecting…"
                  : isPro
                    ? "Open editor"
                    : "Subscribe — €110/year"}
              </Button>
              {yearlyError && (
                <p className="mt-3 text-center text-[12px] text-amber-200/90">{yearlyError}</p>
              )}
            </motion.div>
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-[12px] text-[#ADADAA]">
            Secure payment by Stripe
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <motion.div {...fadeUp()}>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-display text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-[#111110] md:text-[32px]">
                Questions, answered
              </h2>
            </motion.div>
            <motion.div {...fadeUp(0.08)} className="border-t border-[#E8E8E6]">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 py-12 md:px-6 md:py-[60px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...fadeUp()}
            className="rounded-2xl bg-[#111110] px-6 py-14 text-center md:px-12 md:py-20"
          >
            <h2 className="mx-auto max-w-2xl font-display text-[28px] font-normal leading-[1.12] tracking-[-0.02em] text-white md:text-[40px]">
              Your next viewing room is a few minutes away
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
              Compose, share and follow up — without leaving the browser.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={goToEditor}
                size="lg"
                variant="inverse"
                className="border-0 bg-white text-[#111110] hover:bg-neutral-100"
              >
                {ctaLabel}
              </Button>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-white/10 md:px-8 md:py-3.5 md:text-[15px]"
              >
                See pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[#E8E8E6] px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-[12px] text-[#ADADAA] sm:flex-row sm:items-center">
          <Link
            href="/"
            className="font-display text-[14px] tracking-[-0.01em] text-[#111110] transition-colors hover:text-[#6B6A67]"
          >
            Viewing Room Studio
          </Link>
          <p>Part of Vitreen · Made for galleries</p>
        </div>
      </footer>
    </div>
  );
}
