"use client";

import { createContext, useContext, type ReactNode } from "react";
import { translations } from "./strings";

export type Lang = "fr" | "en";

export { translations };

/** English lives at the root, French under /fr. */
export const LOCALE_PREFIX: Record<Lang, string> = { en: "", fr: "/fr" };

/**
 * Prefix an internal href with the current locale.
 * Anchors, external URLs and already-prefixed paths are left untouched.
 */
export function localeHref(lang: Lang, href: string): string {
  if (!href.startsWith("/")) return href;
  const prefix = LOCALE_PREFIX[lang];
  if (!prefix) return href;
  if (href === "/") return prefix;
  if (href.startsWith(`${prefix}/`)) return href;
  return `${prefix}${href}`;
}

/** Strip the locale prefix — used to build the counterpart URL. */
export function stripLocale(pathname: string): string {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3);
  return pathname;
}

type LangContextType = {
  lang: Lang;
  t: (typeof translations)[Lang];
  /** Localised internal href for the active language. */
  href: (path: string) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  href: (path) => path,
});

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LangContext.Provider
      value={{ lang, t: translations[lang], href: (path) => localeHref(lang, path) }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
