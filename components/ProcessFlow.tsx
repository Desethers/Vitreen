"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_DELAY = 1400;
const LOOP_PAUSE = 1800;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease, delay },
});

const detailContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const detailItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease },
  },
};

type SourceItem = {
  label: string;
  active?: boolean;
  icon: "archive" | "sheet" | "folder" | "library" | "mail";
};

// Detail shown under the "Audit" step — the only step that reads from this
// data (Connect and Ready render their own hardcoded visuals below).
const sourceDetails: Record<"fr" | "en", SourceItem[]> = {
  fr: [
    { label: "Dossiers", icon: "folder" },
    { label: "Archives", icon: "library" },
    { label: "Canaux d’échange", icon: "mail" },
    { label: "PDF & fiches", icon: "archive" },
  ],
  en: [
    { label: "Folders", icon: "folder" },
    { label: "Archives", icon: "library" },
    { label: "Communication channels", icon: "mail" },
    { label: "PDFs & sheets", icon: "archive" },
  ],
};

const horizontalDisplaySteps = {
  fr: [
    {
      title: "Audit",
      body: "On regarde comment vos œuvres et vos informations circulent déjà dans la galerie.",
    },
    {
      title: "Connect",
      body: "Vitreen relie vos fichiers d’œuvres, vos sélections et vos échanges collectionneurs en un seul flux.",
    },
    {
      title: "Ready",
      body: "On construit votre dashboard et votre site connecté, puis on reste partenaire au quotidien.",
    },
  ],
  en: [
    {
      title: "Audit",
      body: "We review how artworks and information already move across the gallery.",
    },
    {
      title: "Connect",
      body: "Vitreen connects your artwork files, selections and collector conversations into one flow.",
    },
    {
      title: "Ready",
      body: "We build your dashboard and connected website, then stay on as your operating partner.",
    },
  ],
} as const;

