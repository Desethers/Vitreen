"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const bgImage = "/allen14.jpg-preview3.jpg";

type GalleryPage = "home" | "exhibitions" | "artists";

const NAV_ITEMS = ["Exhibitions", "Artists", "Fairs", "News", "About"];

function GalleryNavbar({
  page,
  onNavigate,
  dark = false,
}: {
  page: GalleryPage;
  onNavigate: (p: GalleryPage) => void;
  dark?: boolean;
}) {
  const textColor = dark ? "#fff" : "#000";
  const navColor = dark ? "rgba(255,255,255,0.8)" : "#333";
  const activeColor = dark ? "#fff" : "#000";
  const iconStroke = dark ? "rgba(255,255,255,0.6)" : "#555";
  const iconBorder = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-10 pt-5 pb-4">
      <span
        className="font-medium uppercase cursor-pointer"
        style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: textColor }}
        onClick={() => onNavigate("home")}
      >
        Galerie
      </span>
      <div className="flex items-center gap-6">
        <div className="flex gap-6" style={{ fontSize: "0.62rem", color: navColor }}>
          {NAV_ITEMS.map((n) => {
            const isActive =
              (n === "Exhibitions" && page === "exhibitions") ||
              (n === "Artists" && page === "artists");
            return (
              <span
                key={n}
                className="cursor-pointer transition-all"
                style={{
                  color: isActive ? activeColor : navColor,
                  fontWeight: isActive ? 500 : 400,
                  borderBottom: isActive ? `1px solid ${activeColor}` : "none",
                  paddingBottom: isActive ? "1px" : "0",
                }}
                onClick={() => {
                  if (n === "Exhibitions") onNavigate("exhibitions");
                  else if (n === "Artists") onNavigate("artists");
                }}
              >
                {n}
              </span>
            );
          })}
        </div>
        <div
          className="rounded-full flex items-center justify-center shrink-0"
          style={{ width: 22, height: 22, border: `1px solid ${iconBorder}` }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HomeView({ onNavigate }: { onNavigate: (p: GalleryPage) => void }) {
  return (
    <div className="w-full h-full relative font-sans overflow-hidden bg-[#f5f3f0]">
      <img src="/exhibition page/Exhibition1.png" alt="" className="w-full h-full object-cover" />
      <GalleryNavbar page="home" onNavigate={onNavigate} />
      <div
        className="absolute bottom-0 left-0 right-0 px-10 pb-8 pt-28"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
      >
        <p className="uppercase tracking-[0.18em] text-white/70 mb-1" style={{ fontSize: "0.5rem" }}>
          Paris
        </p>
        <h1 className="font-normal text-white leading-[1.05]" style={{ fontSize: "1.9rem" }}>
          Sun Dog
        </h1>
        <p className="italic text-white/90 leading-[1.15] -mt-0.5" style={{ fontSize: "1.4rem" }}>
          Your friends
        </p>
        <p className="text-white/55 mt-1.5" style={{ fontSize: "0.58rem" }}>
          Feb 12 — Mar 22, 2026
        </p>
        <button
          className="mt-3 border border-white/40 rounded-full px-4 py-1 text-white"
          style={{ fontSize: "0.58rem" }}
          onClick={() => onNavigate("exhibitions")}
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

function ExhibitionsView({ onNavigate }: { onNavigate: (p: GalleryPage) => void }) {
  const [tab, setTab] = useState<"current" | "upcoming" | "past">("current");

  const exhibitions = {
    current: [
      { img: "/exhibition page/Exhibition1.png", title: "Sun Dog", subtitle: "Your friends", dates: "Feb 12 — Mar 22, 2026" },
      { img: "/exhibition page/Exhibition2.png", title: "Claire Tabouret", subtitle: "Night Garden", dates: "Jan 8 — Feb 5, 2026" },
    ],
    upcoming: [
      { img: "/exhibition page/painting-01.png", title: "Rashid Johnson", subtitle: "Anxious Men", dates: "Apr 3 — May 17, 2026" },
      { img: "/exhibition page/painting-02.png", title: "Nina Beier", subtitle: "Soft Power", dates: "May 28 — Jul 4, 2026" },
    ],
    past: [
      { img: "/exhibition page/Exhibition6.png", title: "Kehinde Wiley", subtitle: "New Republic", dates: "Oct 2 — Nov 30, 2025" },
      { img: "/exhibition page/Exhibition8.png", title: "Loie Hollowell", subtitle: "Point of Entry", dates: "Aug 14 — Sep 20, 2025" },
    ],
  };

  const shown = exhibitions[tab];

  return (
    <div className="w-full h-full relative font-sans bg-white overflow-hidden flex flex-col">
      <GalleryNavbar page="exhibitions" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden pt-[3.2rem]">
        {/* Tabs */}
        <div className="flex items-center gap-2 px-10 pt-4 pb-3">
          {(["current", "upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="rounded-full transition-all"
              style={{
                fontSize: "0.55rem",
                padding: "3px 10px",
                background: tab === t ? "#111110" : "transparent",
                color: tab === t ? "#fff" : "#6B6A67",
                border: tab === t ? "none" : "1px solid #E8E8E6",
                fontWeight: tab === t ? 500 : 400,
                textTransform: "capitalize",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <p className="px-10 uppercase tracking-[0.18em] text-[#ADADAA] mb-3" style={{ fontSize: "0.45rem" }}>
          {tab} exhibitions
        </p>

        {/* Exhibition list */}
        <div className="flex-1 overflow-hidden px-10 flex flex-col gap-4">
          {shown.map((ex, i) => (
            <div key={i} className="flex flex-col gap-1.5 cursor-pointer group">
              <div className="overflow-hidden rounded-sm" style={{ aspectRatio: "16/7" }}>
                <img
                  src={ex.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div>
                <p className="font-normal leading-tight" style={{ fontSize: "0.75rem", color: "#111110" }}>
                  {ex.title}
                </p>
                <p className="italic leading-tight" style={{ fontSize: "0.6rem", color: "#111110" }}>
                  {ex.subtitle}
                </p>
                <p className="uppercase tracking-[0.1em] mt-0.5" style={{ fontSize: "0.4rem", color: "#ADADAA" }}>
                  {ex.dates}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtistsView({ onNavigate }: { onNavigate: (p: GalleryPage) => void }) {
  const artists = [
    { img: "/artist page/sundog.png", name: "Sun Dog", origin: "Oklahoma, USA" },
    { img: "/artworks/painting-03.jpg", name: "Claire Tabouret", origin: "Paris, France" },
    { img: "/artworks/painting-05.jpg", name: "Rashid Johnson", origin: "Chicago, USA" },
    { img: "/artworks/painting-07.jpg", name: "Nina Beier", origin: "Copenhagen, DK" },
    { img: "/artworks/painting-04.jpg", name: "Loie Hollowell", origin: "Woodland, USA" },
    { img: "/artworks/painting-08.jpg", name: "Kehinde Wiley", origin: "Los Angeles, USA" },
  ];

  return (
    <div className="w-full h-full relative font-sans bg-white overflow-hidden flex flex-col">
      <GalleryNavbar page="artists" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden pt-[3.2rem]">
        <div className="flex items-center justify-between px-10 pt-4 pb-3">
          <p className="uppercase tracking-[0.18em] text-[#ADADAA]" style={{ fontSize: "0.45rem" }}>
            6 artists
          </p>
          <div className="flex gap-3" style={{ fontSize: "0.5rem", color: "#6B6A67" }}>
            <span className="cursor-pointer">A–Z</span>
            <span className="cursor-pointer text-[#111110] font-medium border-b border-[#111110]" style={{ paddingBottom: "1px" }}>
              Recent
            </span>
          </div>
        </div>

        {/* Artist grid */}
        <div className="flex-1 overflow-hidden px-10 grid grid-cols-3 gap-x-4 gap-y-5 content-start">
          {artists.map((a, i) => (
            <div key={i} className="flex flex-col gap-1.5 cursor-pointer group">
              <div className="overflow-hidden rounded-sm bg-[#f5f3f0]" style={{ aspectRatio: "3/4" }}>
                <img
                  src={a.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="font-normal leading-tight" style={{ fontSize: "0.6rem", color: "#111110" }}>
                  {a.name}
                </p>
                <p style={{ fontSize: "0.45rem", color: "#ADADAA" }}>{a.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryHeroMock() {
  const [page, setPage] = useState<GalleryPage>("home");

  return (
    <div className="w-full h-full relative font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {page === "home" && <HomeView onNavigate={setPage} />}
          {page === "exhibitions" && <ExhibitionsView onNavigate={setPage} />}
          {page === "artists" && <ArtistsView onNavigate={setPage} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type Audience = {
  label: string;
  title: string;
  description: string;
  features: string[];
  video?: string;
  mock?: React.ComponentType;
};

const audiences: Audience[] = [
  {
    label: "Galeries",
    title: "Une vitrine à la hauteur de votre programme.",
    description:
      "Présentez vos artistes, archivez vos expositions, gérez votre catalogue en ligne — sans compétences techniques.",
    features: [
      "Catalogue d'œuvres",
      "Pages artistes",
      "Archives d'expositions",
      "Formulaire de contact",
    ],
    mock: GalleryHeroMock,
  },
  {
    label: "Artistes",
    title: "Votre œuvre mérite un espace à elle.",
    description:
      "Un portfolio conçu pour vous — biographie, CV d'exposition, séries d'œuvres — mis à jour par vous, sans intermédiaire.",
    features: [
      "Portfolio en ligne",
      "Séries et œuvres",
      "CV d'exposition",
      "Prise de contact directe",
    ],
    video: "/demo-vitreen.mp4",
  },
  {
    label: "Art Advisors",
    title: "Partagez des sélections, pas des fichiers.",
    description:
      "Présentez vos recommandations à vos clients dans un espace professionnel, confidentiel et facile à naviguer.",
    features: [
      "Partage de sélections",
      "Espaces clients",
      "Fiches d'œuvres détaillées",
      "Interface confidentielle",
    ],
    video: "/demo-vitreen.mp4",
  },
  {
    label: "Collection Privée",
    title: "Votre collection, organisée et accessible.",
    description:
      "Centralisez l'ensemble de vos œuvres dans un espace privé : fiches, documents, historique — tout en un lieu.",
    features: [
      "Inventaire complet",
      "Fiches détaillées",
      "Documents associés",
      "Accès sécurisé",
    ],
    video: "/demo-vitreen.mp4",
  },
];

export default function Audiences() {
  const [active, setActive] = useState(0);
  const current = audiences[active];

  const handleVideoEnd = useCallback(() => {
    setActive((prev) => (prev + 1) % audiences.length);
  }, []);

  return (
    <section className="py-6 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {audiences.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setActive(i)}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                style={
                  i === active
                    ? { background: "#111110", color: "#fff", fontWeight: 500, letterSpacing: "-0.01em" }
                    : { border: "1px solid #E8E8E6", color: "#6B6A67", background: "transparent", letterSpacing: "-0.01em" }
                }
                onMouseEnter={(e) => {
                  if (i !== active) {
                    e.currentTarget.style.borderColor = "#111110";
                    e.currentTarget.style.color = "#111110";
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== active) {
                    e.currentTarget.style.borderColor = "#E8E8E6";
                    e.currentTarget.style.color = "#6B6A67";
                  }
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="rounded-2xl p-4 md:px-28 md:py-14"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "140%",
            backgroundPosition: "center 40%",
          }}
        >
          <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "2922 / 1590" }}
          >
            {current.mock ? (
              <current.mock />
            ) : (
              <video
                key={active}
                src={current.video}
                autoPlay
                muted
                playsInline
                loop
                onEnded={handleVideoEnd}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
