"use client";

import type { ReactNode } from "react";
import { BODY, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

type Person = { initials: string; color: string; name: string };

export type RelationshipsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Short explanation shown in the right column, level with the title lines. */
  intro: string;
  link: {
    eyebrow: string;
    title: string;
    body: string;
    mock: {
      image: string;
      work: string;
      meta: string;
      usedIn: string;
      usedInSub: string;
      rows: readonly (Person & { detail: string; tag: string })[];
    };
  };
  memory: {
    eyebrow: string;
    title: string;
    body: string;
    mock: {
      person: Person;
      email: string;
      channel: string;
      date: string;
      excerpt: string;
      works: readonly { image: string; title: string }[];
      followLabel: string;
      follow: string;
    };
  };
  assistant: {
    eyebrow: string;
    title: string;
    body: string;
    mock: {
      greeting: string;
      briefLabel: string;
      briefChannel: string;
      brief: string;
      person: Person;
      listTitle: string;
      rows: readonly (Person & { reason: string; since: string })[];
      question: string;
      answer: string;
    };
  };
};

const EN_COPY: RelationshipsCopy = {
  eyebrow: "Relationship intelligence",
  title: "The CRM where your sales conversations are remembered.",
  subtitle: "Gmail, WhatsApp and your inventory feed it. Nothing to type in.",
  intro:
    "The requests you receive and the works you send, in Gmail and WhatsApp, are kept together on each collector’s record. The assistant reads that memory to prepare your day. You review, you send.",
  link: {
    eyebrow: "Link",
    title: "Conversations and inventory, in one record.",
    body: "Every request and every work you send through Vitreen is attached to the collector and to the work: who asked, who received it, and whether they opened it.",
    mock: {
      image: "/artworks/van-gogh-self-portrait.jpg",
      work: "Self-Portrait",
      meta: "Vincent van Gogh · 1887",
      usedIn: "Used in",
      usedInSub: "Where this work lives right now",
      rows: [
        {
          initials: "MB",
          color: "#6B7FD7",
          name: "Marie Beaumont",
          detail: "Sent by email · 14 March",
          tag: "Opened",
        },
        {
          initials: "AR",
          color: "#4E9C82",
          name: "Anna Roche",
          detail: "Spring selection (PDF) · 2 March",
          tag: "PDF viewed",
        },
        {
          initials: "TB",
          color: "#C97B4A",
          name: "Thomas Baur",
          detail: "Price requested · 18 February",
          tag: "Inquiry",
        },
      ],
    },
  },
  memory: {
    eyebrow: "Memory",
    title: "Every exchange with a collector, remembered.",
    body: "Their requests and the works you send them, from Gmail and WhatsApp, are kept on the collector’s record, with the works shown next to each message.",
    mock: {
      person: { initials: "MB", color: "#6B7FD7", name: "Marie Beaumont" },
      email: "mariebeaumont@gmail.com",
      channel: "Gmail",
      date: "14 March",
      excerpt: "Is the Van Gogh Self-Portrait still available?",
      works: [
        { image: "/artworks/van-gogh-self-portrait.jpg", title: "Self-Portrait" },
        { image: "/artworks/van-gogh-sunflowers.jpg", title: "Sunflowers" },
      ],
      followLabel: "To follow up",
      follow: "Send the details of Sunflowers",
    },
  },
  assistant: {
    eyebrow: "Assistant",
    title: "Your morning sales brief.",
    body: "The assistant reads that memory to tell you who is waiting for a reply and who to get back to. Ask it about your inventory or your collectors: it answers from your records only.",
    mock: {
      greeting: "Good morning.",
      briefLabel: "To pick up",
      briefChannel: "Gmail",
      brief: "Marie Beaumont is waiting for a reply about “Self-Portrait”.",
      person: { initials: "MB", color: "#6B7FD7", name: "Marie Beaumont" },
      listTitle: "To follow up today",
      rows: [
        {
          initials: "MB",
          color: "#6B7FD7",
          name: "Marie Beaumont",
          reason: "Reply to the request",
          since: "14 March",
        },
        {
          initials: "TB",
          color: "#C97B4A",
          name: "Thomas Baur",
          reason: "Message to review",
          since: "Yesterday",
        },
        {
          initials: "AR",
          color: "#4E9C82",
          name: "Anna Roche",
          reason: "Get back in touch",
          since: "2 March",
        },
      ],
      question: "Who asked about Van Gogh?",
      answer: "Marie Beaumont and Thomas Baur.",
    },
  },
};

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-[440px] w-full items-center justify-center overflow-hidden rounded-[12px] bg-[#F5F5F3] px-4 md:px-8">
      {children}
    </div>
  );
}

function Avatar({ person, size = 28 }: { person: Person; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full text-[10.5px] font-medium text-white"
      style={{ backgroundColor: person.color, width: size, height: size }}
    >
      {person.initials}
    </span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-[#E1E1DE] px-2.5 py-0.5 text-[11px] text-[#6B6A67]">
      {children}
    </span>
  );
}

function GmailPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EEF3FF] px-2 py-0.5 text-[11px] font-medium text-[#3558C8]">
      <img src="/logos/icon-gmail-96.png" alt="" className="h-3 w-3 object-contain" />
      {label}
    </span>
  );
}

