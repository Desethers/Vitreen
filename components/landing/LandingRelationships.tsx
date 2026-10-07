"use client";

import { Fragment, type ReactNode } from "react";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";
import {
  ProductCollectorTimeline,
  ZoomScreen,
  type CollectorTimelineCopy,
} from "@/components/landing/product/ProductScreens";

export type RelationshipsCopy = {
  eyebrow: string;
  title: string;
  /** One sentence under the title; `{gmail}` / `{whatsapp}` become logo badges. */
  intro: string;
  memory: CollectorTimelineCopy;
};

const EN_COPY: RelationshipsCopy = {
  eyebrow: "Relationship intelligence",
  title: "Remember what matters in every collector relationship.",
  intro:
    "Vitreen keeps a memory of every {gmail}Gmail and {whatsapp}WhatsApp conversation, linked to the artworks discussed.",
  memory: {
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

/** Where the collector record is cut for its square frame, in the screen's own pixels. */
const MEMORY_VIEW = { x: -24, y: -24, width: 568 } as const;

/**
 * One sentence and one screen: the collector record, where a person, their
 * Gmail and WhatsApp exchanges and the works they asked about meet.
 */
export function RelationshipsSection({ copy }: { copy: RelationshipsCopy }) {
  return (
    <section className={`${SECTION} bg-white md:py-24`}>
      <div
        className={`${CONTAINER} grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center md:gap-20`}
      >
        <div>
          <p className={EYEBROW}>{copy.eyebrow}</p>
          <h2 className={`${H2} mt-4 max-w-[540px]`}>{copy.title}</h2>
          <p className={`${BODY} mt-5 max-w-lg`}>
            <WithLogos text={copy.intro} />
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[12px] border-[0.5px] border-[#DCDCD8] bg-white md:max-w-[560px] md:justify-self-end">
          <ZoomScreen width={520} view={MEMORY_VIEW}>
            <ProductCollectorTimeline copy={copy.memory} />
          </ZoomScreen>
        </div>
      </div>
    </section>
  );
}

export default function LandingRelationships() {
  return <RelationshipsSection copy={EN_COPY} />;
}
