"use client";

import { useState, type ReactNode } from "react";
import { useOptionalUser, clerkEnabled } from "@/lib/useOptionalUser";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { HeroRoomMockup } from "@/components/ovr/HeroRoomMockup";

const ease = [0.16, 1, 0.3, 1] as const;

type Feature = { title: string; desc: string; icon: ReactNode };

const features: Feature[] = [
  {
    title: "Free layout",
    desc: "Full page, diptych, triptych, image with text or quote. Reorder everything by drag and drop.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M21 7.5H3" />
      </svg>
    ),
  },
  {
    title: "Export PDF",
    desc: "High-resolution document aligned with the preview — ready to print or archive.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Email HTML",
    desc: "Polished rendering in email clients including Gmail, an online viewing link, captions, and calls to action.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.815a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Private link",
    desc: "One URL per send: opens on mobile or desktop, with no heavy attachments.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: "Personalization",
    desc: "Recipient, headline, introduction, footer: each room is tailored to one contact.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Single workflow",
    desc: "Import, compose, and refine — all in the browser, without switching tools.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
        <path d="M8.25 9.75h7.5M8.25 12.75h4.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

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
    <span className="grid grid-cols-2 gap-[2px]" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="h-[2.5px] w-[2.5px] rounded-full bg-[#ADADAA]" />
      ))}
    </span>
  );
}

function ComposeMock() {
  return (
    <div className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-lg border border-[#E8E8E6] bg-[#FAFAFA] px-8 md:min-h-[340px]">
      {/* Target block */}
      <div className="relative w-[60%] overflow-hidden rounded-md border border-dashed border-[#3b82f6]/50 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <img
          src="/artworks/painting-09.png"
          alt="Artwork block"
          className="aspect-square w-full object-cover"
        />
        {/* Drop indicator */}
        <span className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_6px_16px_rgba(16,185,129,0.4)]">
          Make diptych
        </span>
      </div>

      {/* Dragging block — distinctive grab handle + lifted shadow */}
      <div className="absolute right-7 top-7 z-20 w-[42%] rotate-[-4deg] overflow-hidden rounded-md border border-black/[0.08] bg-white opacity-95 shadow-[0_24px_48px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-center border-b border-black/[0.05] bg-[#FBFBFA] py-1.5">
          <DragHandle />
        </div>
        <img
          src="/artworks/v2-earth.png"
          alt="Dragging artwork block"
          className="aspect-square w-full object-cover"
        />
      </div>
    </div>
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

          {/* Step 01 — featured with import mockup */}
          <motion.div
            {...fadeUp()}
            className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[#E8E8E6] bg-[#E8E8E6] md:mt-12 md:grid-cols-2"
          >
            <div className="flex flex-col justify-center bg-white p-7 md:p-10">
              <span className="font-display text-[28px] font-normal tracking-tight text-[#ADADAA]">
                {howSteps[0].n}
              </span>
              <h3 className="mt-4 font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110]">
                {howSteps[0].title}
              </h3>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#6B6A67]">
                {howSteps[0].desc}
              </p>
            </div>
            <div className="bg-white p-5 md:p-7">
              <ImportMock />
            </div>
          </motion.div>

          {/* Step 02 — featured with compose mockup */}
          <motion.div
            {...fadeUp()}
            className="mt-px grid gap-px overflow-hidden rounded-lg border border-[#E8E8E6] bg-[#E8E8E6] md:grid-cols-2"
          >
            <div className="order-2 bg-white p-5 md:order-1 md:p-7">
              <ComposeMock />
            </div>
            <div className="order-1 flex flex-col justify-center bg-white p-7 md:order-2 md:p-10">
              <span className="font-display text-[28px] font-normal tracking-tight text-[#ADADAA]">
                {howSteps[1].n}
              </span>
              <h3 className="mt-4 font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110]">
                {howSteps[1].title}
              </h3>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#6B6A67]">
                {howSteps[1].desc}
              </p>
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div
            {...fadeUp()}
            className="mt-px overflow-hidden rounded-lg border border-[#E8E8E6] bg-white p-7 md:p-8"
          >
            <span className="font-display text-[28px] font-normal tracking-tight text-[#ADADAA]">
              {howSteps[2].n}
            </span>
            <h3 className="mt-4 font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110]">
              {howSteps[2].title}
            </h3>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#6B6A67]">
              {howSteps[2].desc}
            </p>
          </motion.div>
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

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.05)}
                className="rounded-lg border border-[#E8E8E6] bg-white p-6 transition-colors hover:bg-[#FAFAF9]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F3] text-[#111110]">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-display text-[17px] font-normal tracking-[-0.01em] text-[#111110]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#6B6A67]">{f.desc}</p>
              </motion.div>
            ))}
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