export default function ProcessFlow() {
  const { lang, t } = useLang();
  const storySteps = horizontalDisplaySteps[lang];
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalIsInView = useInView(horizontalRef, {
    once: false,
    margin: "0px",
    amount: 0.35,
  });
  const [horizontalActiveStep, setHorizontalActiveStep] = useState(-1);
  // Circles whose incoming progress line has finished travelling — these fill black.
  const [filledCircles, setFilledCircles] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!horizontalIsInView) {
      setHorizontalActiveStep(-1);
      setFilledCircles(new Set());
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      if (cancelled) return;
      // Reset to replay the sequence from the start.
      setHorizontalActiveStep(-1);
      setFilledCircles(new Set());

      storySteps.forEach((_, index) => {
        timers.push(
          setTimeout(
            () => {
              if (!cancelled) setHorizontalActiveStep(index);
            },
            180 + index * STEP_DELAY
          )
        );
      });

      // Full cycle: last step activates, then the fade-out line plays for one
      // STEP_DELAY, then a pause before looping back to the beginning.
      const cycle = 180 + storySteps.length * STEP_DELAY + LOOP_PAUSE;
      timers.push(setTimeout(run, cycle));
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [horizontalIsInView, storySteps.length]);

  return (
    <section id="how-it-works" className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp(0)} className="mb-8 max-w-3xl md:mb-10">
          <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
            {t.processFlow.title}
          </h2>
          <p className="mt-1 text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
            {t.processFlow.subtitle}
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.08)} ref={horizontalRef} className="mt-0">
          <div className="relative">
            <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3 md:gap-10">
              {storySteps.map((step, index) => {
                const active = horizontalActiveStep >= index;
                const current = horizontalActiveStep === index;
                // First circle has no incoming line, so it fills as soon as the
                // timer starts there; the rest fill only once their line arrives.
                const filled = index === 0 ? active : filledCircles.has(index);

                return (
                  <li
                    key={`horizontal-story-step-${step.title}`}
                    className={`relative flex min-w-0 gap-4 md:block md:min-h-0 ${
                      index < storySteps.length - 1 ? "min-h-[128px]" : ""
                    }`}
                  >
                    {/* Mobile vertical connector */}
                    {index < storySteps.length - 1 && (
                      <div
                        className="absolute -bottom-6 left-[18px] top-9 w-px -translate-x-1/2 md:hidden"
                        aria-hidden
                      >
                        <div className="absolute inset-0 bg-[#111110]/12" />
                        <motion.div
                          className="absolute inset-0 origin-top bg-[#111110]"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: horizontalActiveStep >= index ? 1 : 0 }}
                          transition={
                            horizontalActiveStep >= index
                              ? { duration: STEP_DELAY / 1000, ease: "linear" }
                              : { duration: 0 }
                          }
                        />
                      </div>
                    )}
                    {/* Mobile vertical fade-out connector from the last step */}
                    {index === storySteps.length - 1 && (
                      <div
                        className="absolute left-[18px] top-9 h-20 w-px -translate-x-1/2 md:hidden"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(17,17,16,0.12), rgba(17,17,16,0))",
                        }}
                        aria-hidden
                      >
                        <motion.div
                          className="absolute inset-0 origin-top"
                          style={{
                            background: "linear-gradient(to bottom, #111110, rgba(17,17,16,0))",
                          }}
                          initial={{ scaleY: 0 }}
                          animate={{
                            scaleY: filledCircles.has(index) ? 1 : 0,
                          }}
                          transition={
                            filledCircles.has(index)
                              ? { duration: STEP_DELAY / 1000, ease: "linear" }
                              : { duration: 0 }
                          }
                        />
                      </div>
                    )}
                    {index < storySteps.length - 1 && (
                      <div
                        className="absolute left-14 top-5 hidden h-px -translate-y-px md:block"
                        style={{ right: -60 }}
                        aria-hidden
                      >
                        <div className="absolute inset-0 bg-[#111110]/12" />
                        <motion.div
                          className="absolute inset-0 origin-left bg-[#111110]"
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: horizontalActiveStep >= index ? 1 : 0,
                          }}
                          transition={
                            horizontalActiveStep >= index
                              ? { duration: STEP_DELAY / 1000, ease: "linear" }
                              : { duration: 0 }
                          }
                          onAnimationComplete={() => {
                            // Line reached the next circle → fill it black.
                            if (horizontalActiveStep >= index) {
                              setFilledCircles((prev) => {
                                const next = new Set(prev);
                                next.add(index + 1);
                                return next;
                              });
                            }
                          }}
                        />
                      </div>
                    )}
                    {index === storySteps.length - 1 && (
                      <div
                        className="absolute left-14 right-0 top-5 hidden h-px -translate-y-px md:block"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(17,17,16,0.12), rgba(17,17,16,0))",
                        }}
                        aria-hidden
                      >
                        <motion.div
                          className="absolute inset-0 origin-left"
                          style={{
                            background: "linear-gradient(to right, #111110, rgba(17,17,16,0))",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: filledCircles.has(index) ? 1 : 0,
                          }}
                          transition={
                            filledCircles.has(index)
                              ? { duration: STEP_DELAY / 1000, ease: "linear" }
                              : { duration: 0 }
                          }
                        />
                      </div>
                    )}
                    <motion.div
                      className="relative z-10 mb-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white text-[12px] font-normal leading-none tracking-[-0.02em] text-[#111110] md:mb-6 md:h-10 md:w-10 md:text-[13px]"
                      animate={{
                        borderColor: filled || active ? "#111110" : "#D8D8D2",
                        backgroundColor: filled ? "#111110" : "#ffffff",
                        color: filled ? "#ffffff" : "#6B6A67",
                        scale: current ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.28, ease }}
                    >
                      {index + 1}
                    </motion.div>

                    <div className="flex min-w-0 flex-1 flex-col pt-1 md:block md:pt-0">
                      <div className="max-w-3xl">
                        <motion.h3
                          className="font-display text-[16px] font-normal leading-[1.35] tracking-[-0.02em] md:text-[18px]"
                          animate={{ color: active ? "#111110" : "#ADADAA" }}
                          transition={{ duration: 0.35, ease }}
                        >
                          {step.title}
                        </motion.h3>
                      </div>
                      <motion.div
                        className="flex flex-1 flex-col justify-start md:block md:flex-none"
                        animate={{ opacity: active ? 1 : 0.35 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        {index === 0 ? (
                          <div className="mt-2 md:mt-4">
                            <StepDetail items={sourceDetails[lang]} compact />
                            <HorizontalSourceNotes lang={lang} active />
                          </div>
                        ) : null}
                        {index === 1 ? <HorizontalConnectDetail /> : null}
                        {index === 2 ? <HorizontalFollowUpDetail lang={lang} active /> : null}
                      </motion.div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalConnectDetail() {
  // Reproduces the latest Figma node 562:2210 (Vitreen file, "Connect"
  // schema): Gallery OS hub, thin curve fan (#AEAEAE) to WhatsApp, PDF,
  // Excel and Gmail — Gmail rendered slightly larger (46×46) to match the
  // source. Coordinates are the exact design values, offset to a local
  // origin (37, 66) and converted to percentages of the content bounding
  // box (449 × 122.50983) so the whole graphic scales as one unit.
  const W = 449;
  const H = 122.50983428955078;

  const hub = { left: 0, top: 20, size: 40 };
  const nodes = [
    { name: "whatsapp" as const, left: 217, top: 0, size: 40 },
    { name: "pdf" as const, left: 409, top: 0, size: 40 },
    { name: "excel" as const, left: 124, top: 60, size: 40 },
    { name: "gmail" as const, left: 310, top: 54, size: 46 },
  ];

  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  return (
    <div className="mt-2 md:mt-5">
      <div className="relative w-full max-w-[380px]" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* Connector curves — single path traced from the Figma source */}
        <svg
          className="absolute overflow-visible"
          style={{
            left: pct(43, W),
            top: pct(10.87890625, H),
            width: pct(364, W),
            height: pct(111.63092803955078, H),
          }}
          viewBox="0 0 364 111.63092803955078"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <path
            d="M5.49951 26.6212C5.49951 26.6212 -13.5005 33.1212 42.9995 11.1212C99.4995 -10.8789 171.5 8.12113 171.5 8.12113M0.499512 39.1212C0.499512 39.1212 4.49969 166.121 83.4995 85.1211M266.999 52.1212C225.999 19.1212 5.49951 34.6212 5.49951 34.6212C5.49951 34.6212 201.999 126.121 364.499 11.1212"
            stroke="#AEAEAE"
          />
        </svg>

        {/* Gallery OS hub */}
        <div
          className="absolute"
          style={{
            left: pct(hub.left, W),
            top: pct(hub.top, H),
            width: pct(hub.size, W),
            height: pct(hub.size, H),
          }}
        >
          <img
            src="/icons/gallery-os.svg"
            alt="Gallery OS"
            width={40}
            height={40}
            className="h-full w-full rounded-[9px]"
          />
        </div>

        {/* Existing tools it connects to */}
        {nodes.map((node) => (
          <div
            key={node.name}
            className="absolute [&>img]:h-full [&>img]:w-full [&>img]:object-contain"
            style={{
              left: pct(node.left, W),
              top: pct(node.top, H),
              width: pct(node.size, W),
              height: pct(node.size, H),
            }}
          >
            <FormatLogo name={node.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalFollowUpDetail({ lang, active }: { lang: "fr" | "en"; active: boolean }) {
  const notifications = {
    fr: [
      {
        label: "Nouvelle demande · James Collector",
        time: "2h",
        dot: "green" as const,
        app: "gmail" as const,
      },
      {
        label: "PDF consulté · Untitled (2023)",
        time: "1h",
        dot: "blue" as const,
        app: "outlook" as const,
      },
      {
        label: "Relance planifiée · lundi",
        time: "—",
        dot: "yellow" as const,
        app: "whatsapp" as const,
      },
    ],
    en: [
      {
        label: "New inquiry · James Collector",
        time: "2h",
        dot: "green" as const,
        app: "gmail" as const,
      },
      {
        label: "PDF viewed · Untitled (2023)",
        time: "1h",
        dot: "blue" as const,
        app: "outlook" as const,
      },
      {
        label: "Follow-up scheduled · Mon",
        time: "—",
        dot: "yellow" as const,
        app: "whatsapp" as const,
      },
    ],
  }[lang];

  const FRONT_HEIGHT = 52;
  const PEEK = 10;

  return (
    <motion.div
      className="relative mt-2 max-w-[360px] md:mt-4"
      style={{ height: FRONT_HEIGHT + (notifications.length - 1) * PEEK }}
      variants={detailContainer}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {notifications.map((n, i) => (
        <motion.div
          key={n.label}
          variants={detailItem}
          className={`absolute flex items-center gap-2.5 rounded-[10px] border px-3 ${
            i === 0
              ? "border-[#E8E8E6] bg-white shadow-[0_8px_24px_rgba(17,17,16,0.08)]"
              : "border-[#E8E8E6] bg-[#F5F5F3]"
          }`}
          style={{
            top: i * PEEK,
            left: i * 7,
            right: i * 7,
            height: FRONT_HEIGHT,
            zIndex: notifications.length - i,
          }}
        >
          {i === 0 ? (
            <>
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  n.dot === "green"
                    ? "bg-[#10B981]"
                    : n.dot === "blue"
                      ? "bg-[#3B82F6]"
                      : "bg-[#F59E0B]"
                }`}
              />
              <span className="flex-1 text-[11px] font-medium leading-none text-[#111110]">
                {n.label}
              </span>
              <span className="shrink-0 text-[10px] leading-none text-[#ADADAA]">{n.time}</span>
              <span className="ml-0.5 shrink-0">
                <AppIcon name={n.app} />
              </span>
            </>
          ) : null}
        </motion.div>
      ))}
    </motion.div>
  );
}

function FormatLogo({
  name,
}: {
  name: "gmail" | "whatsapp" | "outlook" | "excel" | "pdf" | "word" | "notion" | "viewing" | "link";
}) {
  if (name === "word") {
    return <img src="/logos/word-logo.svg" alt="Word" width={28} height={28} />;
  }

  if (name === "notion") {
    return <img src="/logos/notion-symbol.svg" alt="Notion" width={28} height={28} />;
  }

  if (name === "gmail") {
    return <img src="/logos/icon-gmail-96.png" alt="Gmail" width={28} height={28} />;
  }

  if (name === "whatsapp") {
    return <img src="/logos/whatsapp.svg" alt="WhatsApp" width={28} height={28} />;
  }

  if (name === "outlook") {
    return (
      <img src="/logos/Microsoft_Office_Outlook_Logo.svg" alt="Outlook" width={28} height={28} />
    );
  }

  if (name === "excel") {
    return <img src="/logos/Microsoft_Office_Excel_Logo.svg" alt="Excel" width={28} height={28} />;
  }

  if (name === "pdf") {
    return <img src="/logos/pdf-svgrepo-com.svg" alt="PDF" width={28} height={28} />;
  }

  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#F5F5F3]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6B6A67"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M4 5h16v14H4z" />
        <path d="M12 5v14" />
      </svg>
    </div>
  );
}

function AppIcon({ name }: { name: "outlook" | "whatsapp" | "calendar" | "gmail" }) {
  if (name === "gmail") {
    return <img src="/logos/icon-gmail-96.png" alt="Gmail" width={20} height={20} />;
  }

  if (name === "outlook") {
    return (
      <img src="/logos/Microsoft_Office_Outlook_Logo.svg" alt="Outlook" width={20} height={20} />
    );
  }

  if (name === "whatsapp") {
    return (
      <img
        src="/logos/Digital_Stacked_Green_RGB_2026.svg"
        alt="WhatsApp"
        width={20}
        height={20}
        className="rounded-[4px]"
      />
    );
  }

  return (
    <div className="flex h-5 w-5 flex-col overflow-hidden rounded-[4px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
      <div className="h-[6px] bg-[#EA4335]" />
      <div className="flex flex-1 items-center justify-center">
        <span className="text-[8px] font-bold leading-none text-[#111110]">25</span>
      </div>
    </div>
  );
}

function HorizontalSourceNotes({ lang, active }: { lang: "fr" | "en"; active: boolean }) {
  const items = {
    fr: [
      { label: "Migration incluse", icon: "checkCircle" },
      { label: "Données confidentielles", icon: "shield" },
    ],
    en: [
      { label: "Migration included", icon: "checkCircle" },
      { label: "Your data stays confidential", icon: "shield" },
    ],
  }[lang];

  return (
    <motion.div
      className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-4"
      variants={detailContainer}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={detailItem}
          className="flex shrink-0 items-center gap-1.5 md:gap-2"
        >
          <span className="mt-px shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5 md:[&>svg]:h-[17px] md:[&>svg]:w-[17px]">
            <Icon name={item.icon} />
          </span>
          <p className="whitespace-nowrap text-[10px] font-normal leading-[1.25] tracking-[-0.01em] text-[#111110] md:text-[12px]">
            {item.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function StepDetail({ items, compact = false }: { items: SourceItem[]; compact?: boolean }) {
  return (
    <motion.div
      className={compact ? "mt-0 flex flex-wrap gap-1 md:gap-1.5" : "mt-5 flex flex-wrap gap-2.5"}
      variants={detailContainer}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.span
          key={item.label}
          variants={detailItem}
          className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full border font-medium leading-none ${
            compact
              ? "min-h-6 gap-1.5 px-2 py-0.5 text-[11px] md:px-2.5"
              : "min-h-7 gap-2 px-3.5 py-1 text-[14px]"
          } ${
            item.active
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-[#E1E1DE] bg-white text-[#111110]"
          }`}
        >
          {compact ? (
            <span className="hidden shrink-0 md:inline-flex">
              <Icon name={item.icon} active={item.active} />
            </span>
          ) : (
            <Icon name={item.icon} active={item.active} />
          )}
          {item.label}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Path data for every icon this component still renders. Names outside this
// map (e.g. "archive") fall back to the generic file glyph — same behaviour
// as before this table replaced a 25-branch if-chain.
const ICON_PATHS: Record<string, string[]> = {
  checkCircle: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "m8.2 12.2 2.4 2.4 5.2-5.2"],
  shield: ["M12 3 20 6v6c0 4.8-3.2 7.8-8 9-4.8-1.2-8-4.2-8-9V6l8-3Z", "M9.2 12.2 11 14l3.8-4"],
  folder: ["M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"],
  library: [
    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20",
    "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z",
  ],
  mail: ["M4 6h16v12H4z", "m4 7 8 6 8-6"],
  sheet: [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z",
    "M14 2v6h6",
    "M8 13h8",
    "M8 17h5",
  ],
};

const FALLBACK_ICON_PATHS = [
  "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z",
  "M14 2v6h6",
];

function Icon({ name, active = false }: { name: string; active?: boolean }) {
  const stroke =
    name === "shield"
      ? "#111110"
      : name === "mail"
        ? "#EA4335"
        : name === "checkCircle" || active
          ? "#10B981"
          : "#9CA3AF";

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={name === "checkCircle" ? "1.9" : "1.8"}
      aria-hidden
    >
      {(ICON_PATHS[name] ?? FALLBACK_ICON_PATHS).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
