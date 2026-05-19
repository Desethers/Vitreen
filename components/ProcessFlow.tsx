"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_DELAY = 520;
const LOOP_PAUSE = 1800;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease, delay },
});

type Detail =
  | {
      type: "source";
      items: Array<{ label: string; active?: boolean; icon: "archive" | "sheet" | "folder" | "library" }>;
    }
  | {
      type: "checks";
      items: Array<{ label: string; icon: "file" | "alert" | "check" }>;
    }
  | {
      type: "delivery";
      items: Array<{ label: string; icon: "mail" | "link" | "inbox" }>;
    }
  | {
      type: "dashboard";
      items: Array<{ strong: string; label: string; icon: "file" | "reply" | "people" }>;
    };

const details: Record<"fr" | "en", Detail[]> = {
  fr: [
    {
      type: "source",
      items: [
        { label: "Inventory / CRM", icon: "archive", active: true },
        { label: "CSV", icon: "sheet" },
        { label: "Dossiers galerie", icon: "folder" },
        { label: "Artwork Library", icon: "library" },
      ],
    },
    {
      type: "checks",
      items: [
        { label: "Artiste, œuvre et disponibilité reconnus.", icon: "check" },
        { label: "Charte galerie appliquée : logo, typographies, footer.", icon: "file" },
        { label: "Prix et informations sensibles adaptés selon le partage.", icon: "alert" },
      ],
    },
    {
      type: "delivery",
      items: [
        { label: "Email collectionneur", icon: "mail" },
        { label: "Lien privé", icon: "link" },
        { label: "Demande rattachée à l’œuvre", icon: "inbox" },
      ],
    },
  ],
  en: [
    {
      type: "source",
      items: [
        { label: "Inventory / CRM", icon: "archive", active: true },
        { label: "CSV", icon: "sheet" },
        { label: "Gallery folders", icon: "folder" },
        { label: "Artwork Library", icon: "library" },
      ],
    },
    {
      type: "checks",
      items: [
        { label: "Artist, artwork and availability matched.", icon: "check" },
        { label: "Gallery identity applied: logo, typography and footer.", icon: "file" },
        { label: "Prices and sensitive details adapted to the sharing context.", icon: "alert" },
      ],
    },
    {
      type: "delivery",
      items: [
        { label: "Collector email", icon: "mail" },
        { label: "Private link", icon: "link" },
        { label: "Inquiry attached to artwork", icon: "inbox" },
      ],
    },
  ],
};

export default function ProcessFlow() {
  const { lang, t } = useLang();
  const steps = t.processFlow.steps;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;

    const timers = steps.map((_, index) =>
      setTimeout(() => setActiveStep(index), index * STEP_DELAY)
    );
    const reset = setTimeout(
      () => setActiveStep(steps.length - 1),
      steps.length * STEP_DELAY + LOOP_PAUSE
    );

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [isInView, steps]);

  return (
    <section id="solutions" className="bg-white px-4 pb-12 pt-12 md:px-6 md:pb-[60px] md:pt-[60px]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp(0)} className="mb-10 max-w-3xl md:mb-14">
          <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
            {t.processFlow.title}
          </h2>
          <p className="mt-1 text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
            {t.processFlow.subtitle}
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-4xl">
          <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#E1E1DE]" aria-hidden />
          <ol className="m-0 list-none p-0">
            {steps.map((step, index) => {
              const active = activeStep >= index;
              const current = activeStep === index;

              return (
                <motion.li
                  key={step.number}
                  className="relative flex gap-6 pb-14 last:pb-0"
                  initial={{ opacity: 0, y: 18 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <motion.div
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white text-[12px] font-normal leading-none tracking-[-0.02em]"
                    animate={{
                      borderColor: active ? "#0B6BFF" : "#D8D8D4",
                      backgroundColor: current ? "#0B6BFF" : "#ffffff",
                      color: current ? "#ffffff" : "#111110",
                      scale: current ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.28, ease }}
                  >
                    {step.number.replace(/^0/, "")}
                  </motion.div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="max-w-3xl">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-[#6B6A67]">
                        {step.week}
                      </p>
                      <h3 className="font-display text-[16px] font-semibold leading-[1.22] tracking-[-0.02em] text-[#111110] md:text-[18px]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-[15px] leading-[1.55] tracking-[-0.01em] text-[#111110] md:text-[16px]">
                        {step.desc}
                      </p>
                    </div>

                    <StepDetail detail={details[lang][index]} />
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepDetail({ detail }: { detail?: Detail }) {
  if (!detail) return null;

  if (detail.type === "source") {
    return (
      <div className="mt-5 flex flex-wrap gap-2.5">
        {detail.items.map((item) => (
          <span
            key={item.label}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium leading-none ${
              item.active
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-[#E1E1DE] bg-white text-[#111110]"
            }`}
          >
            <Icon name={item.icon} active={item.active} />
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  if (detail.type === "checks") {
    return (
      <div className="mt-5 space-y-3.5">
        {detail.items.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <span className="mt-0.5 shrink-0">
              <Icon name={item.icon} />
            </span>
            <p className="text-[15px] leading-[1.5] tracking-[-0.01em] text-[#111110]">{item.label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (detail.type === "delivery") {
    return (
      <div className="mt-5 flex flex-col gap-2.5">
        {detail.items.map((item) => (
          <div
            key={item.label}
            className="inline-flex w-full max-w-[360px] items-center gap-3 rounded-[10px] border border-[#E1E1DE] bg-[#FAFAF8] px-4 py-3 text-[15px] font-medium text-[#111110]"
          >
            <Icon name={item.icon} />
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {detail.items.map((item) => (
        <div key={item.strong} className="flex items-start gap-4">
          <span className="mt-0.5 shrink-0">
            <Icon name={item.icon} />
          </span>
          <p className="text-[15px] leading-[1.5] tracking-[-0.01em] text-[#111110]">
            <span className="font-semibold">{item.strong}</span> {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function Icon({ name, active = false }: { name: string; active?: boolean }) {
  const stroke =
    name === "alert" || name === "inbox"
      ? "#F59E0B"
      : name === "mail"
        ? "#EA4335"
        : name === "link" || name === "check" || name === "spark" || active
          ? "#10B981"
          : "#9CA3AF";

  if (name === "spark") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3Z" />
        <path d="M19 15l.8 2.6L22 18l-2.2.4L19 21l-.8-2.6L16 18l2.2-.4L19 15Z" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (name === "alert") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.9" aria-hidden>
        <path d="m12 3 10 18H2L12 3Z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.9" aria-hidden>
        <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
      </svg>
    );
  }

  if (name === "inbox") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M4 13 6.5 5h11L20 13v6H4z" />
        <path d="M4 13h5l1.5 2h3L15 13h5" />
      </svg>
    );
  }

  if (name === "people") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <path d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.8" />
        <path d="M16 3.2a4 4 0 0 1 0 7.6" />
      </svg>
    );
  }

  if (name === "reply") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    );
  }

  if (name === "sheet") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  if (name === "folder") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    );
  }

  if (name === "layout") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M4 5h16v14H4z" />
        <path d="M12 5v14" />
      </svg>
    );
  }

  if (name === "library") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    );
  }

  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
