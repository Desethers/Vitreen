"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { BODY, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";
import {
  ProductArtworkConversations,
  ProductCollectorTimeline,
  ProductMorningHome,
  ZoomScreen,
  type ArtworkConversationsCopy,
  type CollectorTimelineCopy,
  type MorningHomeCopy,
} from "@/components/landing/product/ProductScreens";

export type RelationshipsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Short explanation shown in the right column, level with the title lines. */
  intro: string;
  link: { eyebrow: string; title: string; body: string; mock: ArtworkConversationsCopy };
  memory: { eyebrow: string; title: string; body: string; mock: CollectorTimelineCopy };
  assistant: { eyebrow: string; title: string; body: string; mock: MorningHomeCopy };
};

const EN_COPY: RelationshipsCopy = {
  eyebrow: "Relationship intelligence",
  title: "Remember what matters in every collector relationship.",
  subtitle: "Remember what was discussed, what you shared, and what comes next.",
  intro:
    "Vitreen keeps a memory of every {gmail}Gmail and {whatsapp}WhatsApp conversation, linked to the artworks discussed.\nSo you always know what was said, sent and what to follow up on.",
  link: {
    eyebrow: "Link",
    title: "Conversations and inventory, in one record.",
    body: "Every request and every work you send through Vitreen is attached to the collector and to the work: who asked, who received it, and whether they opened it.",
    mock: {
      works: {
        title: "Works discussed",
        inventory: "Inventory",
        items: [
          {
            image: "/artworks/painting-05.jpg",
            artist: "Sacha Elron",
            title: "Evening field",
            meta: "Available · €10,000",
          },
          {
            image: "/artworks/painting-03.jpg",
            artist: "Sacha Elron",
            title: "Crimson Field",
            meta: "Sold · €9,500",
          },
          {
            image: "/artworks/painting-04.jpg",
            artist: "Sacha Elron",
            title: "Sage Interval",
            meta: "Available · €6,500",
          },
          {
            image: "/artworks/painting-10.jpg",
            artist: "Sacha Elron",
            title: "Amber Nocturne",
            meta: "Sold · €14,000",
          },
        ],
      },
      usage: {
        title: "Usage & activity",
        tabs: [
          { label: "Private selections", count: 1 },
          { label: "Exhibitions", count: 0 },
          { label: "Sharing history", count: 3 },
        ],
        summary: "2 viewed · 1 not opened",
        sends: [
          {
            name: "Anna Roche",
            pill: "Opened",
            tone: "blue",
            meta: "Email card · Opened 30 Sept 2026",
          },
          {
            name: "Marie Beaumont",
            pill: "PDF viewed",
            tone: "emerald",
            meta: "PDF · PDF viewed 10 Sept 2026",
          },
          {
            name: "Thomas Baur",
            pill: "Prepared",
            tone: "zinc",
            meta: "WhatsApp · Prepared 15 Sept 2026",
          },
        ],
      },
      conversations: {
        title: "Conversations",
        rows: [
          { name: "Anna Roche", channel: "Gmail", state: "Opened the page", when: "6 days ago" },
          {
            name: "Marie Beaumont",
            channel: "WhatsApp",
            state: "Wrote about this work",
            when: "27 days ago",
          },
        ],
      },
    },
  },
  memory: {
    eyebrow: "Memory",
    title: "Every exchange with a collector, remembered.",
    body: "Their requests and the works you send them, from Gmail and WhatsApp, are kept on the collector’s record, with the works shown next to each message.",
    mock: {
      person: {
        id: "beaumont-marie",
        name: "Marie Beaumont",
        groups: "established collection · Paris · high priority",
        email: "beaumont.marie@gmail.com",
        phone: "+33 6 12 34 56 78",
      },
      channels: { whatsapp: "WhatsApp", gmail: "Gmail" },
      timeline: "Timeline",
      count: "16 moments",
      filters: [
        { label: "All", count: 16 },
        { label: "WhatsApp", count: 4 },
        { label: "Gmail", count: 2 },
        { label: "Meetings", count: 3 },
        { label: "Notes", count: 5 },
        { label: "Selections", count: 2 },
      ],

      today: "Today",
      todayDate: "6 October 2026",
      period: "September",
      toPickUp: "To pick up",

      exchange: {
        label: "Exchange spotted",
        date: "9 Sept",
        text: "Wrote to you about “Evening field”",
        quote:
          "Good evening, is Evening field still available? And could you remind me of its dimensions?",
        work: { image: "/artworks/painting-05.jpg", artist: "Sacha Elron", title: "Evening field" },
        channel: "WhatsApp",
        action: "Open in WhatsApp",
      },
    },
  },
  assistant: {
    eyebrow: "Assistant",
    title: "Your morning sales brief.",
    body: "The assistant reads that memory to tell you who is waiting for a reply and who to get back to. Ask it about your inventory or your collectors: it answers from your records only.",
    mock: {
      greeting: "Good morning",
      placeholder: "Ask Vitreen…",
      hint: "The assistant reads your records — it can’t send anything.",
      frames: ["A person", "A work", "A reply", "My day"],
      enter: "Enter to send",
      question: "Who is waiting for a reply this morning?",
      answerIntro: "One collector is waiting for a reply:",
      answerItems: [
        {
          title: "Marie Beaumont",
          rest: " wrote on WhatsApp on 9 September: is “Evening field” still available, and what are its dimensions?",
        },
      ],
      tools: "From your records · searchConversations",
      clear: "Clear",
      now: "Now",
      waiting: {
        id: "marie-beaumont",
        name: "Marie Beaumont",
        title: "Marie Beaumont wrote to you about “Self-Portrait”",
        detail: "Is the Van Gogh Self-Portrait still available?",
        channel: "Gmail",
        date: "14 March",
        work: {
          image: "/artworks/van-gogh-self-portrait.jpg",
          artist: "Vincent van Gogh",
          title: "Self-Portrait",
          status: "Available",
        },
      },
    },
  },
};

