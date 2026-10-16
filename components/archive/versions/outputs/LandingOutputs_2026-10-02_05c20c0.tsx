"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { IntegrationsFrame } from "@/components/SalesAssistantProductPage";
import { WhatsAppShareWorksMock } from "@/components/shared/ArtworkAddInMocks";
import { CONTAINER } from "@/components/landing/styles";

const DATABASE_QUESTION = "Is Evening field by Sacha Elron available?";
const databaseEase = [0.16, 1, 0.3, 1] as const;

/* Same card-caption pattern as ServicesGrid (components/Services.tsx on main):
 * bottom gradient bar, title + "Explore" with an arrow that darkens on hover. */
function CardCaption({ title, action = "Explore" }: { title: string; action?: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/75 via-white/20 to-transparent px-4 pb-1.5 pt-1.5 backdrop-blur-[2px]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="truncate font-display text-[13px] font-normal leading-none tracking-[-0.01em] text-[#111110]">
          {title}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-normal leading-none tracking-[-0.01em] text-[#ADADAA] transition-colors duration-200 group-hover:text-[#111110]">
          {action}
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 6.5h8" />
            <path d="m7.25 3.25 3.25 3.25-3.25 3.25" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function ArtworkPageMockup() {
  return (
    <div className="h-full w-full bg-white px-6 py-4 text-left">
      <p className="text-[9px] text-[#ADADAA]">‹ Artworks</p>
      <div className="mt-1.5">
        <h4 className="text-[13px] font-medium text-[#111110]">Evening field</h4>
        <p className="mt-0.5 text-[9px] text-[#ADADAA]">Sacha Elron, 2023</p>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_1fr] gap-3 border-t border-[#E8E8E6] pt-1.5">
        <div>
          <p className="text-[8px] tracking-[0.1em] text-[#ADADAA]">Details</p>
          <div className="mt-1.5 space-y-1">
            <label className="block">
              <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Title</span>
              <span className="block rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                Evening field
              </span>
            </label>
            <label className="block">
              <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Artist</span>
              <span className="block rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                Sacha Elron
                <span className="ml-1 text-[#168044]">✓ Linked</span>
              </span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <label className="block">
                <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Year</span>
                <span className="block rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                  2023
                </span>
              </label>
              <label className="block">
                <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Medium</span>
                <span className="block truncate rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                  Acrylic
                </span>
              </label>
            </div>
          </div>

          <p className="mt-1.5 text-[8px] tracking-[0.1em] text-[#ADADAA]">
            Dimensions &amp; status
          </p>
          <div className="mt-1.5 grid w-fit grid-cols-[auto_auto_auto_auto] items-center gap-1.5">
            <span className="rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-center text-[9px] text-[#111110]">
              120
            </span>
            <span className="text-[#ADADAA]">×</span>
            <span className="rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-center text-[9px] text-[#111110]">
              120
            </span>
            <span className="rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-center text-[9px] text-[#111110]">
              cm
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Available", "Reserved", "Sold", "NFS"].map((status) => (
              <span
                key={status}
                className={`rounded-full border px-1.5 py-0.5 text-[8px] ${
                  status === "Available"
                    ? "border-[#111110] bg-[#111110] text-white"
                    : "border-[#D8D8D5] text-[#6B6A67]"
                }`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[8px] tracking-[0.1em] text-[#ADADAA]">Images</p>
            <span className="text-[8px] text-[#ADADAA]">1</span>
          </div>
          <div className="relative mx-auto mt-1.5 aspect-[4/5] w-[78%] overflow-hidden rounded-[6px] border border-[#D8D8D5] bg-[#F5F5F3]">
            <img
              src="/artworks/painting-05.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[8px] text-[#168044]">
              ★ Principale
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DatabaseAssistantMockup() {
  const mockupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mockupRef, { amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<"compose" | "results" | "opening" | "artwork">(
    reduceMotion ? "artwork" : "compose"
  );
  const [typedQuestion, setTypedQuestion] = useState("");

  useEffect(() => {
    if (reduceMotion) {
      setStage("artwork");
      setTypedQuestion(DATABASE_QUESTION);
      return;
    }

    if (!isInView) {
      setStage("compose");
      setTypedQuestion("");
      return;
    }

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const schedule = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!cancelled) callback();
      }, delay);
      timers.add(timer);
    };

    const play = () => {
      setStage("compose");
      setTypedQuestion("");

      DATABASE_QUESTION.split("").forEach((_, index) => {
        schedule(() => setTypedQuestion(DATABASE_QUESTION.slice(0, index + 1)), 650 + index * 42);
      });

      const typingFinishedAt = 650 + DATABASE_QUESTION.length * 42;
      schedule(() => setStage("results"), typingFinishedAt + 650);
      schedule(() => setStage("opening"), typingFinishedAt + 2500);
      schedule(() => setStage("artwork"), typingFinishedAt + 2900);
      schedule(play, typingFinishedAt + 7600);
    };

    play();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [isInView, reduceMotion]);

  return (
    <div
      ref={mockupRef}
      className="relative h-full w-full overflow-hidden bg-white pl-3 pt-3 text-left"
    >
      <div className="relative h-full w-full overflow-hidden rounded-tl-[18px] bg-[linear-gradient(180deg,#FEFBED_0%,#FFFEFA_62%,#FFFFFF_100%)]">
        <AnimatePresence mode="wait" initial={false}>
          {stage === "artwork" ? (
            <motion.div
              key="artwork"
              className="h-full w-full"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.52, ease: databaseEase }}
            >
              <ArtworkPageMockup />
            </motion.div>
          ) : (
            <motion.div
              key="assistant"
              className="flex h-full w-full flex-col px-6 pb-7 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.35, ease: databaseEase }}
            >
              <h4 className="mt-1 text-[16px] font-medium tracking-[-0.035em] text-[#111110]">
                Good morning
              </h4>

              <div className="mt-2 min-h-[84px] rounded-[12px] border border-[#ECECE8] bg-white px-3.5 py-2.5 shadow-[0_1px_4px_rgba(17,17,16,0.018)]">
                <p className="min-h-[34px] pr-8 text-[11px] leading-[1.4] text-[#111110]">
                  {typedQuestion}
                  {stage === "compose" ? (
                    <motion.span
                      className="ml-0.5 inline-block h-[12px] w-px translate-y-[2px] bg-[#111110]"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                    />
                  ) : null}
                </p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <p className="text-[7px] leading-tight text-[#B2B2AE]">
                    The assistant reads your records — it can&rsquo;t send anything.
                  </p>
                  <motion.span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#111110] text-[14px] text-white"
                    animate={
                      typedQuestion.length === DATABASE_QUESTION.length
                        ? { scale: [1, 1.08, 1] }
                        : {}
                    }
                    transition={{ duration: 0.45 }}
                  >
                    ↑
                  </motion.span>
                </div>
              </div>

              <div className="mt-1.5 flex max-w-full items-center gap-1 overflow-hidden">
                {[
                  "What should I know before replying to Marie?",
                  "Which works by Sacha Elron are available?",
                  "Who should I follow up with this week?",
                ].map((suggestion) => (
                  <span
                    key={suggestion}
                    className="shrink-0 whitespace-nowrap rounded-full border border-[#E1E1DD] bg-white px-2 py-1.5 text-[7px] leading-none text-[#64645F] shadow-[0_1px_3px_rgba(17,17,16,0.05)]"
                  >
                    {suggestion}
                  </span>
                ))}
              </div>

              <div className="mt-1.5 flex items-center gap-4 text-[7px] text-[#8D8D88]">
                <span>♙&nbsp; A person</span>
                <span>▧&nbsp; A work</span>
                <span>✎&nbsp; A reply</span>
                <span>☼&nbsp; My day</span>
              </div>

              <AnimatePresence>
                {stage !== "compose" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: databaseEase }}
                    className="mt-2"
                  >
                    <div className="ml-auto max-w-[82%] rounded-[9px] bg-[#111110] px-3 py-1.5 text-[8px] leading-[1.35] text-white">
                      {DATABASE_QUESTION}
                    </div>
                    <p className="mt-2 text-[7px] font-medium text-[#111110]">1 matching artwork</p>
                    <motion.div
                      animate={
                        stage === "opening"
                          ? {
                              scale: [1, 0.985, 1],
                              borderColor: ["#E1E1DD", "#111110", "#111110"],
                            }
                          : {}
                      }
                      transition={{ duration: 0.38, ease: databaseEase }}
                      className="mt-1 flex items-center gap-2.5 rounded-[9px] border border-[#E1E1DD] bg-white p-1.5 shadow-[0_4px_14px_rgba(17,17,16,0.05)]"
                    >
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[5px] bg-[#F2F2EF]">
                        <img
                          src="/artworks/painting-05.jpg"
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-medium text-[#111110]">Evening field</p>
                        <p className="text-[7px] text-[#8D8D88]">Sacha Elron · 2023</p>
                        <div className="mt-1 flex items-center gap-2 text-[7px]">
                          <span className="font-medium text-[#111110]">€10,000</span>
                          <span className="rounded-full bg-[#EAF5EE] px-1.5 py-0.5 text-[#168044]">
                            Available
                          </span>
                        </div>
                      </div>
                      <motion.span
                        animate={stage === "opening" ? { x: [0, 3, 0] } : {}}
                        className="text-[14px] text-[#ADADAA]"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PrivateSelectionMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-left">
      <div>
        <div className="px-12 pt-4">
          <p className="text-[8px] tracking-[0.1em] text-[#ADADAA]">Sélection privée</p>
          <h4 className="mt-1 text-[14px] font-medium text-[#111110]">
            Spring selection — Sacha Elron
          </h4>
          <p className="mt-1 text-[9px] text-[#6B6A67]">Pour Marie Beaumont</p>
          <p className="mt-2 text-[9px] italic leading-[1.5] text-[#6B6A67]">
            A short selection from our autumn program — four recent canvases from Sacha
            Elron&rsquo;s chromatic studies, on view by appointment ahead of the fair.
          </p>
          <p className="mt-2 text-[8px] text-[#ADADAA]">
            Cette sélection est disponible jusqu&rsquo;au 24 août 2026
          </p>
        </div>
        <div className="relative mt-3 px-12">
          <div className="relative h-[150px] w-full overflow-hidden bg-[#F5F5F3]">
            <img
              src="/artworks/painting-05.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 px-12 py-3">
          <div>
            <p className="text-[10px] font-medium text-[#111110]">Sacha Elron</p>
            <p className="text-[9px] italic text-[#111110]">Evening field, 2023</p>
            <p className="mt-1 text-[8px] text-[#6B6A67]">Acrylic on canvas</p>
            <p className="text-[8px] text-[#6B6A67]">120 × 120 cm</p>
            <p className="mt-1 text-[10px] font-medium text-[#111110]">€10,000</p>
          </div>
          <span className="shrink-0 border border-[#D8D8D5] px-2.5 py-1.5 text-[8px] text-[#111110]">
            Inquire
          </span>
        </div>
      </div>
    </div>
  );
}

/** Mockups partagés EN/FR — seuls les libellés changent, via `labels`. */
const OUTPUT_NODES = [
  <DatabaseAssistantMockup key="database" />,
  <IntegrationsFrame key="gmail" />,
  <WhatsAppShareWorksMock key="whatsapp" />,
  <PrivateSelectionMockup key="selection" />,
];

export type OutputsCopy = {
  /** Un libellé par mockup, dans l'ordre : base, Gmail, WhatsApp, sélections. */
  labels: readonly [string, string, string, string];
  action?: string;
  /** Lien optionnel par carte, même ordre que `labels`. */
  hrefs?: readonly [string?, string?, string?, string?];
};

const EN_COPY: OutputsCopy = {
  labels: ["Inventory", "Gmail", "WhatsApp Add-ins", "Private Selection editor"],
  hrefs: [
    "/tools/artwork-inventory",
    "/tools/sales-assistant",
    "/tools/sales-assistant",
    "/tools/viewing-rooms",
  ],
};

export function OutputsSection({ copy }: { copy: OutputsCopy }) {
  return (
    <section className="bg-white px-4 pb-16 pt-0 md:px-6 md:pb-20 md:pt-2">
      <div className={CONTAINER}>
        <div className="grid gap-4 md:grid-cols-2">
          {OUTPUT_NODES.map((node, index) => {
            const href = copy.hrefs?.[index];
            const Wrapper = href ? "a" : "article";
            return (
              <Wrapper
                key={copy.labels[index]}
                {...(href ? { href } : {})}
                className="group relative overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#111110]/20"
              >
                <div className="pointer-events-none relative h-[300px] overflow-hidden bg-[#F8F8F6] md:h-[360px]">
                  <div className="h-full transition-transform duration-300 ease-out group-hover:scale-[1.018]">
                    {node}
                  </div>
                </div>
                <CardCaption title={copy.labels[index]} action={copy.action} />
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function LandingOutputs() {
  return <OutputsSection copy={EN_COPY} />;
}
