"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { AssistantMock } from "@/components/showcase/PillarMocks";
import ScrollStory from "@/components/ScrollStory";
import HeroCurtainMock from "@/components/HeroCurtainMock";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const STEPS = [
  {
    title: "Inquiry Drafts",
    subtitle: "AI-prepared replies for every collector inquiry, reviewed and sent by the gallery.",
    bullets: [
      "New inquiries become sales drafts",
      "Artwork details are added automatically",
      "Your team reviews before anything is sent",
    ],
  },
  {
    title: "Gmail Side Panel",
    subtitle: "Use Gallery OS directly inside Gmail.",
    bullets: [
      "Search artworks while replying",
      "Add images, captions and details",
      "No need to leave the email thread",
    ],
  },
  {
    title: "WhatsApp PDF Maker",
    subtitle: "Create artwork PDFs from the mobile app.",
    bullets: [
      "Select works from your inventory",
      "Choose what details to show",
      "Send a clean PDF in a few clicks",
    ],
  },
  {
    title: "Follow-up Memory",
    subtitle: "Keep track of what was shared with each collector.",
    bullets: [
      "See which works were sent",
      "Remember next steps",
      "Follow up with the right context",
    ],
  },
];

const GMAIL_RESULTS = [
  {
    title: "Evening field",
    year: "2023",
    price: "10 000 €",
    status: "AVAILABLE",
    statusClass: "text-[#16A34A]",
    image: "/artworks/painting-05.jpg",
  },
  {
    title: "Amber Nocturne",
    year: "2025",
    price: "14 000 €",
    status: "SOLD",
    statusClass: "text-[#71717A]",
    image: "/artworks/painting-10.jpg",
  },
  {
    title: "Crimson Field",
    year: "2024",
    price: "9 500 €",
    status: "SOLD",
    statusClass: "text-[#71717A]",
    image: "/artworks/painting-08.jpg",
  },
] as const;

