"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang";

export function ExhibitionPageMock({
  isMobile = false,
  onBack,
}: {
  isMobile?: boolean;
  onBack?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile)
    return (
      <div
        ref={scrollRef}
        className="w-full h-full overflow-y-auto bg-white relative"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="font-sans text-[#111110]" style={{ zoom: 0.78 }}>
          {/* Mobile nav */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 rounded-t"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              borderBottom: "0.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <span
              className="font-medium uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}
            >
              Galerie
            </span>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <line
                x1="0"
                y1="1"
                x2="18"
                y2="1"
                stroke="#111110"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="6"
                x2="18"
                y2="6"
                stroke="#111110"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="11"
                x2="18"
                y2="11"
                stroke="#111110"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* Mobile body */}
          <div className="px-5 pt-5 pb-5">
            {onBack && (
              <button
                onClick={onBack}
                className="text-[11px] text-[#888] mb-4 flex items-center gap-1"
              >
                ← Back
              </button>
            )}
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] mb-4">
              <span className="text-[#555] underline underline-offset-2">Exhibitions</span>
              {" — "}Your friends
            </p>
            <div className="text-[17px] font-normal tracking-[-0.03em] leading-[1.1] mb-6">
              Sacha Elron — <em>Your friends</em>
            </div>
            <div
              className="flex flex-col gap-3 mb-6 pb-6"
              style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Artist</p>
                <p className="text-[13px] font-medium text-[#111110]">Sacha Elron</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Dates</p>
                <p className="text-[13px] text-[#333]">Feb 12 — Mar 22, 2026</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Location</p>
                <p className="text-[13px] text-[#333]">Galerie, Paris — Turenne</p>
              </div>
            </div>
            <p className="text-[14px] text-[#333] leading-[1.7] mb-3">
              A presentation of recent paintings and works on paper exploring friendship, memory,
              and shared light.
            </p>
            <p className="text-[14px] text-[#888] leading-[1.7] mb-7">
              Private viewing and availability: contact the gallery.
            </p>
            <div className="flex flex-col gap-2 mb-7">
              <button className="bg-[#111110] text-white rounded-full px-5 py-3 text-[12px] text-center w-full">
                Artwork Inquiry
              </button>
              <button className="border border-[#D8D4CF] text-[#333] rounded-full px-5 py-3 text-[12px] text-center w-full">
                View artist
              </button>
            </div>
            <div
              className="relative rounded overflow-hidden bg-[#E8E4DF] mb-8"
              style={{ height: 300 }}
            >
              <Image
                src="/exhibition page/Exhibition2.png"
                alt="Installation view"
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>

            {/* Exhibition Text */}
            <div className="mb-8 text-center">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-4">
                Exhibition Text
              </p>
              <p className="text-[14px] text-[#555] leading-[1.7]">
                Presented as one continuous sequence, the works below extend the show&apos;s themes
                — friendship, memory, and light — into individual canvases and works on paper.
              </p>
            </div>

            {/* Selected Works */}
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-5">
              Selected Works
            </p>
            <div className="flex flex-col gap-6">
              {[
                {
                  title: "Untitled (Blue)",
                  year: "2025",
                  medium: "Acrylic on canvas",
                  size: "120 × 120 cm",
                  img: "/exhibition page/portrait2.jpg",
                },
                {
                  title: "Untitled (Lavender)",
                  year: "2024",
                  medium: "Oil on canvas",
                  size: "100 × 80 cm",
                  img: "/exhibition page/painting-02.png",
                },
              ].map((work) => (
                <div key={work.title} className="flex flex-col gap-2">
                  <div className="rounded overflow-hidden bg-[#E8E4DF]" style={{ height: 260 }}>
                    <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[13px] font-medium text-[#111110]">
                        {work.title}, {work.year}
                      </p>
                      <p className="text-[12px] text-[#888] italic">{work.medium}</p>
                      <p className="text-[12px] text-[#888]">{work.size}</p>
                    </div>
                    <button className="border border-[#D8D4CF] rounded px-6 py-1.5 text-[12px] text-[#111110] shrink-0">
                      Inquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Quote */}
            <blockquote className="mt-10 mb-4 text-[14px] italic text-[#999] leading-[1.7] text-center">
              &ldquo;Shared light is the simplest form of friendship—what falls on the wall falls on
              us both.&rdquo;
              <footer className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] not-italic">
                Sacha Elron
              </footer>
            </blockquote>
            <p className="mt-4 text-[12px] text-[#ADADAA] underline underline-offset-2 cursor-pointer text-center pb-4">
              All exhibitions
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div
      ref={scrollRef}
      className="w-full h-full overflow-y-auto bg-white relative"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="mock-scale font-sans text-[#111110]">
        {/* Nav — glass pill on scroll */}
        <div
          className="sticky top-0 z-10 flex justify-center"
          style={{
            paddingTop: scrolled ? "0.5rem" : "1.25rem",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            transition: "padding 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="flex items-center justify-between w-full"
            style={{
              maxWidth: scrolled ? "min(800px, calc(100% - 3rem))" : "1280px",
              padding: scrolled ? "0.65rem 1.25rem" : "0.9rem 0",
              gap: scrolled ? "0.75rem" : "1.25rem",
              borderRadius: scrolled ? "4px" : "0",
              background: scrolled
                ? "linear-gradient(135deg, rgba(255,255,255,0.72), rgba(252,250,247,0.65))"
                : "transparent",
              backdropFilter: scrolled
                ? "blur(40px) saturate(2) brightness(1.05) contrast(0.98)"
                : "none",
              WebkitBackdropFilter: scrolled
                ? "blur(40px) saturate(2) brightness(1.05) contrast(0.98)"
                : "none",
              boxShadow: scrolled
                ? "0 8px 48px rgba(0,0,0,.08), 0 2px 16px rgba(0,0,0,.04)"
                : "none",
              transition: "all 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span
              className="font-medium uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#000" }}
            >
              Galerie
            </span>
            <div
              className="flex text-[#555]"
              style={{
                gap: scrolled ? "1rem" : "1.75rem",
                fontSize: "0.82rem",
                transition: "gap 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {["Exhibitions", "Artists", "Fairs", "News", "About"].map((n) => (
                <span
                  key={n}
                  className={
                    n === "Exhibitions"
                      ? "text-[#111110] font-medium"
                      : "hover:underline underline-offset-[3px] cursor-pointer"
                  }
                >
                  {n}
                </span>
              ))}
            </div>
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 26,
                height: 26,
                border: "0.5px solid rgba(0,0,0,0.2)",
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-14 px-10 pt-10 pb-12">
          {/* Sidebar */}
          <div className="w-[200px] shrink-0 flex flex-col gap-5">
            {onBack && (
              <button
                onClick={onBack}
                className="text-[11px] text-[#888] flex items-center gap-1 self-start"
              >
                ← Back
              </button>
            )}
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#ADADAA]">
              <span className="text-[#555] underline underline-offset-2">Exhibitions</span>
              {" — "}Your friends
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Artist</p>
              <p className="text-[13px] font-medium text-[#111110] underline underline-offset-2 cursor-pointer">
                Sacha Elron
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Dates</p>
              <p className="text-[13px] text-[#333]">Feb 12 — Mar 22, 2026</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Location</p>
              <p className="text-[13px] text-[#333]">Galerie, Paris — Turenne</p>
            </div>
            <button className="mt-2 bg-[#111110] text-white rounded-full px-5 py-2.5 text-[12px] text-center">
              Artwork Inquiry
            </button>
            <button className="border border-[#D8D4CF] text-[#333] rounded-full px-5 py-2.5 text-[12px] text-center">
              View artist
            </button>
            <p className="text-[12px] text-[#ADADAA] underline underline-offset-2 cursor-pointer">
              All exhibitions
            </p>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="text-[28px] font-normal tracking-[-0.03em] leading-[1.1] mb-5">
              Sacha Elron — <em>Your friends</em>
            </div>
            <p className="text-[14px] text-[#333] leading-[1.7] max-w-[560px] mb-3">
              A presentation of recent paintings and works on paper exploring friendship, memory,
              and shared light. The exhibition brings together a focused selection of pieces
              conceived as a single environment.
            </p>
            <p className="text-[14px] text-[#333] leading-[1.7] max-w-[560px] mb-3">
              Arranged as a sequence of rooms, the works invite a slow reading: color fields, soft
              gradients, and restrained surfaces echo the quiet of the gallery itself.
            </p>
            <p className="text-[14px] text-[#888] leading-[1.7] max-w-[540px] mb-3">
              Private viewing and availability: contact the gallery.
            </p>
          </div>
        </div>

        {/* Installation view 1 */}
        <div
          className="mx-10 relative rounded overflow-hidden bg-[#E8E4DF]"
          style={{ height: 440 }}
        >
          <Image
            src="/exhibition page/Exhibition2.png"
            alt="Installation view — cool room"
            fill
            className="object-cover"
            sizes="700px"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sacha Elron : <em>Your friends</em>, Galerie, Paris, 2026
        </p>

        {/* Exhibition text */}
        <div className="mx-10 mt-14 mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-4">
            Exhibition Text
          </p>
          <p className="text-[14px] text-[#555] leading-[1.7] max-w-[480px] mx-auto">
            Presented as one continuous sequence, the works below extend the show&apos;s themes —
            friendship, memory, and light — into individual canvases and works on paper.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 border border-[#D8D4CF] rounded-full px-6 py-2.5 text-[12px] text-[#333] transition-all duration-150 hover:bg-[#111110] hover:border-[#111110] hover:text-white"
          >
            read full exhibition text
          </button>
        </div>

        {/* Installation view 2 */}
        <div
          className="mx-10 mt-10 rounded overflow-hidden bg-[#E8E4DF] relative"
          style={{ height: 440 }}
        >
          <Image
            src="/exhibition page/painting-02.png"
            alt="Sacha Elron — Untitled (Yellow)"
            fill
            className="object-contain"
            sizes="900px"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sacha Elron : <em>Your friends</em>, Galerie, Paris, 2026
        </p>

        {/* Artwork detail */}
        <div className="mx-10 mt-14 pb-14 flex gap-8">
          <div className="w-[50%] shrink-0 flex flex-col gap-2">
            <div className="rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 440 }}>
              <Image
                src="/exhibition page/portrait2.jpg"
                alt="Sacha Elron — Untitled (Blue), 2025"
                fill
                className="object-cover"
                sizes="500px"
              />
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-[12px] text-[#888]">Sacha Elron</p>
                <p className="text-[13px] font-medium text-[#111110]">Untitled, 2025</p>
                <p className="text-[12px] text-[#888] italic">Acrylic on canvas</p>
                <p className="text-[12px] text-[#888]">120 × 120 cm</p>
              </div>
              <button className="border border-[#D8D4CF] rounded px-8 py-1.5 text-[12px] text-[#111110] shrink-0 transition-colors duration-150 hover:border-[#111110] hover:text-[#111110]">
                Inquire
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-2 flex-1">
            <blockquote className="text-[15px] italic text-[#999] leading-[1.7] max-w-[280px] text-center transition-colors duration-200 hover:text-[#111110] cursor-default">
              &ldquo;Shared light is the simplest form of friendship—what falls on the wall falls on
              us both.&rdquo;
              <footer className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] not-italic">
                Sacha Elron
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Exhibition text modal */}
        {showModal && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded overflow-y-auto"
              style={{
                maxWidth: 480,
                width: "calc(100% - 48px)",
                maxHeight: "72%",
                padding: "28px 28px 32px",
                scrollbarWidth: "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA]">
                  Exhibition Text
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#ADADAA] hover:text-[#111110] transition-colors leading-none"
                  style={{ fontSize: 18 }}
                >
                  &times;
                </button>
              </div>
              <h2 className="text-[16px] font-normal tracking-[-0.02em] text-[#111110] mb-5">
                Sacha Elron — <em>Your friends</em>
              </h2>
              <div
                className="flex flex-col gap-4"
                style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}
              >
                <p>
                  The works gathered in <em>Your friends</em> do not announce themselves. They
                  arrive quietly — through colour, through stillness, through the peculiar way light
                  describes a surface without explaining it.
                </p>
                <p>
                  Sacha Elron has spent the last three years returning to the same question: what
                  remains of a landscape once it has been absorbed into the body? The paintings in
                  this exhibition are not records of places. They are the residue of looking — the
                  sensation that persists after the eye has moved on.
                </p>
                <p>
                  Working in oil on large-format canvases, he builds each surface through repeated
                  acts of application and erasure. Colours that should not coexist find ways to hold
                  together. Forms that suggest horizon, water, or canopy resist naming. The work
                  hovers in the interval between recognition and abstraction.
                </p>
                <p>
                  <em>Your friends</em> takes its title from a phrase that appeared in a notebook
                  during the making of these paintings. It refers, obliquely, to the things we carry
                  with us without knowing we carry them — the images, the light conditions, the
                  half-remembered atmospheres that constitute a private visual life.
                </p>
                <p>The exhibition presents sixteen works made between 2023 and 2025.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
