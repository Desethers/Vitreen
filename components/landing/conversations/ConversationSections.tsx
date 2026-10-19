"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Database, FileText } from "lucide-react";
import { IntegrationsFrame } from "@/components/SalesAssistantProductPage";
import { WA, WaBubble, type WaMessage } from "@/components/whatsapp/WaChat";

/*
 * The home after the hero: one section per conversation channel, email then
 * WhatsApp. Each is a scene that plays in beats, in step with three numbered
 * steps beside it. Only what the product does today:
 *  - email: the site's real Gmail mockup (`IntegrationsFrame`): search a work
 *    from the Vitreen panel and insert it into the reply;
 *  - WhatsApp: the assistant number (`src/lib/whatsapp/i18n.ts`, `inventory.ts`).
 */

const ease = [0.16, 1, 0.3, 1] as const;
const EVENING_FIELD = "/artworks/painting-05.jpg";

type Step = { k: string; v: string };
type Who = { name: string; status: string; initials: string };

/** One line of the simulated feed, shaped like a Gallery OS Conversations event. */
export type FeedEvent = {
  /** Index into `feed.kinds`: inquiry waiting, new exchange, reminder, keep in touch. */
  kind: 0 | 1 | 2 | 3;
  channel: "whatsapp" | "gmail" | null;
  who: string;
  initials: string;
  title: string;
  body: string;
  when: string;
};

export type ConversationSectionsCopy = {
  /** The heading of the one section that holds email, WhatsApp and the feed. */
  block: { eyebrow: string; title: string; sub: string };
  feed: {
    eyebrow: string;
    title: string;
    sub: string;
    line: string;
    kinds: { label: string; body: string }[];
    events: FeedEvent[];
  };
  statement: { lines: [string, string]; linked: string; body: string };
  email: { eyebrow: string; title: string; sub: string; steps: Step[]; line: string };
  whatsapp: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: Step[];
    line: string;
    assistant: Who;
    collector: Who;
    ask: WaMessage[];
    /** The one-line status the bot sends right after a card. */
    status: WaMessage;
    before: WaMessage;
    sheetTitle: string;
    sheetSend: string;
    sheetRows: string[];
    after: WaMessage[];
    forward: WaMessage;
  };
};

