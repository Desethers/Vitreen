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

type Detail =
  | {
      type: "source";
      items: Array<{
        label: string;
        active?: boolean;
        icon: "archive" | "sheet" | "folder" | "library" | "mail";
      }>;
    }
  | {
      type: "checks";
      items: Array<{ label: string; icon: "file" | "alert" | "check" }>;
    }
  | {
      type: "delivery";
      items: Array<{
        label: string;
        icon: "gmail" | "whatsapp" | "views" | "inquiries";
      }>;
    }
  | {
      type: "dashboard";
      items: Array<{
        strong: string;
        label: string;
        icon: "file" | "reply" | "people";
      }>;
    };

const details: Record<"fr" | "en", Detail[]> = {
  fr: [
    {
      type: "source",
      items: [
        { label: "Dossiers", icon: "folder" },
        { label: "Archives", icon: "library" },
        { label: "Canaux d’échange", icon: "mail" },
        { label: "PDF & fiches", icon: "archive" },
      ],
    },
    {
      type: "checks",
      items: [
        { label: "Légendes, dimensions et prix préparés.", icon: "check" },
        { label: "Identité galerie appliquée aux supports.", icon: "file" },
        {
          label: "Viewing room, PDF et email prêts à partager.",
          icon: "alert",
        },
      ],
    },
    {
      type: "delivery",
      items: [
        { label: "Gmail", icon: "gmail" },
        { label: "WhatsApp", icon: "whatsapp" },
        { label: "Vues PDF", icon: "views" },
        { label: "Demandes", icon: "inquiries" },
      ],
    },
  ],
  en: [
    {
      type: "source",
      items: [
        { label: "Folders", icon: "folder" },
        { label: "Archives", icon: "library" },
        { label: "Communication channels", icon: "mail" },
        { label: "PDFs & sheets", icon: "archive" },
      ],
    },
    {
      type: "checks",
      items: [
        { label: "Captions, dimensions and prices prepared.", icon: "check" },
        { label: "Gallery identity applied to each material.", icon: "file" },
        { label: "Viewing room, PDF and email ready to share.", icon: "alert" },
      ],
    },
    {
      type: "delivery",
      items: [
        { label: "Gmail", icon: "gmail" },
        { label: "WhatsApp", icon: "whatsapp" },
        { label: "PDF views", icon: "views" },
        { label: "Inquiries", icon: "inquiries" },
      ],
    },
  ],
};