const LOGOS = {
  "{gmail}": "/logos/icon-gmail-96.png",
  "{whatsapp}": "/logos/whatsapp.svg",
} as const;

/** A round logo badge set inline in the copy, right before the app's name. */
function LogoBadge({ src }: { src: string }) {
  return (
    <span
      className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white align-middle"
      aria-hidden="true"
    >
      <img src={src} alt="" className="h-[18px] w-[18px] object-contain" />
    </span>
  );
}

/**
 * Renders the copy, swapping `{gmail}` / `{whatsapp}` for their logo badge. The
 * badge is kept on the same line as the name that follows it.
 */
function WithLogos({ text }: { text: string }) {
  const parts = text.split(/(\{gmail\}|\{whatsapp\})/);
  const nodes: ReactNode[] = [];

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const src = LOGOS[part as keyof typeof LOGOS];
    if (!src) {
      nodes.push(<Fragment key={index}>{part}</Fragment>);
      continue;
    }

    const next = parts[index + 1] ?? "";
    const word = next.match(/^[^\s,.]+/)?.[0] ?? "";
    nodes.push(
      <span key={index} className="whitespace-nowrap">
        <LogoBadge src={src} />
        {word}
      </span>
    );
    parts[index + 1] = next.slice(word.length);
  }

  return <>{nodes}</>;
}

/** A white card with a fine stroke; the bento instead lays its three cards on grey. */
function MockFrame({ children, grey = false }: { children: ReactNode; grey?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[12px] ${
        grey ? "bg-[#F5F5F3]" : "border-[0.5px] border-[#DCDCD8] bg-white"
      }`}
    >
      {children}
    </div>
  );
}

/** Where each real screen is cut for its square frame, in the screen's own pixels. */
const VIEWS = {
  // The work, the message about it and the list of who it was discussed with.
  link: { x: -8, y: -8, width: 616 },
  // The whole record, from the person to the second moment, with room on every side.
  memory: { x: -24, y: -24, width: 568 },
  // Greeting, question box and answer fill the frame; no "Now" card.
  assistant: { x: 0, y: 0, width: 600 },
} as const;

type BeatKey = "assistant" | "link" | "memory";
const BEATS: readonly BeatKey[] = ["assistant", "link", "memory"];

/** The beat whose screen crosses the middle of the viewport. */
function useActiveBeat(frames: RefObject<(HTMLDivElement | null)[]>) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = frames.current?.filter((node): node is HTMLDivElement => !!node) ?? [];
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [frames]);

  return active;
}

/** Eyebrow, title and body of a beat, as shown above its screen on phones. */
function BeatCaption({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mb-6 max-w-lg md:hidden">
      <p className={EYEBROW}>{eyebrow}</p>
      <h3 className="mt-3 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-[#111110]">
        {title}
      </h3>
      <p className={`${BODY} mt-3`}>{body}</p>
    </div>
  );
}

export function RelationshipsSection({ copy }: { copy: RelationshipsCopy }) {
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const active = useActiveBeat(frames);

  const screens: Record<BeatKey, ReactNode> = {
    assistant: (
      <MockFrame>
        <ZoomScreen width={600} view={VIEWS.assistant}>
          <ProductMorningHome copy={copy.assistant.mock} chatOnly animated />
        </ZoomScreen>
      </MockFrame>
    ),
    link: (
      <MockFrame grey>
        <ZoomScreen width={600} view={VIEWS.link}>
          <ProductArtworkConversations copy={copy.link.mock} />
        </ZoomScreen>
      </MockFrame>
    ),
    memory: (
      <MockFrame>
        <ZoomScreen width={520} view={VIEWS.memory}>
          <ProductCollectorTimeline copy={copy.memory.mock} />
        </ZoomScreen>
      </MockFrame>
    ),
  };

  const goTo = (index: number) =>
    frames.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section className={`${SECTION} bg-white md:py-24`}>
      <div
        className={`${CONTAINER} grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-20`}
      >
        {/* Stays in view while the screens scroll past on the right. */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className={EYEBROW}>{copy.eyebrow}</p>
          <h2 className={`${H2} mt-4`}>{copy.title}</h2>
          <p className={H2_SUB}>{copy.subtitle}</p>
          <p className={`${BODY} mt-5 max-w-lg whitespace-pre-line`}>
            <WithLogos text={copy.intro} />
          </p>

          <ol className="mt-8 hidden border-t border-[#E8E8E6] md:block">
            {BEATS.map((key, index) => {
              const beat = copy[key];
              const on = index === active;
              return (
                <li key={key} className="border-b border-[#E8E8E6]">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={on ? "step" : undefined}
                    className="w-full py-4 text-left"
                  >
                    <span className={EYEBROW}>{beat.eyebrow}</span>
                    <span
                      className={`mt-2 block font-display text-[19px] font-medium leading-[1.25] tracking-[-0.02em] transition-colors duration-300 ${
                        on ? "text-[#111110]" : "text-[#ADADAA]"
                      }`}
                    >
                      {beat.title}
                    </span>
                    <span
                      className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                    >
                      <span className="overflow-hidden">
                        <span className={`${BODY} block max-w-md pt-2`}>{beat.body}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="space-y-16 md:space-y-28 md:py-[12vh]">
          {BEATS.map((key, index) => (
            <div
              key={key}
              ref={(node) => {
                frames.current[index] = node;
              }}
            >
              <BeatCaption {...copy[key]} />
              {screens[key]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingRelationships() {
  return <RelationshipsSection copy={EN_COPY} />;
}
