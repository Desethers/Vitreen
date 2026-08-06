"use client";

import { usePathname } from "next/navigation";
import { localeHref, stripLocale, type Lang } from "@/lib/lang";

/* Separate URLs per language, so this is a plain link to the counterpart
 * page rather than a client-side toggle. Picking one writes the same cookie
 * the geo-redirect middleware reads, so a manual choice sticks instead of
 * being overridden by geo on the next visit. */
export default function LandingLanguageSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const bare = stripLocale(pathname);

  const options = [
    { code: "en" as const, label: "EN", url: bare, hrefLang: "en-GB" },
    { code: "fr" as const, label: "FR", url: localeHref("fr", bare), hrefLang: "fr-FR" },
  ];

  return (
    <p className="flex items-center gap-1.5">
      {options.map((option, index) => (
        <span key={option.code} className="flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          {option.code === lang ? (
            <span aria-current="true" className="text-[#D5D5D2]">
              {option.label}
            </span>
          ) : (
            <a
              href={option.url}
              hrefLang={option.hrefLang}
              onClick={() => {
                document.cookie = `vitreen-lang=${option.code}; path=/; max-age=31536000`;
              }}
              className="transition-colors duration-200 hover:text-white"
            >
              {option.label}
            </a>
          )}
        </span>
      ))}
    </p>
  );
}