export const CONVERSATION_SECTIONS_EN: ConversationSectionsCopy = {
  block: {
    eyebrow: "Reply",
    title: "Your inventory, in every conversation.",
    sub: "In Gmail, on WhatsApp, and on each collector’s record.",
  },
  feed: {
    eyebrow: "Remember",
    title: "Every exchange, remembered.",
    sub: "The conversation stays with the collector.",
    line: "See the question, your reply and the work you shared in one history.",
    kinds: [
      { label: "Inquiry waiting", body: "A collector asked. No answer yet." },
      { label: "New exchange", body: "A message came in, or a work went out." },
      { label: "Reminder", body: "A follow-up you set is due." },
      { label: "Keep in touch", body: "Too long without news." },
    ],
    events: [
      {
        kind: 3,
        channel: null,
        who: "Camille Fournier",
        initials: "CF",
        title: "Get back in touch with Camille Fournier",
        body: "Last exchange 3 weeks ago.",
        when: "18 Sept",
      },
      {
        kind: 2,
        channel: null,
        who: "Sofía Alvarez",
        initials: "SA",
        title: "Follow up with Sofía Alvarez",
        body: "Reminder you set for Blue hour.",
        when: "22 Sept",
      },
      {
        kind: 0,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "Thomas Baur wrote to you about “Self-Portrait”",
        body: "Could you send me the price and dimensions of the Self-Portrait?",
        when: "6 Oct",
      },
      {
        kind: 1,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "You sent “Self-Portrait” to Thomas Baur",
        body: "Card sent from your Gmail reply.",
        when: "6 Oct",
      },
      {
        kind: 0,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "Marie Beaumont wrote to you about “Evening field”",
        body: "Good evening, is Evening field still available?",
        when: "Today",
      },
      {
        kind: 1,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "You forwarded “Evening field” to Marie Beaumont",
        body: "Prepared in Vitreen, sent from your WhatsApp.",
        when: "Today",
      },
    ],
  },
  statement: {
    lines: ["Your inventory.", "Your CRM."],
    linked: "Linked to",
    body: "Your stock and your collector records live in Vitreen, linked to the conversations where you sell. Nothing to retype.",
  },
  email: {
    eyebrow: "Gmail",
    title: "In your inbox.",
    sub: "Answer with the work, not a search.",
    steps: [
      { k: "You reply", v: "Write to Marie as you always do, in Gmail." },
      { k: "You search", v: "Open Vitreen in the draft and type “Elron”." },
      {
        k: "You send",
        v: "The work goes into your reply, with its image and price. You hit send.",
      },
    ],
    line: "Works in Gmail, inside the reply you are writing.",
  },
  whatsapp: {
    eyebrow: "WhatsApp",
    title: "On WhatsApp.",
    sub: "Ask, prepare, forward.",
    steps: [
      {
        k: "You ask",
        v: "Two words, “elron 2023”. The card comes back with its price and availability.",
      },
      { k: "You prepare", v: "Tap “Send to…”, pick Marie. Vitreen notes it in her history." },
      { k: "You forward", v: "The card, from your own WhatsApp. Vitreen never sends." },
    ],
    line: "Your usual WhatsApp is never read.",
    assistant: { name: "Vitreen", status: "assistant", initials: "V" },
    collector: { name: "Marie Beaumont", status: "online", initials: "MB" },
    ask: [
      { from: "me", time: "10:41", text: "elron 2023" },
      {
        from: "bot",
        time: "10:41",
        image: EVENING_FIELD,
        text: "Sacha Elron\nEvening field, 2023\nAcrylic on canvas\n120 × 120 cm\n€10,000",
      },
    ],
    status: { from: "bot", time: "10:41", text: "Available · ref. SE-2023-04" },
    before: {
      from: "bot",
      time: "10:41",
      text: "Sacha Elron — Evening field\nWho is this for? Naming them adds it to their history and opens their conversation.",
      listButton: "Send to…",
    },
    sheetTitle: "Send to…",
    sheetSend: "Send",
    sheetRows: ["Marie Beaumont", "Thomas Baur", "→ Don’t record"],
    after: [{ from: "bot", time: "10:42", text: "Prepared for Marie Beaumont · recorded" }],
    forward: {
      from: "me",
      time: "10:43",
      forwarded: { label: "Forwarded" },
      image: EVENING_FIELD,
      text: "Sacha Elron\nEvening field, 2023\nAcrylic on canvas\n120 × 120 cm\n€10,000",
    },
  },
};

