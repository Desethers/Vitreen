"use client";

import { motion } from "framer-motion";

export type WaCard = { image: string; title: string; meta: string; price: string };
export type WaListItem = { title: string; sub: string };

export type WaMessage = {
  from: "me" | "bot";
  time: string;
  text?: string;
  /** "Forwarded" label + the original sender, as WhatsApp shows it. */
  forwarded?: { label: string; name?: string };
  image?: string;
  voice?: string;
  card?: WaCard;
  list?: WaListItem[];
  /** WhatsApp reply buttons, rendered under the bubble. */
  actions?: string[];
  /** WhatsApp list-message button ("Send to…"), inside the bubble under a divider. */
  listButton?: string;
};

export const WA = {
  wallpaper: "#EFEAE2",
  link: "#027EB5",
  me: "#D9FDD3",
  green: "#00A884",
  ink: "#111B21",
  muted: "#667781",
};

function Ticks() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
      <path
        d="M1 5.5 3.8 8.3 9.6 1.7M6.6 8.3l5.8-6.6"
        stroke="#53BDEB"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The little hook on the first bubble of a run, as WhatsApp draws it. */
function Tail({ mine }: { mine: boolean }) {
  return (
    <svg
      viewBox="0 0 8 13"
      width="8"
      height="13"
      aria-hidden="true"
      className={`absolute top-0 ${mine ? "-right-[8px]" : "-left-[8px] -scale-x-100"}`}
    >
      <path d="M0 0h8L1.2 9.1C.7 9.8 0 9.5 0 8.6z" fill={mine ? WA.me : "#FFFFFF"} />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Meta({ m, mine, overlay = false }: { m: WaMessage; mine: boolean; overlay?: boolean }) {
  return (
    <span
      className={`flex items-center gap-[3px] text-[11px] leading-none ${
        overlay ? "text-white/90" : ""
      }`}
      style={overlay ? undefined : { color: WA.muted }}
    >
      {m.time}
      {mine ? <Ticks /> : null}
    </span>
  );
}

export function WaBubble({ m, tail = true }: { m: WaMessage; tail?: boolean }) {
  const mine = m.from === "me";
  const bg = mine ? WA.me : "#FFFFFF";
  const shadow = "shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]";
  const corner = tail ? (mine ? "rounded-tr-none" : "rounded-tl-none") : "";
  const hasMedia = Boolean(m.image || m.card);

  return (
    <div className={`flex flex-col ${mine ? "items-end" : "items-start"} ${tail ? "mt-1" : ""}`}>
      <div
        className={`relative max-w-[85%] rounded-[7.5px] ${corner} ${shadow} ${
          hasMedia ? "p-[3px]" : "px-[9px] pb-[7px] pt-[6px]"
        }`}
        style={{ background: bg, color: WA.ink }}
      >
        {tail ? <Tail mine={mine} /> : null}

        {m.forwarded ? (
          <p
            className={`mb-0.5 flex items-center gap-1 text-[12px] italic ${hasMedia ? "px-[6px] pt-[3px]" : ""}`}
            style={{ color: WA.muted }}
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path
                d="M7 1l4 4-4 4M11 5H5C2.8 5 1 6.8 1 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {m.forwarded.label}
          </p>
        ) : null}
        {m.forwarded?.name ? (
          <p className="text-[12.5px] font-medium" style={{ color: "#1FA855" }}>
            {m.forwarded.name}
          </p>
        ) : null}

        {m.image ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.image}
              alt=""
              className="block aspect-square w-[240px] max-w-full rounded-[6px] object-cover"
            />
            {m.text ? null : (
              <span className="absolute bottom-1.5 right-2">
                <Meta m={m} mine={mine} overlay />
              </span>
            )}
          </div>
        ) : null}

        {m.voice ? (
          <div className="flex w-52 items-center gap-2 py-1">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: WA.green }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                <path d="M1 1l8 5-8 5z" fill="white" />
              </svg>
            </span>
            <span className="flex h-6 flex-1 items-center gap-[2px]">
              {[4, 9, 14, 7, 12, 18, 10, 6, 13, 16, 8, 11, 5, 9, 14, 7, 4, 8].map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-[#8696A0]" style={{ height: h }} />
              ))}
            </span>
          </div>
        ) : null}

        {m.card ? (
          <div className="w-56 overflow-hidden rounded-[6px] bg-[#F7F8FA]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.card.image} alt="" className="h-32 w-full object-cover" />
            <div className="px-2.5 py-2">
              <p className="text-[13px] font-medium">{m.card.title}</p>
              <p className="text-[11.5px]" style={{ color: WA.muted }}>
                {m.card.meta}
              </p>
              <p className="mt-0.5 text-[12.5px] font-medium" style={{ color: WA.green }}>
                {m.card.price}
              </p>
            </div>
          </div>
        ) : null}

        {m.list ? (
          <ul className="mb-1 flex flex-col gap-1.5">
            {m.list.map((item) => (
              <li key={item.title} className="border-l-2 pl-2" style={{ borderColor: WA.green }}>
                <p className="text-[13px] font-medium">{item.title}</p>
                <p className="text-[12px]" style={{ color: WA.muted }}>
                  {item.sub}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {m.text || !m.image ? (
          <div className={`relative ${hasMedia ? "px-[6px] pb-[4px] pt-[5px]" : ""}`}>
            <p className="whitespace-pre-line text-[14.2px] leading-[19px]">
              {m.text}
              {/* Reserves room so the time never overlaps the last line. */}
              <span
                className={`inline-block ${mine ? "w-[62px]" : "w-[44px]"}`}
                aria-hidden="true"
              />
            </p>
            <span
              className={`absolute ${hasMedia ? "bottom-[5px] right-[6px]" : "-bottom-[2px] right-0"}`}
            >
              <Meta m={m} mine={mine} />
            </span>
          </div>
        ) : null}

        {m.listButton ? (
          <div
            className="-mx-[9px] -mb-[7px] mt-2 flex items-center justify-center gap-2 border-t border-[#E9EDEF] py-[9px] text-[14px] font-medium"
            style={{ color: WA.link }}
          >
            <ListIcon />
            {m.listButton}
          </div>
        ) : null}
      </div>

      {m.actions ? (
        <div className="mt-[3px] flex w-full max-w-[85%] flex-col gap-[3px]">
          {m.actions.map((a) => (
            <span
              key={a}
              className={`rounded-[7.5px] bg-white py-[9px] text-center text-[14px] font-medium ${shadow}`}
              style={{ color: WA.link }}
            >
              {a}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function WaTyping() {
  return (
    <div className="flex items-start">
      <div className="flex gap-1 rounded-[10px] bg-white px-3 py-3 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#8696A0]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}

/** A static conversation on the home's soft grey, for the use-case cards. */
export function WaThread({ messages }: { messages: WaMessage[] }) {
  return (
    <div className="flex flex-col gap-2 rounded-[12px] p-3" style={{ background: "#F5F5F3" }}>
      {messages.map((m, i) => (
        <WaBubble key={i} m={m} />
      ))}
    </div>
  );
}
