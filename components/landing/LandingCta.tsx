"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import LandingLanguageSwitch from "@/components/landing/LandingLanguageSwitch";

const FOOTER_COLUMNS = [
  {
    title: "Tools",
    links: [
      { label: "Artwork Inventory", href: "/tools/artwork-inventory" },
      { label: "Sales Assistant", href: "/tools/sales-assistant" },
      { label: "Viewing Rooms", href: "/tools/viewing-rooms" },
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
    title: "Vitreen",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "#contact", opensContact: true },
    ],
  },
  {
    title: "Vitreen Studio",
    links: [
      { label: "How it works", href: "https://forart.world#how-it-works" },
      { label: "Tasks", href: "https://forart.world#tasks" },
      { label: "Contact", href: "mailto:studio@vitreen.art" },
    ],
  },
] as const;

export default function LandingCta() {
  return (
    <>
      {/* Same title+subtitle scale as CtaBand.tsx on main: both 30/44, leading-[1.15], tracking-[-0.03em]. */}
      <section className="bg-white px-6 py-20 md:px-12 md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-0 max-w-[22ch] font-display text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#111110] md:max-w-none md:text-[44px]">
            Bring Vitreen into your gallery
          </h2>
          <p className="mb-10 mt-0 max-w-3xl text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#6B6A67] md:mb-12 md:text-[44px]">
            Built around the way your gallery already works.
          </p>

          <Button size="lg" onClick={openContact}>
            Book a demo
          </Button>

          <p className="mt-4 text-[13px] leading-[1.5] text-[#ADADAA] md:text-[14px]">
            A 30-minute walkthrough based on your current gallery workflow.
          </p>
        </div>
      </section>

      <footer id="contact" className="bg-[#111110] text-white">
        <div className="px-4 md:px-6">
          <div className="mx-auto max-w-7xl py-14 md:py-20">
            <div className="grid gap-14 md:grid-cols-[minmax(240px,1fr)_minmax(0,1.5fr)] md:gap-20 lg:gap-28">
              <div>
                <a href="/" className="font-display text-[18px] tracking-[-0.025em] text-white">
                  Vitreen
                </a>
                <p className="mt-5 max-w-[23rem] text-[14px] leading-[1.65] text-[#ADADAA]">
                  Sales tools for contemporary galleries — built around your inventory, working in
                  Gmail and WhatsApp.
                </p>
              </div>

              <nav
                aria-label="Footer"
                className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
              >
                {FOOTER_COLUMNS.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-[12px] font-medium text-[#6B6A67]">{column.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => {
                        const isExternal = link.href.startsWith("https://forart.world");
                        return (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={"opensContact" in link ? openContact : undefined}
                              className="text-[14px] leading-snug text-[#D5D5D2] transition-colors duration-200 hover:text-white"
                            >
                              {link.label}
                              {isExternal ? (
                                <span aria-hidden="true" className="ml-1">
                                  ↗
                                </span>
                              ) : null}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            <div className="mt-16 flex flex-col gap-3 pt-6 text-[12px] text-[#6B6A67] sm:flex-row sm:items-center sm:justify-between md:mt-20">
              <p>© 2026 Vitreen</p>
              <div className="flex items-center gap-4">
                <LandingLanguageSwitch lang="en" />
                <p>Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