export const CONVERSATION_SECTIONS_FR: ConversationSectionsCopy = {
  block: {
    eyebrow: "Répondre",
    title: "Votre inventaire, dans chaque conversation.",
    sub: "Dans Gmail, sur WhatsApp, et sur la fiche de chaque collectionneur.",
  },
  feed: {
    eyebrow: "Se souvenir",
    title: "Chaque échange, mémorisé.",
    sub: "La conversation reste liée au collectionneur.",
    line: "Retrouvez la question, votre réponse et l’œuvre partagée dans un même historique.",
    kinds: [
      { label: "Demande en attente", body: "Un collectionneur a demandé. Pas encore de réponse." },
      { label: "Nouvel échange", body: "Un message est arrivé, ou une œuvre est partie." },
      { label: "Rappel", body: "Une relance que vous avez prévue arrive." },
      { label: "Garder le contact", body: "Trop longtemps sans nouvelles." },
    ],
    events: [
      {
        kind: 3,
        channel: null,
        who: "Camille Fournier",
        initials: "CF",
        title: "Reprendre contact avec Camille Fournier",
        body: "Dernier échange il y a 3 semaines.",
        when: "18 sept.",
      },
      {
        kind: 2,
        channel: null,
        who: "Sofía Alvarez",
        initials: "SA",
        title: "Relancer Sofía Alvarez",
        body: "Rappel que vous avez prévu pour Blue hour.",
        when: "22 sept.",
      },
      {
        kind: 0,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "Thomas Baur vous a écrit au sujet de « Self-Portrait »",
        body: "Pourriez-vous m’envoyer le prix et les dimensions du Self-Portrait ?",
        when: "6 oct.",
      },
      {
        kind: 1,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "Vous avez envoyé « Self-Portrait » à Thomas Baur",
        body: "Fiche envoyée depuis votre réponse Gmail.",
        when: "6 oct.",
      },
      {
        kind: 0,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "Marie Beaumont vous a écrit au sujet d’« Evening field »",
        body: "Bonsoir, Evening field est-il toujours disponible ?",
        when: "Aujourd’hui",
      },
      {
        kind: 1,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "Vous avez transféré « Evening field » à Marie Beaumont",
        body: "Préparée dans Vitreen, envoyée depuis votre WhatsApp.",
        when: "Aujourd’hui",
      },
    ],
  },
  statement: {
    lines: ["Votre inventaire.", "Votre CRM."],
    linked: "Relié à",
    body: "Votre stock et vos fiches collectionneurs vivent dans Vitreen, reliés aux conversations où vous vendez. Rien à ressaisir.",
  },
  email: {
    eyebrow: "Gmail",
    title: "Dans votre boîte mail.",
    sub: "Répondez avec l’œuvre, pas avec une recherche.",
    steps: [
      { k: "Vous répondez", v: "Écrivez à Marie comme d’habitude, dans Gmail." },
      { k: "Vous cherchez", v: "Ouvrez Vitreen dans le brouillon et tapez « Elron »." },
      {
        k: "Vous envoyez",
        v: "L’œuvre entre dans votre réponse, avec son image et son prix. C’est vous qui envoyez.",
      },
    ],
    line: "Fonctionne dans Gmail, dans la réponse que vous écrivez.",
  },
  whatsapp: {
    eyebrow: "WhatsApp",
    title: "Sur WhatsApp.",
    sub: "Demander, préparer, transférer.",
    steps: [
      {
        k: "Vous demandez",
        v: "Deux mots, « elron 2023 ». La fiche revient avec son prix et sa disponibilité.",
      },
      {
        k: "Vous préparez",
        v: "Touchez « Envoyer à… », choisissez Marie. Vitreen le note dans son historique.",
      },
      { k: "Vous transférez", v: "La fiche, depuis votre propre WhatsApp. Vitreen n’envoie rien." },
    ],
    line: "Votre WhatsApp habituel n’est jamais lu.",
    assistant: { name: "Vitreen", status: "assistant", initials: "V" },
    collector: { name: "Marie Beaumont", status: "en ligne", initials: "MB" },
    ask: [
      { from: "me", time: "10:41", text: "elron 2023" },
      {
        from: "bot",
        time: "10:41",
        image: EVENING_FIELD,
        text: "Sacha Elron\nEvening field, 2023\nAcrylique sur toile\n120 × 120 cm\n10 000 €",
      },
    ],
    status: { from: "bot", time: "10:41", text: "Disponible · réf. SE-2023-04" },
    before: {
      from: "bot",
      time: "10:41",
      text: "Sacha Elron — Evening field\nPour qui ? Le nommer l’ajoute à son historique et ouvre sa conversation.",
      listButton: "Envoyer à…",
    },
    sheetTitle: "Envoyer à…",
    sheetSend: "Envoyer",
    sheetRows: ["Marie Beaumont", "Thomas Baur", "→ Ne pas noter"],
    after: [{ from: "bot", time: "10:42", text: "Préparée pour Marie Beaumont · noté" }],
    forward: {
      from: "me",
      time: "10:43",
      forwarded: { label: "Transféré" },
      image: EVENING_FIELD,
      text: "Sacha Elron\nEvening field, 2023\nAcrylique sur toile\n120 × 120 cm\n10 000 €",
    },
  },
};

