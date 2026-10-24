"use client";

import { useState } from "react";
import { openContactWithEmail } from "@/components/landing/LandingNav";

const COPY = {
  en: { placeholder: "you@yourgallery.com", label: "Your email", cta: "Book a demo" },
  fr: { placeholder: "vous@votregalerie.fr", label: "Votre e-mail", cta: "Réserver une démo" },
} as const;

/**
 * One pill: an email field and the demo button. Submitting records the
 * address (so a visitor who leaves before booking can still be followed up)
 * and opens the booking calendar with the email prefilled.
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
  const dark = tone === "dark";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = email.trim();
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        }).catch(() => {});
        openContactWithEmail(value);
      }}
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
        {t.cta}
      </button>
    </form>
  );
}
