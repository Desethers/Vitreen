"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

type Item = { title: string; href: string };

/**
 * The phone menu: a burger in the header that opens a full-height panel under
 * it. Sections as plain lists (no accordions), the demo button at the bottom.
 */
export default function LandingMobileMenu({
  groups,
  links,
  cta,
  label,
}: {
  groups: { title: string; items: Item[] }[];
  links: { label: string; href: string }[];
  cta: string;
  /** Accessible name of the burger. */
  label: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="relative block h-2 w-[18px]">
          <span
            className={`absolute left-0 h-[1.5px] w-full rounded bg-[#111110] transition-all duration-300 ${
              open ? "top-[3px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.5px] w-full rounded bg-[#111110] transition-all duration-300 ${
              open ? "top-[3px] -rotate-45" : "top-[6px]"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[52px] z-40 flex flex-col overflow-y-auto bg-white px-4 pb-8 pt-6 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {groups.map((g) => (
                <div key={g.title}>
                  <p className="text-[12px] text-[#ADADAA]">{g.title}</p>
                  <ul className="mt-2 flex flex-col">
                    {g.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 font-display text-[22px] tracking-[-0.02em] text-[#111110]"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="flex flex-col border-t border-[#E8E8E6] pt-4">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-[22px] tracking-[-0.02em] text-[#111110]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Button
              size="lg"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("open-contact-modal"));
              }}
              className="mt-auto w-full"
            >
              {cta}
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
