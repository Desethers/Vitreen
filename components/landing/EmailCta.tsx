"use client";

import { useState } from "react";

const COPY = {
  en: {
    placeholder: "you@yourgallery.com",
    label: "Your email",
    cta: "Book a demo",
    sending: "Sending…",
    done: "Thank you. We’ll contact you shortly to find a time for a call.",
    error: "Something went wrong. Please try again.",
  },
  fr: {
    placeholder: "vous@votregalerie.fr",
    label: "Votre e-mail",
    cta: "Réserver une démo",
    sending: "Envoi…",
    done: "Merci. Nous vous recontactons très vite pour convenir d’un créneau d’appel.",
    error: "Une erreur est survenue. Réessayez.",
  },
} as const;

/**
 * One pill: an email field and the demo button. Submitting sends the address
 * to /api/contact and shows a confirmation: the team replies to find a time
 * for a call.
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
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p
        role="status"
        className={`w-full max-w-[520px] rounded-[12px] px-4 py-3 text-[14px] tracking-[-0.01em] ${
          dark ? "border border-white/15 text-white" : "border border-[#DCDCD8] text-[#111110]"
        } ${className}`}
      >
        {t.done}
      </p>
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