export function InquiryDraftsFrame({ animatePipeline = false }: { animatePipeline?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animatePipeline && !prefersReducedMotion;

  return (
    <div className="absolute inset-0">
      <div className="grid h-full w-full grid-cols-[0.84fr_1.16fr] gap-[5px]">
        <motion.section
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: shouldAnimate ? 0.1 : 0 }}
          className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-[#E2E2DF] bg-white"
        >
          <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
            <div>
              <h3 className="text-[13px] font-semibold text-zinc-900">Collector inquiry</h3>
              <p className="mt-0.5 text-[10px] text-zinc-400">Received just now</p>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-zinc-900 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-white">
              Inquire button
            </span>
          </div>

          <div className="flex flex-1 flex-col px-4 py-4">
            <dl className="space-y-3">
              <div>
                <dt className="text-[10px] text-zinc-400">Collector</dt>
                <dd className="mt-0.5 text-[12px] font-medium text-zinc-900">
                  Jean Collectionneur
                </dd>
              </div>
              <div>
                <dt className="text-[10px] text-zinc-400">Artwork</dt>
                <dd className="mt-1 flex items-center gap-2.5">
                  <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                    <span className="mx-auto mt-1.5 block h-6 w-5 bg-[#1D3156]" />
                  </span>
                  <span>
                    <span className="block text-[12px] font-medium text-zinc-900">
                      Evening field
                    </span>
                    <span className="block text-[10px] text-zinc-400">Sacha Elron · 2023</span>
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-4 rounded-xl border border-zinc-100 bg-zinc-50 p-3">
              <p className="text-[10px] text-zinc-400">Message</p>
              <p className="mt-1.5 text-[11px] leading-[1.55] text-zinc-700">
                “Could you share the price and availability of Evening field? I would also be
                interested in visiting the gallery next week.”
              </p>
            </div>

            <div className="mt-auto flex items-center gap-2 pt-4 text-[10px] text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Inquiry received
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={shouldAnimate ? { opacity: 0, x: 14 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: shouldAnimate ? 0.85 : 0 }}
          className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-[#E2E2DF] bg-white"
        >
          <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
            <div>
              <h3 className="text-[13px] font-semibold text-zinc-900">Prepared reply</h3>
              <p className="mt-0.5 text-[10px] text-zinc-400">Review before sending</p>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700">
              Draft
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-4 py-3">
            <label className="text-[10px] text-zinc-500">Subject</label>
            <div className="mt-1 rounded-lg border border-zinc-200 px-3 py-2 text-[11px] text-zinc-900">
              Re: Evening field
            </div>

            <label className="mt-2.5 text-[10px] text-zinc-500">Editable draft</label>
            <div className="mt-1 min-h-0 flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-[10px] leading-[1.45] text-zinc-700">
              <p>Bonjour Jean,</p>
              <p className="mt-1.5">Thank you for your interest in Evening field.</p>
              <p className="mt-1.5">
                The work is currently available. I would be happy to share the price and arrange a
                visit at the gallery next week.
              </p>
              <p className="mt-1.5">Best regards,</p>
            </div>

            <div className="mt-2.5 flex items-end justify-between gap-3">
              <p className="max-w-[190px] text-[9px] leading-[1.35] text-zinc-500">
                Nothing is sent without gallery approval.
              </p>
              <div className="flex shrink-0 gap-1.5">
                <button
                  type="button"
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[10px] font-medium text-zinc-700"
                >
                  Edit draft
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-zinc-900 px-3 py-2 text-[10px] font-medium text-white"
                >
                  Send reply
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function IntegrationsFrame() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState(reduceMotion ? "Elron" : "");
  const [showResults, setShowResults] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(false);
  const [showInsertedArtwork, setShowInsertedArtwork] = useState(Boolean(reduceMotion));
  const [panelOpen, setPanelOpen] = useState(false);
  const [logoBump, setLogoBump] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setQuery("Elron");
      setShowResults(false);
      setSelectedArtwork(false);
      setShowInsertedArtwork(true);
      setPanelOpen(false);
      setLogoBump(false);
      return;
    }

    const word = "Elron";
    const timers: number[] = [];

    const play = () => {
      setQuery("");
      setShowResults(false);
      setSelectedArtwork(false);
      setShowInsertedArtwork(false);
      setPanelOpen(false);
      setLogoBump(false);

      timers.push(window.setTimeout(() => setLogoBump(true), 180));
      timers.push(window.setTimeout(() => setLogoBump(false), 600));
      timers.push(window.setTimeout(() => setPanelOpen(true), 650));

      word.split("").forEach((_, index) => {
        timers.push(
          window.setTimeout(
            () => {
              setQuery(word.slice(0, index + 1));
            },
            950 + index * 230
          )
        );
      });

      timers.push(window.setTimeout(() => setShowResults(true), 2350));
      timers.push(window.setTimeout(() => setSelectedArtwork(true), 4300));
      timers.push(window.setTimeout(() => setShowInsertedArtwork(true), 5200));
      timers.push(window.setTimeout(play, 9100));
    };

    play();

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-[92%] overflow-hidden rounded-[18px] border border-[#E1E3E6] bg-white">
        <div className="flex h-10 items-center justify-between bg-[#F0F4F9] px-4">
          <span className="text-[12px] font-semibold text-[#202124]">New Message</span>
          <div className="flex items-center gap-3 text-[12px] text-[#5F6368]">
            <span aria-hidden="true">−</span>
            <span aria-hidden="true">↗</span>
            <span aria-hidden="true">×</span>
          </div>
        </div>

        <div className="border-b border-[#E8E8E6] px-4 py-2.5 text-[11px] text-[#6B6A67]">
          Recipients
        </div>
        <div className="border-b border-[#E8E8E6] px-4 py-2.5 text-[11px] text-[#6B6A67]">
          Subject
        </div>

        <AnimatePresence>
          {showInsertedArtwork ? (
            <motion.div
              className="absolute inset-x-4 bottom-[96px] top-[104px] overflow-hidden px-3 py-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="grid w-[54%] max-w-[460px] grid-rows-[auto_auto] overflow-hidden text-[#202124]">
                <img
                  src="/artworks/painting-05.jpg"
                  alt="Evening field by Sacha Elron"
                  className="aspect-[43/24] w-full object-cover"
                />
                <div className="relative pb-0.5 pt-2">
                  <p className="text-[10px] font-medium">Sacha Elron</p>
                  <p className="text-[10px] italic">Evening field, 2023</p>
                  <p className="mt-0.5 text-[9px] text-[#8B93A1]">Acrylic on canvas</p>
                  <p className="text-[9px] text-[#8B93A1]">120 × 120 cm</p>
                  <p className="mt-0.5 text-[10px]">10 000 €</p>
                  <button
                    type="button"
                    className="absolute right-0 top-2 border border-[#202124] bg-white px-3 py-1 text-[9px]"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="absolute inset-x-4 bottom-[52px]">
          <div className="flex h-9 items-center gap-3 rounded-full bg-[#F0F4FA] px-4 text-[12px] font-medium text-[#4B4F52]">
            <span>↶</span>
            <span>↷</span>
            <span className="h-5 w-px bg-[#C9CDD2]" />
            <span>Sans Serif</span>
            <span className="text-[10px]">▾</span>
            <span className="h-5 w-px bg-[#C9CDD2]" />
            <span className="font-semibold">T</span>
            <span className="font-semibold">B</span>
            <span className="italic">I</span>
            <span className="underline">U</span>
            <span className="hidden sm:inline">A</span>
            <span className="hidden sm:inline">≡</span>
            <span className="hidden sm:inline">☷</span>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-2 flex h-9 items-center gap-3">
          <button
            type="button"
            className="flex h-8 items-center overflow-hidden rounded-full bg-[#0B57D0] text-[11px] font-medium text-white"
          >
            <span className="px-4">Send</span>
            <span className="border-l border-white/30 px-2">▾</span>
          </button>
          <span className="text-[15px] text-[#5F6368]">Aa</span>
          <span className="text-[15px] text-[#5F6368]">⌕</span>
          <span className="text-[15px] text-[#5F6368]">↗</span>
          <span className="text-[15px] text-[#5F6368]">☺</span>

          <div className="relative ml-2">
            <span className="absolute bottom-9 right-0 w-max rounded-md bg-[#4A4A4A] px-2.5 py-1.5 text-[9px] text-white shadow-sm">
              Insérer une œuvre Gallery OS
            </span>
            <motion.span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EAED] shadow-[0_0_0_2px_rgba(17,17,16,0.05)]"
              animate={logoBump ? { scale: [1, 0.9, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.42, ease }}
            >
              <img src="/icons/gallery-os.svg" alt="" aria-hidden="true" className="h-6 w-6" />
            </motion.span>
          </div>

          <span className="text-[16px] text-[#5F6368]">⋮</span>
          <span className="ml-auto text-[15px] text-[#5F6368]">⌫</span>
        </div>
      </div>

      <AnimatePresence>
        {!showInsertedArtwork && panelOpen ? (
          <motion.aside
            className="absolute bottom-6 right-[10%] top-9 flex w-[44%] min-w-[300px] flex-col overflow-hidden rounded-[10px] border border-[#D8D8D5] bg-white shadow-[0_18px_48px_rgba(17,17,16,0.16)]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.32, ease }}
          >
            <div className="flex h-11 shrink-0 items-center justify-between bg-[#414141] px-4 text-white">
              <h3 className="text-[14px] font-semibold">Gallery OS</h3>
              <div className="flex items-center gap-3 text-[18px] leading-none">
                <span aria-hidden="true">⋮</span>
                <span aria-hidden="true">×</span>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-4 py-4">
              <h4 className="text-[13px] font-medium text-[#202124]">Insérer une œuvre</h4>
              <p className="mt-1 text-[12px] text-[#4A4A4A]">Recherche dans Gallery OS</p>

              <div className="mt-4 border-t border-[#D5D5D2] pt-4">
                <div className="flex min-h-[42px] items-center rounded-[5px] border border-[#777773] px-3 py-2.5 text-[13px] text-[#333331]">
                  <span>{query}</span>
                  {!reduceMotion ? (
                    <motion.span
                      className="ml-px h-4 w-px bg-[#333331]"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-[10px] leading-[1.35] text-[#5F5F5B]">
                  Titre ou nom d’artiste · appuie sur Chercher
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-[#0B57D0] px-5 py-2 text-[11px] font-medium text-white"
                >
                  Chercher
                </button>
                <button
                  type="button"
                  className="rounded-full border border-[#777773] bg-white px-5 py-[7px] text-[11px] font-medium text-[#0B57D0]"
                >
                  Vue galerie
                </button>
              </div>

              <AnimatePresence>
                {showResults ? (
                  <motion.div
                    className="-mx-4 mt-4 min-h-0 flex-1 overflow-hidden border-t border-[#D5D5D2]"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <p className="px-4 py-2.5 text-[12px] text-[#333331]">8 résultats</p>
                    <div className="divide-y divide-[#D5D5D2] border-t border-[#D5D5D2]">
                      {GMAIL_RESULTS.map((result, index) => (
                        <motion.div
                          key={result.title}
                          className={`flex items-center gap-3 px-4 py-2.5 ${
                            selectedArtwork && index === 0 ? "bg-[#EEF4FF]" : "bg-white"
                          }`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: selectedArtwork && index === 0 ? 0.99 : 1,
                          }}
                          transition={{ duration: 0.28, delay: index * 0.08, ease }}
                        >
                          <img
                            src={result.image}
                            alt=""
                            className="h-8 w-8 shrink-0 rounded-[2px] border border-[#E1E1DE] object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-[9px] uppercase text-[#4A4A47]">
                              Sacha Elron
                            </p>
                            <p className="truncate text-[12px] italic text-[#202124]">
                              {result.title}, {result.year}
                            </p>
                            <p className="mt-0.5 text-[10px] text-[#4A4A47]">
                              {result.price} ·{" "}
                              <span className={`font-semibold ${result.statusClass}`}>
                                {result.status}
                              </span>
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppPdfFrame() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-[5px]">
      <section className="relative h-full min-h-0 overflow-hidden rounded-[18px] border border-[#E2E2DF] bg-white">
        <video
          className="h-full w-full scale-[1.58] object-contain sm:scale-[1.196]"
          src="/WhatsApp.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="WhatsApp PDF creation flow"
        />
      </section>

      <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border border-[#E2E2DF] bg-[#F5F5F2]">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#E2E2DF] bg-white px-4">
          <div>
            <p className="text-[11px] font-medium text-[#111110]">Private selection</p>
            <p className="text-[9px] text-[#9A9A96]">PDF preview</p>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-[#8B8B87]">
            <span>1 / 3</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#E6473C] text-[6px] font-bold text-white">
              PDF
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center p-4">
          <article className="flex aspect-[0.72] h-[92%] max-h-[390px] flex-col bg-white px-5 py-5 shadow-[0_12px_30px_rgba(17,17,16,0.10)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] font-semibold tracking-[0.18em] text-[#111110]">GALERIE</p>
                <p className="mt-5 text-[7px] uppercase tracking-[0.14em] text-[#A5A5A1]">
                  Private selection
                </p>
                <h3 className="mt-1 text-[14px] font-medium leading-tight text-[#111110]">
                  Prepared for
                  <br />
                  Marie Beaumont
                </h3>
              </div>
              <p className="text-right text-[7px] leading-[1.4] text-[#A5A5A1]">
                3 works
                <br />
                July 2026
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <div>
                <img
                  src="/artworks/painting-05.jpg"
                  alt=""
                  className="aspect-[0.92] w-full object-cover"
                />
                <p className="mt-1.5 text-[7px] font-medium text-[#111110]">Evening field</p>
                <p className="text-[6px] text-[#8E8E8A]">Sacha Elron, 2023</p>
              </div>
              <div>
                <img
                  src="/artworks/painting-08.jpg"
                  alt=""
                  className="aspect-[0.92] w-full object-cover"
                />
                <p className="mt-1.5 text-[7px] font-medium text-[#111110]">Crimson Field</p>
                <p className="text-[6px] text-[#8E8E8A]">Sacha Elron, 2024</p>
              </div>
            </div>

            <div className="mt-auto flex items-end justify-between border-t border-[#E8E8E5] pt-3">
              <p className="text-[6px] leading-[1.4] text-[#9A9A96]">
                Confidential
                <br />
                Prepared by Gallery OS
              </p>
              <p className="text-[7px] font-medium text-[#111110]">VITREEN</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

const FOLLOW_UP_EVENTS = [
  {
    date: "12 June",
    title: "PDF “Evening Field” sent via WhatsApp",
    detail: "Evening Field · Collector PDF",
    status: "Sent",
    image: "/artworks/painting-05.jpg",
    icon: "whatsapp",
    iconClass: "text-[#25A85A]",
  },
  {
    date: "14 June",
    title: "Opened the private selection",
    detail: "3 works viewed",
    status: "Opened",
    images: ["/artworks/painting-05.jpg", "/artworks/painting-08.jpg", "/artworks/painting-10.jpg"],
    icon: "link",
    iconClass: "text-[#71716D]",
  },
  {
    date: "20 June",
    title: "Inquiry about “Amber Nocturne”",
    detail: "Amber Nocturne",
    status: "Inquiry received",
    image: "/artworks/painting-10.jpg",
    icon: "mail",
    iconClass: "text-[#5A6F95]",
  },
] as const;

function TimelineIcon({
  name,
  className,
}: {
  name: (typeof FOLLOW_UP_EVENTS)[number]["icon"] | "check";
  className?: string;
}) {
  const paths = {
    whatsapp: (
      <>
        <path d="M7.2 14.7 3 16l1.3-4.1a6.5 6.5 0 1 1 2.9 2.8Z" />
        <path d="M7.2 6.8c.4 2 2 3.6 4 4" />
      </>
    ),
    link: (
      <>
        <path d="m8.5 11.5 3-3" />
        <path d="M6.7 12.8 5.5 14a2.1 2.1 0 0 1-3-3l2.2-2.2a2.1 2.1 0 0 1 3-.1" />
        <path d="m9.3 7.2 1.2-1.2a2.1 2.1 0 1 1 3 3l-2.2 2.2a2.1 2.1 0 0 1-3 .1" />
      </>
    ),
    mail: (
      <>
        <rect x="2.5" y="4" width="13" height="9.5" rx="1.5" />
        <path d="m3 5 6 4.5L15 5" />
      </>
    ),
    check: <path d="m4.5 9 2.7 2.7 5.8-6" />,
  };

  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function FollowUpMemoryFrame() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E2E2DF] bg-white">
      <header className="flex shrink-0 items-center gap-3 border-b border-[#ECECE9] px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F1EE] text-[11px] font-medium text-[#555550]">
          JC
        </div>
        <div>
          <h3 className="text-[14px] font-medium text-[#111110]">Jean Collectionneur</h3>
          <p className="mt-0.5 text-[10px] text-[#999994]">Last interaction · 20 June</p>
        </div>
      </header>

      <div className="min-h-0 flex-1 px-6 py-3">
        <div className="relative h-full">
          <div className="absolute bottom-5 left-[53px] top-5 w-px bg-[#E4E4E0]" />

          <div className="grid h-full grid-rows-3">
            {FOLLOW_UP_EVENTS.map((event) => {
              return (
                <article
                  key={event.date}
                  className="relative grid min-h-0 grid-cols-[42px_22px_1fr_auto] items-center gap-3 border-b border-[#F0F0ED] last:border-b-0"
                >
                  <time className="text-[9px] text-[#999994]">{event.date}</time>

                  <div className="relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[#E2E2DE] bg-white">
                    <TimelineIcon name={event.icon} className={`h-3 w-3 ${event.iconClass}`} />
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    {"images" in event ? (
                      <div className="flex w-[52px] shrink-0 items-center pl-1">
                        {event.images.map((image, index) => (
                          <img
                            key={image}
                            src={image}
                            alt=""
                            className="-ml-1 h-8 w-8 rounded-[3px] border-2 border-white object-cover first:ml-0"
                            style={{ zIndex: event.images.length - index }}
                          />
                        ))}
                      </div>
                    ) : (
                      <img
                        src={event.image}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-[3px] border border-[#E3E3DF] object-cover"
                      />
                    )}

                    <div className="min-w-0">
                      <h4 className="truncate text-[11px] font-medium text-[#222220]">
                        {event.title}
                      </h4>
                      <p className="mt-0.5 truncate text-[9px] text-[#8A8A86]">{event.detail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] text-[#777773]">
                    <TimelineIcon name="check" className="h-3 w-3 text-[#238A55]" />
                    <span>{event.status}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const FRAMES = [InquiryDraftsFrame, IntegrationsFrame, WhatsAppPdfFrame, FollowUpMemoryFrame];

function AssistantVisual({ index }: { index: number }) {
  const Frame = FRAMES[index] ?? FRAMES[0];
  const needsMobileScale = index === 0 || index === 1;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        className="h-full w-full overflow-hidden rounded-[12px]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease }}
      >
        <div
          className={
            needsMobileScale
              ? "h-[142.857%] w-[142.857%] origin-top-left scale-[0.7] sm:h-full sm:w-full sm:scale-100"
              : "h-full w-full"
          }
        >
          <Frame />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GalleryAssistantProductPage() {
  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-display text-[22px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110] md:text-[30px]">
              Gallery Assistant
            </h1>
            <p className="mt-2 max-w-4xl text-[22px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67] md:text-[30px]">
              Reply to collectors faster, with every artwork detail already in place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                Adapt the workflow
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="relative -mr-4 mt-14 h-[620px] overflow-hidden rounded-[5px] bg-[#D8D2C8] md:mr-0 md:mt-20 md:h-[720px] md:rounded-xl"
            style={{ isolation: "isolate", willChange: "transform" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/paula-cooper-background.jpg')" }}
            />

            <HeroCurtainMock cropFromBottomOnMobile>
              <AssistantMock />
            </HeroCurtainMock>
          </motion.div>
        </div>
      </section>

      <ScrollStory
        title="Vitreen adapts to the gallery."
        subtitle="Not the other way around."
        steps={STEPS}
        compactMobileVisual
        renderVisual={(index) => <AssistantVisual index={index} />}
        isVisualBare={() => true}
      />

      <CtaBand />
      <Footer />
    </main>
  );
}
