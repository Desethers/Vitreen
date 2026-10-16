"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

export type PhoneNotification = {
  initials: string;
  color: string;
  name: string;
  subject: string;
  time: string;
  body: string;
};

export type PhoneChat = {
  incoming: { text: string; time: string };
  outgoing: { text: string; time: string };
};

export type PhoneArtwork = {
  image: string;
  artist: string;
  title: string;
  year: string;
  medium: string;
  size: string;
  price: string;
  cta: string;
};

const CYCLE_MS = 3600;
/**
 * One loop drives the whole scene: the Gmail notification arrives first, the
 * artwork sheet appears as a single block right after, the WhatsApp exchange
 * follows on the notification rhythm, then everything disappears and restarts.
 */
const SCREEN_MS = 1300;
const CHAT_REPLY_MS = 2300;
/** How long after the first WhatsApp bubble the second work replaces the first. */
const WORK_SWAP_DELAY_MS = 1000;
const EXIT_MS = 900;
const PAUSE_MS = 700;

/** Fixed design size of the scene; it scales down as a whole in narrow columns. */
const STAGE_W = 760;
const STAGE_H = 760;

const ease = [0.16, 1, 0.3, 1] as const;

/** Straight stack, no left/right fan — depth comes from y + scale + a light rotateX tilt. */
const STACK_POSITIONS = [
  { y: 0, scale: 1, rotateX: 0, zIndex: 3, opacity: 1 },
  { y: 12, scale: 0.965, rotateX: 6, zIndex: 2, opacity: 0.85 },
  { y: 24, scale: 0.93, rotateX: 11, zIndex: 1, opacity: 0.6 },
];

function GmailCard({
  message,
  position,
  toMeLabel,
}: {
  message: PhoneNotification;
  position: number;
  toMeLabel: string;
}) {
  const target = STACK_POSITIONS[position];

  return (
    <div
      style={{
        transform: `translateY(${target.y}px) scale(${target.scale}) rotateX(${target.rotateX}deg)`,
        transformOrigin: "center top",
        zIndex: target.zIndex,
        opacity: target.opacity,
        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease-out",
      }}
      className="absolute inset-x-0 top-0 h-[134px] overflow-hidden rounded-[8px] border border-[#E1E3E6] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center gap-2 border-b border-[#E8E8E6] bg-[#F0F4F9] px-3 py-1.5">
        <img
          src="/logos/icon-gmail-96.png"
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 object-contain"
        />
        <span className="truncate text-[12px] font-medium text-[#202124]">{message.subject}</span>
      </div>

      <div className="px-3 pb-3 pt-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white"
              style={{ backgroundColor: message.color }}
              aria-hidden="true"
            >
              {message.initials}
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#202124]">{message.name}</p>
              <p className="text-[10.5px] text-[#5F6368]">{toMeLabel}</p>
            </div>
          </div>
          <span className="shrink-0 text-[10.5px] text-[#5F6368]">{message.time}</span>
        </div>
        <p className="mt-2 text-[13px] leading-[1.4] text-[#202124]">{message.body}</p>
      </div>
    </div>
  );
}

function ReadCheck() {
  return (
    <svg viewBox="0 0 16 10" fill="none" className="h-[9px] w-[14px]" aria-hidden="true">
      <path
        d="m.6 5.1 2.6 2.6L8 1.1M5.1 6.4l1.4 1.3 4.8-6.6"
        stroke="#3497F9"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bubble({
  side,
  text,
  time,
  visible,
}: {
  side: "in" | "out";
  text: string;
  time: string;
  visible: boolean;
}) {
  const outgoing = side === "out";

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.96)",
        transition: "opacity 0.5s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        transformOrigin: outgoing ? "right bottom" : "left bottom",
      }}
      className={`max-w-[92%] px-3 pb-1.5 pt-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
        outgoing
          ? "self-end rounded-[16px] rounded-tr-[4px] bg-[#DCF4C7]"
          : "self-start rounded-[16px] rounded-tl-[4px] border-[0.5px] border-[#E8E8E6] bg-white"
      }`}
    >
      <p className="text-[14px] leading-[1.35] text-[#111110]">{text}</p>
      <div className="mt-0.5 flex items-center justify-end gap-1 text-[10.5px] text-black/35">
        <span>{time}</span>
        {outgoing ? <ReadCheck /> : null}
      </div>
    </div>
  );
}