const flowVisualCopy = {
  fr: {
    title: "Le même flux, en mouvement.",
    body: "Les œuvres partent de vos sources et deviennent des supports prêts à partager.",
  },
  en: {
    title: "The same flow, in motion.",
    body: "Artworks move from your sources into material ready to share.",
  },
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
  const steps = t.processFlow.steps;
  const storySteps = horizontalDisplaySteps[lang];
  const ref = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "0px", amount: 0.35 });
  const visualIsInView = useInView(visualRef, {
    once: false,
    margin: "0px",
    amount: 0.35,
  });
  const horizontalIsInView = useInView(horizontalRef, {
    once: false,
    margin: "0px",
    amount: 0.35,
  });
  const [activeStep, setActiveStep] = useState(-1);
  const [visualActiveStep, setVisualActiveStep] = useState(-1);
  const [horizontalActiveStep, setHorizontalActiveStep] = useState(-1);
  // Circles whose incoming progress line has finished travelling — these fill black.
  const [filledCircles, setFilledCircles] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isInView) {
      setActiveStep(-1);
      return;
    }

    const timers = steps.map((_, index) =>
      setTimeout(() => setActiveStep(index), 180 + index * STEP_DELAY)
    );
    const reset = setTimeout(
      () => setActiveStep(steps.length - 1),
      steps.length * STEP_DELAY + LOOP_PAUSE
    );

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [isInView, steps.length]);

  useEffect(() => {
    if (!visualIsInView) {
      setVisualActiveStep(-1);
      return;
    }

    const timers = steps.map((_, index) =>
      setTimeout(() => setVisualActiveStep(index), 180 + index * STEP_DELAY)
    );
    const reset = setTimeout(
      () => setVisualActiveStep(steps.length - 1),
      steps.length * STEP_DELAY + LOOP_PAUSE
    );

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [visualIsInView, steps.length]);

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
                    className={`relative flex gap-4 md:block md:min-h-0 ${
                      index < storySteps.length - 1 ? "min-h-[128px]" : ""
                    }`}
                  >
                    {/* Mobile vertical connector */}
                    {index < storySteps.length - 1 && (
                      <div
                        className="absolute -bottom-6 left-5 top-10 w-px -translate-x-1/2 md:hidden"
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
                        className="absolute left-5 top-10 h-20 w-px -translate-x-1/2 md:hidden"
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
                      className="relative z-10 mb-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white text-[13px] font-normal leading-none tracking-[-0.02em] text-[#111110] md:mb-6"
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
                            <StepDetail detail={details[lang][0]} active compact />
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

function VisualSelectionDetail({ lang, active }: { lang: "fr" | "en"; active: boolean }) {
  const items = {
    fr: [
      { label: "Viewing rooms", icon: "layout" },
      { label: "PDFs", icon: "views" },
      { label: "Liens privés", icon: "link" },
      { label: "Emails collector", icon: "mail" },
    ],
    en: [
      { label: "Viewing rooms", icon: "layout" },
      { label: "PDFs", icon: "views" },
      { label: "Private links", icon: "link" },
      { label: "Collector emails", icon: "mail" },
    ],
  }[lang];

  return (
    <motion.div
      className="mt-2"
      variants={detailContainer}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      <p className="max-w-[360px] text-[12px] leading-[1.35] tracking-[-0.01em] text-[#6B6A67]">
        {lang === "fr"
          ? "Transformez votre sélection en belles présentations et partagez-la avec les collectionneurs."
          : "Turn your selection into beautiful presentations and share with collectors."}
      </p>
      <div className="mt-3 grid max-w-[360px] grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={detailItem}
            className="flex h-[64px] flex-col items-center justify-center gap-1.5 rounded-[8px] border border-[#E1E1DE] bg-white px-2 text-center"
          >
            <Icon name={item.icon} tone={item.icon === "mail" ? "blue" : undefined} />
            <span className="text-[10px] font-medium leading-[1.15] tracking-[-0.01em] text-[#111110]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
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

function HorizontalSelectionDetail({ lang, active }: { lang: "fr" | "en"; active: boolean }) {
  const formats = {
    fr: [
      { label: "Excel", brand: "excel" as const },
      { label: "WhatsApp", brand: "whatsapp" as const },
      { label: "Outlook", brand: "outlook" as const },
      { label: "PDF", brand: "pdf" as const },
      { label: "Word", brand: "word" as const },
      { label: "Notion", brand: "notion" as const },
    ],
    en: [
      { label: "Excel", brand: "excel" as const },
      { label: "WhatsApp", brand: "whatsapp" as const },
      { label: "Outlook", brand: "outlook" as const },
      { label: "PDF", brand: "pdf" as const },
      { label: "Word", brand: "word" as const },
      { label: "Notion", brand: "notion" as const },
    ],
  }[lang];

  return (
    <motion.div
      className="mt-2 md:mt-5"
      variants={detailContainer}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      <div
        className="relative w-full max-w-[360px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="flex items-center justify-between py-2">
          {formats.map((item) => (
            <motion.div
              key={item.label}
              variants={detailItem}
              className="flex shrink-0 flex-col items-center gap-1.5"
            >
              <FormatLogo name={item.brand} />
              <span className="text-[10px] font-medium leading-none tracking-[-0.01em] text-[#6B6A67]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
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
      className="mt-5 flex flex-nowrap items-center gap-x-3 md:flex-wrap md:gap-x-4 md:gap-y-2"
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

function CompactVisualDetail({ detail, active }: { detail?: Detail; active: boolean }) {
  if (!detail) return null;

  const items =
    detail.type === "dashboard"
      ? detail.items.map((item) => ({ label: item.strong, icon: item.icon }))
      : detail.items.map((item) => ({
          label: item.label,
          icon: item.icon,
          active: "active" in item ? item.active : false,
        }));

  return (
    <motion.div
      className="mt-3 flex flex-wrap gap-1.5"
      variants={detailContainer}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {items.map((item) => (
        <motion.span
          key={item.label}
          variants={detailItem}
          className="inline-flex min-h-6 items-center gap-1.5 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-medium leading-none text-[#111110]"
        >
          <Icon name={item.icon} active={"active" in item ? item.active : false} />
          {item.label}
        </motion.span>
      ))}
    </motion.div>
  );
}

function StepDetail({
  detail,
  active,
  compact = false,
}: {
  detail?: Detail;
  active: boolean;
  compact?: boolean;
}) {
  if (!detail) return null;

  if (detail.type === "source") {
    return (
      <motion.div
        className={
          compact
            ? "mt-0 flex flex-nowrap gap-1 md:flex-wrap md:gap-1.5"
            : "mt-5 flex flex-wrap gap-2.5"
        }
        variants={detailContainer}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        {detail.items.map((item) => (
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

  if (detail.type === "checks") {
    return (
      <motion.div
        className={compact ? "mt-4 space-y-2" : "mt-5 space-y-3.5"}
        variants={detailContainer}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        {detail.items.map((item) => (
          <motion.div
            key={item.label}
            className={compact ? "flex items-start gap-3" : "flex items-start gap-4"}
            variants={detailItem}
          >
            <span className="mt-0.5 shrink-0">
              <Icon name={item.icon} />
            </span>
            <p
              className={
                compact
                  ? "text-[14px] leading-[1.35] tracking-[-0.01em] text-[#111110]"
                  : "text-[14px] leading-[1.5] tracking-[-0.01em] text-[#111110]"
              }
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (detail.type === "delivery") {
    return (
      <motion.div
        className="mt-5 flex flex-col gap-2.5"
        variants={detailContainer}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        {detail.items.map((item) => (
          <motion.div
            key={item.label}
            variants={detailItem}
            className="inline-flex w-full max-w-[360px] items-center gap-3 rounded-[10px] border border-[#E1E1DE] bg-[#FAFAF8] px-3.5 py-2 text-[14px] font-medium text-[#111110]"
          >
            <Icon name={item.icon} />
            {item.label}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-5 space-y-3"
      variants={detailContainer}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {detail.items.map((item) => (
        <motion.div key={item.strong} className="flex items-start gap-4" variants={detailItem}>
          <span className="mt-0.5 shrink-0">
            <Icon name={item.icon} />
          </span>
          <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-[#111110]">
            <span className="font-semibold">{item.strong}</span> {item.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function GoogleGLogo() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#4285F4"
        d="M44.5 20H24v8.5h11.8C34.7 34 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.2 0 6.2 1.2 8.4 3.2l6-6C34.6 4.9 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.9 0 20.5-7.9 20.5-21 0-1.4-.1-2.7-.3-4Z"
      />
      <path
        fill="#34A853"
        d="M6.1 14.1 13.1 19.2C14.9 14.4 19.1 11 24 11c3.2 0 6.2 1.2 8.4 3.2l6-6C34.6 4.9 29.6 3 24 3 16.1 3 9.3 7.5 6.1 14.1Z"
      />
      <path
        fill="#FBBC05"
        d="M24 45c5.5 0 10.2-1.8 13.8-4.9l-6.4-5.2C29.4 36.3 26.9 37 24 37c-5.9 0-10.9-3.9-12.7-9.3l-7 5.4C7.5 40.2 15 45 24 45Z"
      />
      <path
        fill="#EA4335"
        d="M11.3 27.7A13.3 13.3 0 0 1 11 24c0-1.3.2-2.6.6-3.8l-7-5.4A21 21 0 0 0 3 24c0 3.3.8 6.4 2.1 9.1l6.2-5.4Z"
      />
    </svg>
  );
}

function Icon({
  name,
  active = false,
  tone,
}: {
  name: string;
  active?: boolean;
  tone?: "blue" | "green" | "purple";
}) {
  const stroke =
    tone === "blue"
      ? "#2563EB"
      : tone === "purple"
        ? "#6D5BD0"
        : tone === "green"
          ? "#10B981"
          : name === "alert" || name === "inbox" || name === "inquiries"
            ? "#F59E0B"
            : name === "shield"
              ? "#111110"
              : name === "mail" || name === "gmail"
                ? "#EA4335"
                : name === "link" ||
                    name === "check" ||
                    name === "checkCircle" ||
                    name === "spark" ||
                    name === "whatsapp" ||
                    active
                  ? "#10B981"
                  : name === "views"
                    ? "#EA4335"
                    : "#9CA3AF";

  if (name === "spark") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3Z" />
        <path d="M19 15l.8 2.6L22 18l-2.2.4L19 21l-.8-2.6L16 18l2.2-.4L19 15Z" />
      </svg>
    );
  }

  if (name === "plus") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M6 10h12v10H6z" />
        <path d="M8 10V8a4 4 0 0 1 8 0v2" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M5 20V10" />
        <path d="M12 20V4" />
        <path d="M19 20v-7" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "palette") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 1.2-3.6 1.8 1.8 0 0 1 1.1-3.2H18a3 3 0 0 0 3-3C21 6.6 17 3 12 3Z" />
        <path d="M7.5 10h.01" />
        <path d="M10 7h.01" />
        <path d="M14 7h.01" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <path d="M15 11.4a3 3 0 1 1-5.9 1.2 3 3 0 0 1 5.9-1.2Z" />
        <path d="M16.5 7.5h.01" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        aria-hidden
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (name === "checkCircle") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.9"
        aria-hidden
      >
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path d="m8.2 12.2 2.4 2.4 5.2-5.2" />
      </svg>
    );
  }

  if (name === "alert") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.9"
        aria-hidden
      >
        <path d="m12 3 10 18H2L12 3Z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "gmail") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M4 6h16v12H4z" />
        <path d="M4 7l8 6 8-6" />
        <path d="M4 18V8l8 6 8-6v10" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M9.5 8.5c.2 3 2.1 5 5 5.8l1.2-1.2" />
        <path d="M8.7 8.4l.8-.7 1.2 2-.7.8" />
      </svg>
    );
  }

  if (name === "views") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M7 15h2.2a1.4 1.4 0 0 0 0-2.8H7v5.6" />
        <path d="M12 17.8v-5.6h1.4a2.8 2.8 0 0 1 0 5.6H12Z" />
        <path d="M17 12.2h3" />
        <path d="M17 15h2.4" />
      </svg>
    );
  }

  if (name === "inquiries") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M9 10h6" />
        <path d="M9 14h4" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.9"
        aria-hidden
      >
        <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
      </svg>
    );
  }

  if (name === "inbox") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M4 13 6.5 5h11L20 13v6H4z" />
        <path d="M4 13h5l1.5 2h3L15 13h5" />
      </svg>
    );
  }

  if (name === "people") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <path d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.8" />
        <path d="M16 3.2a4 4 0 0 1 0 7.6" />
      </svg>
    );
  }

  if (name === "reply") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    );
  }

  if (name === "sheet") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  if (name === "folder") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M12 3 20 6v6c0 4.8-3.2 7.8-8 9-4.8-1.2-8-4.2-8-9V6l8-3Z" />
        <path d="M9.2 12.2 11 14l3.8-4" />
      </svg>
    );
  }

  if (name === "layout") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M4 5h16v14H4z" />
        <path d="M12 5v14" />
      </svg>
    );
  }

  if (name === "library") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    );
  }

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