/* ─── Shared pieces ─────────────────────────────────────────────────────── */

const AIRY = "px-4 py-24 md:px-6 md:py-36";
const TITLE =
  "mx-auto max-w-3xl text-balance text-center font-display text-[30px] font-medium leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[44px]";
const SUB =
  "mx-auto mt-2 max-w-3xl text-balance text-center font-display text-[30px] font-medium leading-[1.1] tracking-[-0.03em] text-[#ADADAA] md:text-[44px]";
const KICKER = "mb-5 text-center text-[13px] tracking-[-0.01em] text-[#6B6A67]";

const pop = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0 },
};

function Heading({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  /** White title, softer greys: for a section on black. */
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
    >
      <p className={dark ? KICKER.replace("text-[#6B6A67]", "text-[#ADADAA]") : KICKER}>
        {eyebrow}
      </p>
      <h2 className={dark ? TITLE.replace("text-[#111110]", "text-white") : TITLE}>{title}</h2>
      <p className={dark ? SUB.replace("text-[#ADADAA]", "text-[#6B6A67]") : SUB}>{sub}</p>
    </motion.div>
  );
}

/** A row's own heading, left-aligned above its steps, inside the shared section. */
function RowHeading({
  eyebrow,
  title,
  sub,
  logo,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  /** Channel logo shown before the eyebrow. */
  logo?: string;
}) {
  return (
    <div className="mb-4 pl-3">
      <p className="flex items-center gap-1.5 text-[13px] text-[#6B6A67]">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="h-4 w-4 object-contain" />
        ) : null}
        {eyebrow}
      </p>
      <h3 className="mt-1.5 font-display text-[22px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111110] md:text-[26px]">
        {title}
      </h3>
      <p className="mt-0.5 font-display text-[17px] leading-[1.25] tracking-[-0.02em] text-[#ADADAA] md:text-[19px]">
        {sub}
      </p>
    </div>
  );
}

/**
 * Plays a scene in beats while it is on screen, looping. `durations` is how
 * long each beat holds; `stepOf` maps a beat to the step lit beside it.
 * Without motion, the scene rests on its last beat.
 */
function useBeats(durations: number[]) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setTimeout(() => setBeat((b) => (b + 1) % durations.length), durations[beat]);
    return () => window.clearTimeout(t);
  }, [beat, inView, reduce, durations]);

  return { ref, beat: reduce ? durations.length - 1 : beat, setBeat };
}

