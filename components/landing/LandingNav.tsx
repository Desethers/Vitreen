"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";

const ease = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/** Existing /tools/* pages, surfaced under "Tools" instead of the retired Gallery OS nav. */
const TOOLS_ITEMS = [
  {
    title: "Artwork Inventory",
    desc: "Your artworks, artists and records in one place.",
    href: "/tools/artwork-inventory",
  },
  {
    title: "Sales Assistant",
    desc: "Gmail add-in, WhatsApp tool, AI-drafted replies.",
    href: "/tools/sales-assistant",
  },
  {
    title: "Viewing Rooms",
    desc: "Curated selections, shared as a link or PDF.",
    href: "/tools/viewing-rooms",
  },
];

const TOOLS_FEATURED = {
  eyebrow: "Private selections",
  title: "Viewing Rooms",
  desc: "Build and share private viewing rooms from your artwork records.",
  cta: "See more",
  image: "/screenshot-viewingroom.jpg",
  href: "/tools/viewing-rooms",
};

/** Same four personas as WhoVitreenIsFor on the home page. */
const SOLUTIONS_ITEMS = [
  {
    title: "Art Galleries",
    desc: "Artwork inventory, collector replies and private selections.",
    href: "/solutions/galleries",
  },
  {
    title: "Design Galleries",
    desc: "Pieces, availability and client presentations.",
    href: "/solutions/galleries",
  },
  {
    title: "Art Advisors",
    desc: "Private selections and client-ready artwork information.",
    href: "/solutions/advisors",
  },
  {
    title: "Artist Studios",
    desc: "Archive, artwork material and collector presentations.",
    href: "/solutions/artists",
  },
];

const SOLUTIONS_FEATURED = {
  eyebrow: "Who it's for",
  title: "Art Galleries",
  desc: "Artwork inventory, collector replies and private selections, built around your gallery.",
  cta: "See more",
  image: "/gallery-screen2.png",
  href: "/solutions/galleries",
};

export const openContact = () => window.dispatchEvent(new Event("open-contact-modal"));

/**
 * Minimal header for the landing: logo, in-page anchors, a "Tools" dropdown
 * onto the existing /tools/* pages, and one CTA.
 */
export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

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
          scrolled || toolsOpen || solutionsOpen ? "border-[#E8E8E6]" : "border-transparent"
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
            <div
              onMouseEnter={() => {
                setToolsOpen(true);
                setSolutionsOpen(false);
              }}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(true);
                  setSolutionsOpen(false);
                }}
                aria-expanded={toolsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Tools
              </button>
            </div>
            <div
              onMouseEnter={() => {
                setSolutionsOpen(true);
                setToolsOpen(false);
              }}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setSolutionsOpen(true);
                  setToolsOpen(false);
                }}
                aria-expanded={solutionsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Solutions
              </button>
            </div>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button size="sm" onClick={openContact} className="shrink-0 !px-3 !py-[7px] !text-[12px]">
            Book a demo
          </Button>
        </div>

        <AnimatePresence>
          {toolsOpen && (
            <motion.div
              key="tools-menu"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.32, ease }}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
              className="fixed left-0 right-0 top-[52px] z-40 hidden overflow-hidden md:block"
            >
              <div className="w-full border-b border-[#E8E8E6] bg-white px-8 py-8">
                <div className="mx-auto grid max-w-7xl grid-cols-[1fr_minmax(0,32rem)] gap-x-12">
                  <div>
                    <span className="text-[12px] text-[#ADADAA]">Tools</span>
                    <div className="mt-4 grid grid-cols-1 gap-y-1">
                      {TOOLS_ITEMS.map((item, index) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setToolsOpen(false)}
                          onMouseEnter={() => setActiveToolIndex(index)}
                          onFocus={() => setActiveToolIndex(index)}
                          className={`group -mx-[42px] block w-[calc(100%-150px)] rounded px-[42px] py-2 transition-colors duration-200 ${
                            activeToolIndex === index ? "bg-[#F5F5F3]" : "hover:bg-[#F8F8F6]"
                          }`}
                        >
                          <span className="font-display text-[15px] text-[#111110] transition-colors group-hover:text-[#6B6A67]">
                            {item.title}
                          </span>
                          <p className="mt-0.5 max-w-xl text-[12px] leading-snug text-[#6B6A67]">
                            {item.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href={TOOLS_FEATURED.href}
                    onClick={() => setToolsOpen(false)}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#111110]">
                      <div
                        className="absolute inset-0 bg-cover bg-[center_42%]"
                        style={{ backgroundImage: `url(${TOOLS_FEATURED.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <h4 className="font-display text-[17px]">{TOOLS_FEATURED.title}</h4>
                        <p className="mt-1 max-w-sm text-[12px] leading-snug text-white/75">
                          {TOOLS_FEATURED.desc}
                        </p>
                        <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-white">
                          {TOOLS_FEATURED.cta}
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {solutionsOpen && (
            <motion.div
              key="solutions-menu"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.32, ease }}
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
              className="fixed left-0 right-0 top-[52px] z-40 hidden overflow-hidden md:block"
            >
              <div className="w-full border-b border-[#E8E8E6] bg-white px-8 py-8">
                <div className="mx-auto grid max-w-7xl grid-cols-[1fr_minmax(0,32rem)] gap-x-12">
                  <div>
                    <p className="text-[12px] text-[#ADADAA]">Solutions</p>
                    <div className="mt-4 grid grid-cols-1 gap-y-1">
                      {SOLUTIONS_ITEMS.map((item, index) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setSolutionsOpen(false)}
                          onMouseEnter={() => setActiveSolutionIndex(index)}
                          onFocus={() => setActiveSolutionIndex(index)}
                          className={`group -mx-[42px] block w-[calc(100%-150px)] rounded px-[42px] py-2 transition-colors duration-200 ${
                            activeSolutionIndex === index ? "bg-[#F5F5F3]" : "hover:bg-[#F8F8F6]"
                          }`}
                        >
                          <span className="font-display text-[15px] text-[#111110] transition-colors group-hover:text-[#6B6A67]">
                            {item.title}
                          </span>
                          <p className="mt-0.5 max-w-xl text-[12px] leading-snug text-[#6B6A67]">
                            {item.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href={SOLUTIONS_FEATURED.href}
                    onClick={() => setSolutionsOpen(false)}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#111110]">
                      <div
                        className="absolute inset-0 bg-cover bg-[center_42%]"
                        style={{ backgroundImage: `url(${SOLUTIONS_FEATURED.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <h4 className="font-display text-[17px]">{SOLUTIONS_FEATURED.title}</h4>
                        <p className="mt-1 max-w-sm text-[12px] leading-snug text-white/75">
                          {SOLUTIONS_FEATURED.desc}
                        </p>
                        <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-white">
                          {SOLUTIONS_FEATURED.cta}
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ContactModal />
    </>
  );
}