function LinkMock({ mock }: { mock: RelationshipsCopy["link"]["mock"] }) {
  return (
    <div className="w-full max-w-[460px] rounded-[12px] border border-[#E8E8E6] bg-white">
      <div className="flex items-center gap-3 border-b border-[#E8E8E6] px-4 py-3.5">
        <img
          src={mock.image}
          alt=""
          className="h-12 w-10 shrink-0 rounded-[4px] bg-[#F5F5F3] object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium italic text-[#111110]">{mock.work}</p>
          <p className="truncate text-[12px] text-[#6B6A67]">{mock.meta}</p>
        </div>
      </div>
      <div className="px-4 pb-1 pt-3">
        <p className="text-[12px] font-medium text-[#111110]">{mock.usedIn}</p>
        <p className="text-[11px] text-[#ADADAA]">{mock.usedInSub}</p>
        <ul className="mt-1">
          {mock.rows.map((row) => (
            <li
              key={row.name}
              className="flex items-center gap-3 border-b border-[#E8E8E6] py-2.5 last:border-b-0"
            >
              <Avatar person={row} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-[#111110]">{row.name}</p>
                <p className="truncate text-[12px] text-[#6B6A67]">{row.detail}</p>
              </div>
              <Pill>{row.tag}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MemoryMock({ mock }: { mock: RelationshipsCopy["memory"]["mock"] }) {
  return (
    <div className="w-full max-w-[460px] space-y-2.5">
      <div className="rounded-[12px] border border-[#E8E8E6] bg-white p-4">
        <div className="flex items-center gap-3">
          <Avatar person={mock.person} size={34} />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium text-[#111110]">{mock.person.name}</p>
            <p className="truncate text-[11.5px] text-[#ADADAA]">{mock.email}</p>
          </div>
        </div>

        <div className="mt-3.5 rounded-[10px] bg-[#F5F5F3] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <GmailPill label={mock.channel} />
            <span className="text-[11px] text-[#ADADAA]">{mock.date}</span>
          </div>
          <p className="mt-2.5 text-[13px] leading-[1.45] text-[#111110]">{mock.excerpt}</p>
          <div className="mt-3 flex gap-2.5">
            {mock.works.map((work) => (
              <div
                key={work.title}
                className="flex min-w-0 items-center gap-2 rounded-[8px] bg-white p-1.5 pr-3"
              >
                <img
                  src={work.image}
                  alt=""
                  className="h-10 w-8 shrink-0 rounded-[3px] bg-[#F5F5F3] object-cover"
                />
                <p className="truncate text-[12px] font-medium italic text-[#111110]">
                  {work.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[12px] bg-[#111110] px-4 py-3.5">
        <p className="text-[11px] font-medium text-white/55">{mock.followLabel}</p>
        <p className="mt-1 text-[13px] text-white">{mock.follow}</p>
      </div>
    </div>
  );
}

function AssistantMock({ mock }: { mock: RelationshipsCopy["assistant"]["mock"] }) {
  return (
    <div className="w-full max-w-[460px] rounded-[12px] border border-[#E8E8E6] bg-white p-4">
      <p className="text-[20px] font-medium tracking-[-0.03em] text-[#111110]">{mock.greeting}</p>

      <div className="mt-3 flex items-start gap-3 rounded-[10px] bg-[#F5F5F3] p-3">
        <Avatar person={mock.person} size={30} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#6B6A67]">{mock.briefLabel}</span>
            <GmailPill label={mock.briefChannel} />
          </div>
          <p className="mt-1 text-[13px] font-medium leading-[1.4] text-[#111110]">{mock.brief}</p>
        </div>
      </div>

      <p className="mb-0.5 mt-4 text-[12px] font-medium text-[#111110]">{mock.listTitle}</p>
      <ul>
        {mock.rows.map((row) => (
          <li
            key={row.name}
            className="flex items-center gap-3 border-b border-[#E8E8E6] py-2 last:border-b-0"
          >
            <Avatar person={row} size={24} />
            <p className="min-w-0 flex-1 truncate text-[12.5px] text-[#111110]">
              <span className="font-medium">{row.name}</span>
              <span className="text-[#6B6A67]"> · {row.reason}</span>
            </p>
            <span className="shrink-0 text-[11px] text-[#ADADAA]">{row.since}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3.5 rounded-[10px] border border-[#E8E8E6] px-3 py-2.5">
        <p className="text-[12.5px] text-[#111110]">{mock.question}</p>
        <p className="mt-1 text-[12.5px] text-[#6B6A67]">{mock.answer}</p>
      </div>
    </div>
  );
}

function Beat({
  eyebrow,
  title,
  body,
  reverse = false,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
      <div className={`max-w-lg ${reverse ? "md:order-2" : ""}`}>
        <p className={EYEBROW}>{eyebrow}</p>
        <h3 className="mt-4 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
          {title}
        </h3>
        <p className={`${BODY} mt-4`}>{body}</p>
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <MockFrame>{children}</MockFrame>
      </div>
    </div>
  );
}

export function RelationshipsSection({ copy }: { copy: RelationshipsCopy }) {
  return (
    <section className={`${SECTION} border-t border-[#E8E8E6] bg-white md:py-24`}>
      <div className={CONTAINER}>
        <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-16">
          <div className="max-w-2xl">
            <p className={EYEBROW}>{copy.eyebrow}</p>
            <h2 className={`${H2} mt-4`}>{copy.title}</h2>
            <p className={H2_SUB}>{copy.subtitle}</p>
          </div>
          <p className={`${BODY} max-w-lg md:pt-9`}>{copy.intro}</p>
        </div>

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          <Beat {...copy.link}>
            <LinkMock mock={copy.link.mock} />
          </Beat>
          <Beat {...copy.memory} reverse>
            <MemoryMock mock={copy.memory.mock} />
          </Beat>
          <Beat {...copy.assistant}>
            <AssistantMock mock={copy.assistant.mock} />
          </Beat>
        </div>
      </div>
    </section>
  );
}

export default function LandingRelationships() {
  return <RelationshipsSection copy={EN_COPY} />;
}