/** The three steps beside a scene: the current one lit, each one clickable. */
function Steps({
  steps,
  active,
  onPick,
  line,
}: {
  steps: Step[];
  active: number;
  /** Without it, the steps only follow the scene. */
  onPick?: (i: number) => void;
  line: string;
}) {
  return (
    <div>
      <ol className="flex flex-col gap-1">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.k}>
              <button
                type="button"
                onClick={onPick ? () => onPick(i) : undefined}
                disabled={!onPick}
                aria-current={on}
                className={`flex w-full gap-3.5 rounded-[12px] px-3 py-2.5 text-left transition-colors duration-300 ${
                  on ? "bg-[#F5F5F3]" : onPick ? "hover:bg-[#FAFAF8]" : ""
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] tabular-nums transition-colors duration-300 ${
                    on ? "bg-[#111110] text-white" : "border border-[#E8E8E6] text-[#6B6A67]"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span
                    className={`block font-display text-[17px] tracking-[-0.02em] transition-colors duration-300 ${
                      on ? "text-[#111110]" : "text-[#ADADAA]"
                    }`}
                  >
                    {s.k}
                  </span>
                  <span
                    className={`mt-0.5 block text-[14px] leading-[1.5] transition-colors duration-300 ${
                      on ? "text-[#6B6A67]" : "text-[#ADADAA]"
                    }`}
                  >
                    {s.v}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 pl-3 font-display text-[16px] tracking-[-0.015em] text-[#111110]">
        {line}
      </p>
    </div>
  );
}

/* ─── Email: the Gmail add-in ───────────────────────────────────────────── */

function EmailSection({ c }: { c: ConversationSectionsCopy["email"] }) {
  // The real Gmail mockup plays its own loop; the steps follow its phases.
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
      <div className="pointer-events-none relative h-[400px] overflow-hidden rounded-[20px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.06)] md:h-[460px]">
        <IntegrationsFrame onPhase={setPhase} />
      </div>
      <div>
        <RowHeading
          eyebrow={c.eyebrow}
          title={c.title}
          sub={c.sub}
          logo="/logos/icon-gmail-96.png"
        />
        <Steps steps={c.steps} active={phase} line={c.line} />
      </div>
    </div>
  );
}

/* ─── WhatsApp: the assistant number ────────────────────────────────────── */

/** WhatsApp's chat header: back arrow, avatar, name and status. */
function ChatHeader({ who }: { who: Who }) {
  return (
    <div
      className="flex items-center gap-2 border-b border-[#E8E8E6] px-5 pb-3 pt-1"
      style={{ color: WA.ink }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 5l-7 7 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DFE5E7] text-[13px] font-medium text-[#54656F]">
        {who.initials}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[15px] font-medium">{who.name}</p>
        <p className="truncate text-[12px]" style={{ color: WA.muted }}>
          {who.status}
        </p>
      </div>
    </div>
  );
}

/** WhatsApp's composer, at rest. */
function ChatComposer() {
  return (
    <div className="flex items-center gap-2 px-4 pb-6 pt-1">
      <div
        className="flex-1 rounded-full bg-white px-4 py-2.5 text-[14px]"
        style={{ color: WA.muted }}
      >
        Message
      </div>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: WA.green }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm6-3a6 6 0 0 1-12 0m6 6v3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

/** WhatsApp's list sheet, as it opens under "Send to…". `picked` ticks the first row. */
function SendToSheet({
  title,
  rows,
  send,
  picked,
}: {
  title: string;
  rows: string[];
  send: string;
  picked: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-t-[16px] bg-white shadow-[0_-4px_20px_rgba(11,20,26,0.10)]"
      style={{ color: WA.ink }}
    >
      <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-[#D1D7DB]" />
      <div className="relative py-3 text-center text-[15px] font-medium">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] leading-none"
          style={{ color: WA.muted }}
        >
          ×
        </span>
        {title}
      </div>
      <ul className="px-4">
        {rows.map((label, i) => {
          const on = picked && i === 0;
          return (
            <li
              key={label}
              className="flex items-center justify-between border-t border-[#E9EDEF] py-3 text-[14.5px]"
            >
              {label}
              <span
                className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 transition-colors duration-300"
                style={{ borderColor: on ? WA.green : "#8696A0" }}
              >
                <motion.span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: WA.green }}
                  initial={false}
                  animate={{ scale: on ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end px-4 pb-4 pt-2">
        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: WA.green }}
          aria-label={send}
          initial={false}
          animate={{ opacity: picked ? 1 : 0.4, scale: picked ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" />
          </svg>
        </motion.span>
      </div>
    </div>
  );
}

/*
 *  0  "elron 2023"                        step 1, You ask
 *  1  the card comes back                 ┘
 *  2  "Who is this for?" + Send to…       ┐ step 2, You prepare
 *  3  the sheet opens                     │
 *  4  Marie is ticked                     │
 *  5  "Prepared … · recorded"             ┘
 *  6  Marie's chat, the card forwarded    step 3, You forward
 */
const WA_BEATS = [1200, 2200, 1700, 1300, 1600, 2400, 3600];
const WA_STEP_OF_BEAT = [0, 0, 1, 1, 1, 1, 2];
const WA_FIRST_BEAT = [0, 2, 6];

function WhatsAppScene({ c, beat }: { c: ConversationSectionsCopy["whatsapp"]; beat: number }) {
  const inMarie = beat === 6;
  const who = inMarie ? c.collector : c.assistant;
  // The assistant thread, in the order it builds up.
  const thread: { key: string; m: WaMessage; from: number; tail: boolean }[] = [
    { key: "ask", m: c.ask[0], from: 0, tail: true },
    { key: "card", m: c.ask[1], from: 1, tail: true },
    { key: "status", m: c.status, from: 1, tail: false },
    { key: "before", m: c.before, from: 2, tail: false },
    ...c.after.map((m, i) => ({ key: `after-${i}`, m, from: 5, tail: false })),
  ];

  return (
    <div className="relative mx-auto flex h-[640px] w-full max-w-[340px] flex-col overflow-hidden rounded-[56px] border-[0.5px] border-[#E8E8E6] bg-[#F5F5F3] pt-[58px]">
      {/* The island, like the home's other phone. */}
      <div className="absolute left-1/2 top-4 z-10 h-[28px] w-[116px] -translate-x-1/2 rounded-full bg-[#E8E8E6]" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={who.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChatHeader who={who} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {inMarie ? (
          <motion.div
            key="marie"
            className="flex flex-1 flex-col justify-end gap-[3px] px-[18px] py-3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <motion.div {...pop} transition={{ duration: 0.35, ease, delay: 0.6 }}>
              <WaBubble m={c.forward} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="assistant"
            className="flex flex-1 flex-col justify-end gap-[3px] overflow-hidden px-[18px] py-3"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            <AnimatePresence initial={false}>
              {thread
                .filter((t) => beat >= t.from)
                .map((t) => (
                  <motion.div key={t.key} layout {...pop} transition={{ duration: 0.35, ease }}>
                    <WaBubble m={t.m} tail={t.tail} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatComposer />

      {/* The list sheet rises over the chat, like WhatsApp's bottom sheet. */}
      <AnimatePresence>
        {beat === 3 || beat === 4 ? (
          <motion.div
            key="sheet"
            className="absolute inset-0 flex flex-col justify-end bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease }}
            >
              <SendToSheet
                title={c.sheetTitle}
                rows={c.sheetRows}
                send={c.sheetSend}
                picked={beat === 4}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppSection({ c }: { c: ConversationSectionsCopy["whatsapp"] }) {
  const { ref, beat, setBeat } = useBeats(WA_BEATS);
  return (
    <div ref={ref} className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2 md:gap-20">
      <div className="md:order-2">
        <WhatsAppScene c={c} beat={beat} />
      </div>
      <div>
        <RowHeading eyebrow={c.eyebrow} title={c.title} sub={c.sub} logo="/logos/whatsapp.svg" />
        <Steps
          steps={c.steps}
          active={WA_STEP_OF_BEAT[beat]}
          onPick={(i) => setBeat(WA_FIRST_BEAT[i])}
          line={c.line}
        />
      </div>
    </div>
  );
}

/* ─── Feed: the exchanges, as Gallery OS keeps them (simulated) ─────────── */

/** The app's own pill colours, in the order of `feed.kinds`. */
const KIND_TONES = [
  "bg-rose-50 text-rose-700",
  "bg-blue-50 text-blue-700",
  "bg-amber-50 text-amber-700",
  "bg-violet-50 text-violet-700",
];
const CHANNEL_LOGO = { whatsapp: "/logos/whatsapp.svg", gmail: "/logos/icon-gmail-96.png" };

function FeedRow({
  e,
  kinds,
  isFrench,
  answered,
}: {
  e: FeedEvent;
  kinds: { label: string }[];
  isFrench: boolean;
  answered: boolean;
}) {
  const isArtwork = e.kind === 1 && e.title.toLowerCase().includes("self-portrait");
  return (
    <div className="relative pl-10 md:pl-12">
      <span className="absolute bottom-[-14px] left-[15px] top-9 w-px bg-[#E1E1DE] md:left-[19px]" />
      <span
        className={`absolute left-0 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm md:left-1 ${
          e.channel ? "bg-white" : "bg-[#2F80ED] text-white"
        }`}
      >
        {e.channel ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={CHANNEL_LOGO[e.channel]} alt="" className="h-6 w-6 object-contain" />
        ) : (
          <FileText size={15} strokeWidth={1.8} aria-hidden="true" />
        )}
      </span>

      <div className="rounded-[15px] border border-[#DEDEDB] bg-white px-3.5 py-3 md:px-4 md:py-3.5">
        <div className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8FAF5] text-[11px] font-medium text-[#147D68]">
            {e.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium leading-[1.35] tracking-[-0.01em] text-[#111110] md:text-[13.5px]">
              {e.title}
            </p>
            <p className="mt-1 border-l-2 border-[#E4E4E1] pl-2.5 text-[12px] leading-[1.4] text-[#71717A] md:text-[12.5px]">
              {e.body}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${answered ? "bg-emerald-50 text-emerald-700" : KIND_TONES[e.kind]}`}
              >
                {answered ? (isFrench ? "Réponse envoyée" : "Reply sent") : kinds[e.kind].label}
              </span>
              {e.kind === 1 ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#71717A]">
                  <Database size={12} strokeWidth={1.8} aria-hidden="true" />
                  {isFrench ? `Sur la fiche de ${e.who}` : `On ${e.who}’s record`}
                </span>
              ) : null}
            </div>

            {isArtwork ? (
              <div className="mt-3 flex max-w-[280px] items-center gap-2.5 rounded-lg bg-[#FAFAF9] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/artworks/van-gogh-self-portrait.jpg"
                  alt=""
                  className="h-11 w-16 rounded-md object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-[11px] text-[#71717A]">Vincent van Gogh</span>
                  <span className="block truncate text-[13px] font-medium italic text-[#111110]">
                    Self-Portrait
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available
                  </span>
                </span>
              </div>
            ) : null}
          </div>
          <ArrowRight size={16} className="mt-1 shrink-0 text-[#D4D4D1]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function feedDayLabel(when: string, isFrench: boolean) {
  const labels: Record<string, [string, string]> = {
    Today: ["Today", "Aujourd’hui"],
    "Aujourd’hui": ["Today", "Aujourd’hui"],
    "6 Oct": ["Tuesday 6 October", "Mardi 6 octobre"],
    "6 oct.": ["Tuesday 6 October", "Mardi 6 octobre"],
    "22 Sept": ["Tuesday 22 September", "Mardi 22 septembre"],
    "22 sept.": ["Tuesday 22 September", "Mardi 22 septembre"],
    "18 Sept": ["Friday 18 September", "Vendredi 18 septembre"],
    "18 sept.": ["Friday 18 September", "Vendredi 18 septembre"],
  };
  return labels[when]?.[isFrench ? 1 : 0] ?? when;
}

