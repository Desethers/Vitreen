"use client";

import { usePathname } from "next/navigation";
import { localeHref, stripLocale, useLang } from "@/lib/lang";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Gallery OS", href: "/products/overview" },
      { label: "Artwork Management", href: "/products/archive" },
      { label: "Gallery Websites", href: "/products/publishing" },
      { label: "Private Viewing Rooms", href: "/products/viewing-rooms" },
      { label: "Gallery Assistant", href: "/products/custom-operations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Art Galleries", href: "/solutions/galleries" },
      { label: "For Artists", href: "/solutions/artists" },
      { label: "For Art Advisors & Dealers", href: "/solutions/advisors" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "#contact", opensContact: true },
    ],
  },
] as const;

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact-modal"));
}

/* The two language versions are separate URLs, so this is a plain link to the
 * counterpart page rather than a client-side toggle. */
function LanguageSwitch() {
  const { lang } = useLang();
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

export default function Footer() {
  const { href } = useLang();

  return (
    <footer id="contact" className="bg-[#111110] text-white">
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-7xl py-14 md:py-20">
          <div className="grid gap-14 md:grid-cols-[minmax(240px,1fr)_minmax(0,1.5fr)] md:gap-20 lg:gap-28">
            <div>
              <a
                href={href("/")}
                className="font-display text-[18px] tracking-[-0.025em] text-white"
              >
                Vitreen
              </a>
              <p className="mt-5 max-w-[23rem] text-[14px] leading-[1.65] text-[#ADADAA]">
                Connected websites and sales tools for art galleries, artists and advisors.
              </p>
            </div>

            <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-[12px] font-medium text-[#6B6A67]">{column.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={href(link.href)}
                          onClick={
                            "opensContact" in link && link.opensContact ? openContact : undefined
                          }
                          className="text-[14px] leading-snug text-[#D5D5D2] transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-3 pt-6 text-[12px] text-[#6B6A67] sm:flex-row sm:items-center sm:justify-between md:mt-20">
            <p>© 2026 Vitreen</p>
            <div className="flex items-center gap-4">
              <LanguageSwitch />
              <p>Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
