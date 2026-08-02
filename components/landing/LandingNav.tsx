"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
];

export const openContact = () => window.dispatchEvent(new Event("open-contact-modal"));

/**
 * Minimal header for the landing: logo, three in-page anchors and one CTA.
 * No mega-menu — the anchors are hidden below md rather than folded into a
 * burger, since there are only three and the CTA stays reachable.
 */
export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b-[0.5px] bg-white px-4 py-2 transition-[border-color] duration-200 md:px-6 ${
          scrolled ? "border-[#E8E8E6]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-9 w-full max-w-7xl items-center justify-between">
          <a
            href="/"
            className="font-display text-[15px] tracking-tight text-[#111110] md:text-base"
          >
            Vitreen
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#6B6A67] transition-colors duration-200 hover:text-[#111110]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button size="sm" onClick={openContact} className="shrink-0 !px-3 !py-[7px] !text-[12px]">
            Book a demo
          </Button>
        </div>
      </header>

      <ContactModal />
    </>
  );
}