function FeedSection({ c }: { c: ConversationSectionsCopy["feed"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const total = c.events.length;
  // New exchanges join the history once; older entries remain in the feed.
  const [n, setN] = useState(4);

  useEffect(() => {
    if (reduce) {
      setN(total);
      return;
    }
    if (!inView || n >= total) return;
    const t = window.setTimeout(() => setN((x) => Math.min(x + 1, total)), 2200);
    return () => window.clearTimeout(t);
  }, [n, inView, reduce, total]);

  const shown = c.events.slice(0, n).reverse();
  const isFrench = c.eyebrow === "Se souvenir";
  return (
    <section className="bg-[#111110] px-4 py-24 md:px-6 md:py-36">
      <Heading eyebrow={c.eyebrow} title={c.title} sub={c.sub} dark />
      <p className="mx-auto mt-6 max-w-2xl text-center font-display text-[16px] leading-[1.5] tracking-[-0.015em] text-[#ADADAA] md:text-[18px]">
        {c.line}
      </p>
      <div
        ref={ref}
        className="relative mx-auto mt-14 h-[min(620px,calc(100svh-200px))] max-w-4xl overflow-hidden rounded-[24px] bg-white px-4 py-6 md:mt-20 md:px-7 md:py-8"
      >
        <p className="mb-4 text-[13px] font-medium text-[#71717A] md:pl-2">
          {isFrench ? "Activité récente" : "Recent activity"}
        </p>
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {shown.map((e, index) => (
              <motion.li
                key={`${e.who}-${e.title}`}
                layout
                initial={reduce ? false : { opacity: 0, y: -18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 0.6, ease }}
              >
                {index === 0 || shown[index - 1]?.when !== e.when ? (
                  <p className="mb-2.5 pl-10 text-[11px] font-medium text-[#A1A1AA] md:pl-12 md:text-[12px]">
                    {feedDayLabel(e.when, isFrench)}
                  </p>
                ) : null}
                <FeedRow
                  e={e}
                  kinds={c.kinds}
                  isFrench={isFrench}
                  answered={
                    e.kind === 0 && shown.some((other) => other.kind === 1 && other.who === e.who)
                  }
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </div>
    </section>
  );
}

/* ─── Statement: one inventory, one CRM, every channel ──────────────────── */

const CHANNELS = [
  { name: "WhatsApp", color: "#00A884" },
  { name: "Gmail", color: "#EA4335" },
  { name: "Outlook", color: "#2B88D8" },
];

/** The closing statement; `action` (the final buttons) sits under it when it opens the footer. */
export function StatementSection({
  c,
  action,
}: {
  c: ConversationSectionsCopy["statement"];
  action?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % CHANNELS.length), 2400);
    return () => window.clearInterval(t);
  }, [inView, reduce]);

  const channel = CHANNELS[i];
  return (
    <section className="flex flex-1 flex-col justify-center bg-[#111110] px-4 py-16 text-white md:px-6 md:py-8">
      <div ref={ref} className="mx-auto w-full max-w-6xl">
        <h2 className="font-display text-[40px] font-medium leading-[1.04] tracking-[-0.045em] md:text-[60px] lg:text-[64px]">
          {c.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">
            <motion.span
              className="inline-block"
              animate={{ color: channel.color }}
              transition={{ duration: 0.5 }}
            >
              {c.linked}
            </motion.span>{" "}
            {/* The channel rolls in from below, in its own colour. */}
            <span className="relative inline-flex overflow-hidden pb-[0.12em] align-top">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={channel.name}
                  className="inline-block"
                  style={{ color: channel.color }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {channel.name}.
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.55] text-[#ADADAA] md:mt-8 md:text-[18px]">
          {c.body}
        </p>
        {action ? <div className="mt-8 md:mt-10">{action}</div> : null}
      </div>
    </section>
  );
}

export default function ConversationSections({
  copy,
  afterWhatsApp,
}: {
  copy: ConversationSectionsCopy;
  afterWhatsApp?: ReactNode;
}) {
  return (
    <>
      {/* One section holds the three rows, alternating scene left and right. */}
      <section className="bg-white px-4 pb-24 pt-0 md:px-6 md:pb-36 md:pt-4">
        <Heading eyebrow={copy.block.eyebrow} title={copy.block.title} sub={copy.block.sub} />
        <div className="mt-20 flex flex-col gap-28 md:mt-28 md:gap-40">
          <EmailSection c={copy.email} />
          <WhatsAppSection c={copy.whatsapp} />
        </div>
      </section>
      <FeedSection c={copy.feed} />
      {afterWhatsApp}
    </>
  );
}
