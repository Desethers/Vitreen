"use client";

import { useState } from "react";

const CAL_URL = "https://cal.com/raphael-wexe5e/30min";

const COPY = {
  en: {
    placeholder: "you@yourgallery.com",
    label: "Your email",
    cta: "Book a demo",
    sending: "Sending…",
    done: "Thank you. Pick a time for a call, or we’ll contact you shortly to find one.",
    pick: "Choose a time",
    close: "Close",
    error: "Something went wrong. Please try again.",
  },
  fr: {
    placeholder: "vous@votregalerie.fr",
    label: "Votre e-mail",
    cta: "Réserver une démo",
    sending: "Envoi…",
    done: "Merci. Choisissez un créneau d’appel, ou nous vous recontactons très vite pour en convenir un.",
    pick: "Choisir un créneau",
    close: "Fermer",
    error: "Une erreur est survenue. Réessayez.",
  },
} as const;

/**
 * One pill: an email field and the demo button. Submitting sends the address
 * to /api/contact, then opens the Cal.com booking calendar (email prefilled).
 * If the visitor closes it, the confirmation says the team will follow up.
 */
export default function EmailCta({
  lang,
  tone = "light",
  className = "",
}: {
  lang: "en" | "fr";
  /** "dark" for a black section. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [calOpen, setCalOpen] = useState(false);
  const dark = tone === "dark";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setCalOpen(true);
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    const src = `${CAL_URL}?embed=true&theme=light&email=${encodeURIComponent(email.trim())}`;
    return (
      <>
        <div
          role="status"
          className={`w-full max-w-[520px] rounded-[12px] px-4 py-3 text-[14px] tracking-[-0.01em] ${
            dark ? "border border-white/15 text-white" : "border border-[#DCDCD8] text-[#111110]"
          } ${className}`}
        >
          <p>{t.done}</p>
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className="mt-2 cursor-pointer underline underline-offset-2"
          >
            {t.pick}
          </button>
        </div>
        {calOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setCalOpen(false)}
          >
            <div
              className="relative h-[min(720px,90vh)] w-full max-w-[760px] overflow-hidden rounded-[12px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setCalOpen(false)}
                aria-label={t.close}
                className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-white px-3 py-1 text-[13px] text-[#111110] border border-[#E8E8E6]"
              >
                {t.close}
              </button>
              <iframe src={src} title={t.pick} className="h-full w-full border-0" />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={submit}
        className={`flex w-full max-w-[520px] items-center gap-1 rounded-[12px] p-1 transition-colors ${
          dark
            ? "border border-white/15 bg-white/[0.06] focus-within:border-white/40"
            : "border border-[#DCDCD8] bg-white focus-within:border-[#111110]"
        } ${className}`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.label}
          autoComplete="email"
          className={`h-11 min-w-0 flex-1 bg-transparent pl-4 text-[14px] tracking-[-0.01em] focus:outline-none ${
            dark
              ? "text-white placeholder:text-white/40"
              : "text-[#111110] placeholder:text-[#ADADAA]"
          }`}
        />
        <button
          type="submit"
          className={`h-11 shrink-0 cursor-pointer rounded-[8px] px-4 text-[14px] font-medium tracking-[-0.01em] transition-colors md:px-5 ${
            dark
              ? "bg-white text-[#111110] hover:bg-[#F5F5F3]"
              : "bg-[#111110] text-white hover:bg-[#2a2a28]"
          }`}
        >
          {status === "sending" ? t.sending : t.cta}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-2 text-[13px] text-[#B42318]">
          {t.error}
        </p>
      )}
    </>
  );
}