function ArtworkCard({ artwork }: { artwork: PhoneArtwork }) {
  return (
    <motion.div
      className="absolute inset-x-[22px] top-[96px]"
      initial={{ x: 340, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.9, ease } }}
      exit={{ x: 340, opacity: 0, transition: { duration: 0.6, ease } }}
    >
      <img
        src={artwork.image}
        alt=""
        className="h-[374px] w-full bg-[#F5F5F3] object-cover"
        style={{ objectPosition: "50% 50%" }}
      />
      <div className="relative mt-3">
        <p className="text-[13.5px] leading-[1.35] text-[#111110]">{artwork.artist}</p>
        <p className="text-[13.5px] italic leading-[1.35] text-[#111110]">
          {artwork.title}, {artwork.year}
        </p>
        <p className="mt-0.5 text-[12.5px] leading-[1.35] text-[#9AA0A8]">{artwork.medium}</p>
        <p className="text-[12.5px] leading-[1.35] text-[#9AA0A8]">{artwork.size}</p>
        <p className="mt-1 text-[13px] leading-[1.35] text-[#111110]">{artwork.price}</p>
        <span className="absolute right-0 top-0 border border-[#111110] px-3 py-0 text-[11.5px] text-[#111110]">
          {artwork.cta}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Flat phone shape (no bezel, notch or screen detail), cropped at the bottom
 * like a zoom. The artwork sits on its screen; the Gmail notifications (left)
 * and a short WhatsApp exchange (right) float outside it, biting on its edges.
 */
export default function PhoneNotifications({
  notifications,
  toMeLabel,
  chat,
  artworks,
}: {
  notifications: readonly PhoneNotification[];
  toMeLabel: string;
  chat: PhoneChat;
  /** First work answers the Gmail questions, the second one the WhatsApp exchange. */
  artworks: readonly [PhoneArtwork, PhoneArtwork];
}) {
  const [active, setActive] = useState(0);
  const [chatStep, setChatStep] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [scale, setScale] = useState(1);
  const [screenOn, setScreenOn] = useState(false);
  const [artIndex, setArtIndex] = useState(0);
  const [floatsOn, setFloatsOn] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.4 });

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const started = reduceMotion || inView;

  useEffect(() => {
    if (!started) return;
    if (reduceMotion) {
      setScreenOn(true);
      setFloatsOn(true);
      setChatStep(2);
      return;
    }

    const timers: number[] = [];
    const at = (fn: () => void, delay: number) => timers.push(window.setTimeout(fn, delay));
    const total = notifications.length;

    const play = () => {
      setScreenOn(false);
      setArtIndex(0);
      setFloatsOn(true);
      setActive(0);
      setChatStep(0);

      at(() => setScreenOn(true), SCREEN_MS);
      for (let i = 1; i < total; i += 1) at(() => setActive(i), i * CYCLE_MS);

      // The WhatsApp exchange arrives first; the second work follows a beat later.
      at(() => setChatStep(1), CYCLE_MS);
      at(() => setArtIndex(1), CYCLE_MS + WORK_SWAP_DELAY_MS);
      at(() => setChatStep(2), CYCLE_MS + CHAT_REPLY_MS);

      const end = total * CYCLE_MS;
      at(() => {
        setFloatsOn(false);
        setChatStep(0);
      }, end);
      at(() => setScreenOn(false), end + 300);
      at(play, end + EXIT_MS + PAUSE_MS);
    };
    play();

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [started, reduceMotion, notifications.length]);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-[12px] bg-[#F5F5F3]"
      style={{ height: STAGE_H * scale }}
    >
      <div
        className="absolute left-1/2 top-0"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <div className="absolute left-1/2 top-[30px] h-[700px] w-[340px] -translate-x-1/2 rounded-[56px] border-[0.5px] border-[#E8E8E6] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.07)]">
          <div className="absolute left-1/2 top-4 h-[34px] w-[116px] -translate-x-1/2 rounded-full bg-[#F5F5F3]" />
          {/* The sheet slides in from the right edge of the screen, like a panel. */}
          <div className="absolute inset-0 overflow-hidden rounded-[56px]">
            <AnimatePresence mode="wait" initial={false}>
              {screenOn ? <ArtworkCard key={artIndex} artwork={artworks[artIndex]} /> : null}
            </AnimatePresence>
          </div>
        </div>

        <div
          className="absolute left-[14px] top-[170px] z-10 h-[158px] w-[240px]"
          style={{
            perspective: 900,
            opacity: floatsOn ? 1 : 0,
            transform: floatsOn ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.8s ease-out, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {notifications.map((item, index) => {
            const position = (index - active + notifications.length) % notifications.length;
            return (
              <GmailCard key={item.name} message={item} position={position} toMeLabel={toMeLabel} />
            );
          })}
        </div>

        <div className="absolute right-[14px] top-[290px] z-10 flex w-[240px] flex-col gap-2">
          <Bubble
            side="in"
            text={chat.incoming.text}
            time={chat.incoming.time}
            visible={chatStep >= 1}
          />
          <Bubble
            side="out"
            text={chat.outgoing.text}
            time={chat.outgoing.time}
            visible={chatStep >= 2}
          />
        </div>
      </div>
    </div>
  );
}
