"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const INTERVAL = 4500;

/* Step 1 — Branded admin interface */
function AdminMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 p-5 md:p-6 flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2.5 mb-3 md:mb-5">
        <div className="w-6 h-6 rounded-md bg-[#111110] flex items-center justify-center">
          <span className="text-white text-[8px] font-bold tracking-wider">V</span>
        </div>
        <span className="text-[11px] font-medium text-[#111110] tracking-[-0.01em]">
          Mon espace galerie
        </span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[10px] text-[#6B6A67]">En ligne</span>
          <div className="w-6 h-6 rounded-full bg-[#E8E8E6]" />
        </div>
      </div>

      {/* Sidebar + Form */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-32 flex-col gap-0.5">
          {[
            { label: "Œuvres", active: true },
            { label: "Artistes", active: false },
            { label: "Expositions", active: false },
            { label: "Viewing Rooms", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`text-[11px] px-2.5 py-1.5 rounded-md ${
                item.active
                  ? "bg-[#111110] text-white font-medium"
                  : "text-[#6B6A67]"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-[10px] border border-[#E8E8E6] p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#111110]">
              Nouvelle œuvre
            </span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-[10px] px-2.5 py-1 rounded-full bg-[#111110] text-white font-medium cursor-pointer"
            >
              Publier
            </motion.div>
          </div>

          <div className="space-y-2.5">
            {/* Title field */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#ADADAA] mb-1">
                Titre
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.35, duration: 0.5, ease }}
                className="h-7 bg-[#F7F7F5] rounded-md border border-[#E8E8E6] flex items-center px-2.5 overflow-hidden"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-[11px] text-[#111110] whitespace-nowrap"
                >
                  Composition No. 7, 2024
                </motion.span>
              </motion.div>
            </div>

            {/* Artist field */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#ADADAA] mb-1">
                Artiste
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ delay: 0.55, duration: 0.45, ease }}
                className="h-7 bg-[#F7F7F5] rounded-md border border-[#E8E8E6] flex items-center px-2.5 overflow-hidden"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="text-[11px] text-[#111110] whitespace-nowrap"
                >
                  Claire Fontaine
                </motion.span>
              </motion.div>
            </div>

            {/* Image upload */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#ADADAA] mb-1">
                Image
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="h-[72px] bg-[#F7F7F5] rounded-md border border-dashed border-[#CCCCC9] flex items-center justify-center gap-2"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ADADAA"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-[10px] text-[#ADADAA]">
                  Glissez ou cliquez
                </span>
              </motion.div>
            </div>

            {/* Price + dimensions row */}
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="text-[9px] uppercase tracking-[0.1em] text-[#ADADAA] mb-1">
                  Prix
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 0.35, ease }}
                  className="h-7 bg-[#F7F7F5] rounded-md border border-[#E8E8E6] flex items-center px-2.5 overflow-hidden"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-[11px] text-[#111110] whitespace-nowrap"
                  >
                    Sur demande
                  </motion.span>
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="text-[9px] uppercase tracking-[0.1em] text-[#ADADAA] mb-1">
                  Dimensions
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.0, duration: 0.35, ease }}
                  className="h-7 bg-[#F7F7F5] rounded-md border border-[#E8E8E6] flex items-center px-2.5 overflow-hidden"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-[11px] text-[#111110] whitespace-nowrap"
                  >
                    120 × 80 cm
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Step 2 — Live site preview showing the artwork */
function LiveSiteMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 p-5 md:p-6 flex flex-col"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E6]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E6]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E6]" />
        </div>
        <div className="flex-1 h-6 bg-white rounded-md border border-[#E8E8E6] flex items-center px-3">
          <span className="text-[9px] text-[#ADADAA]">
            galerie-fontaine.com/oeuvres/composition-no-7
          </span>
        </div>
      </div>

      {/* Site preview */}
      <div className="flex-1 bg-white rounded-[10px] border border-[#E8E8E6] overflow-hidden flex flex-col">
        {/* Nav */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F0F0EE]">
          <span className="text-[11px] font-medium text-[#111110] tracking-[-0.01em]">
            Galerie Fontaine
          </span>
          <div className="flex gap-4">
            {["Œuvres", "Artistes", "Expositions", "Contact"].map((item) => (
              <span key={item} className="text-[9px] text-[#6B6A67]">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Artwork content */}
        <div className="flex-1 flex gap-4 p-4">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            className="flex-1 bg-[#F7F7F5] rounded-[10px] flex items-center justify-center"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CCCCC9"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4, ease }}
            className="w-36 md:w-44 flex flex-col gap-2"
          >
            <div>
              <p className="text-[12px] font-medium text-[#111110]">
                Composition No. 7
              </p>
              <p className="text-[10px] text-[#6B6A67]">Claire Fontaine, 2024</p>
            </div>
            <div className="h-px bg-[#F0F0EE]" />
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[9px] text-[#ADADAA]">Technique</span>
                <span className="text-[9px] text-[#6B6A67]">Huile sur toile</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-[#ADADAA]">Dimensions</span>
                <span className="text-[9px] text-[#6B6A67]">120 × 80 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-[#ADADAA]">Prix</span>
                <span className="text-[9px] text-[#6B6A67]">Sur demande</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
              className="mt-auto text-[10px] px-3 py-1.5 rounded-full bg-[#111110] text-white font-medium text-center"
            >
              Demander le prix
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Success notification */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-3 flex items-center gap-2 justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[#4CAF50]"
        />
        <span className="text-[10px] text-[#6B6A67]">
          Visible en ligne — mis à jour il y a 2 secondes
        </span>
      </motion.div>
    </motion.div>
  );
}

/* Step 3 — Email send to collector */
function ShareMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 p-5 md:p-6 flex flex-col"
    >
      <div className="text-[12px] font-medium text-[#111110] mb-1">Nouveau message</div>
      <div className="text-[10px] text-[#ADADAA] mb-4">Notifier un collectionneur</div>

      {/* Email card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease }}
        className="flex-1 bg-white rounded-[10px] border border-[#E8E8E6] overflow-hidden flex flex-col"
      >
        {/* To / From fields */}
        <div className="border-b border-[#F0F0EE] px-3.5 py-2 flex items-center gap-2">
          <span className="text-[9px] text-[#ADADAA] w-8">De</span>
          <span className="text-[10px] text-[#6B6A67]">galerie@fontaine.com</span>
        </div>
        <div className="border-b border-[#F0F0EE] px-3.5 py-2 flex items-center gap-2">
          <span className="text-[9px] text-[#ADADAA] w-8">À</span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease }}
            className="text-[10px] text-[#111110] overflow-hidden whitespace-nowrap"
          >
            marc.durand@collection.fr
          </motion.span>
        </div>
        <div className="border-b border-[#F0F0EE] px-3.5 py-2 flex items-center gap-2">
          <span className="text-[9px] text-[#ADADAA] w-8">Objet</span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.45, ease }}
            className="text-[10px] text-[#111110] overflow-hidden whitespace-nowrap"
          >
            Composition No. 7 — disponible
          </motion.span>
        </div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="flex-1 px-3.5 py-3 flex flex-col gap-2.5"
        >
          {/* Artwork preview */}
          <div className="flex gap-2.5 items-center p-2 rounded-[10px] bg-[#F7F7F5]">
            <div className="w-10 h-10 rounded-md bg-[#D8D4CE] flex-shrink-0" />
            <div>
              <div className="text-[10px] font-medium text-[#111110]">Composition No. 7, 2024</div>
              <div className="text-[9px] text-[#ADADAA]">Claire Fontaine · Sur demande</div>
            </div>
          </div>
          {/* Text lines */}
          <div className="space-y-1.5">
            <div className="h-[6px] bg-[#F0F0EE] rounded-full w-full" />
            <div className="h-[6px] bg-[#F0F0EE] rounded-full w-4/5" />
            <div className="h-[6px] bg-[#F0F0EE] rounded-full w-3/5" />
          </div>
        </motion.div>

        {/* Send button */}
        <div className="px-3.5 py-3 border-t border-[#F0F0EE]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <motion.div
              initial={{ width: 60 }}
              animate={{ width: 90 }}
              transition={{ delay: 1.4, duration: 0.4, ease }}
              className="h-6 rounded-full bg-[#111110] flex items-center justify-center gap-1.5 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1.6, duration: 0.2 }}
                className="flex items-center gap-1.5 absolute"
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                </svg>
                <span className="text-[9px] text-white font-medium">Envoyer</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.3 }}
                className="flex items-center gap-1.5"
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-[9px] text-white font-medium">Envoyé</span>
              </motion.div>
            </motion.div>
            <span className="text-[9px] text-[#ADADAA]">1 sur 3 collectionneurs</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───── Main component ───── */

const MOCKS = [AdminMock, LiveSiteMock, ShareMock];

const STEP_DATA = [
  { number: 1, title: "Ajoutez une œuvre", desc: "Formulaire simple, publié en un clic." },
  { number: 2, title: "Site mis à jour", desc: "L'œuvre apparaît instantanément, sans code." },
  { number: 3, title: "Partagez", desc: "Lien, Viewing Room privé, email collectionneurs." },
];

const STEP_POSITIONS: React.CSSProperties[] = [
  { top: 75, right: 40 },
  { top: "calc(50% - 20px)", right: 40 },
  { bottom: 190, left: 40 },
];

export default function Stepper() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const advance = useCallback(() => {
    setActive((prev) => {
      const next = (prev + 1) % 3;
      if (next === 0) {
        setRevealed(new Set([0]));
      } else {
        setRevealed((r) => new Set([...r, next]));
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const Mock = MOCKS[active];

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="rounded-[5px] overflow-hidden bg-[#F9FAFD]"
          style={{ border: "0.1px solid #D4D4D0" }}
        >
          <div className="grid md:grid-cols-[2fr_1fr]">
            {/* Left: B&W background + large card + 3 small step overlay cards — order-2 sur mobile pour placer le texte au-dessus */}
            <div className="relative order-2 overflow-hidden h-[500px] md:order-none md:min-h-[720px]">
              {/* Fond photo */}
              <div
                className="absolute inset-[10px] md:inset-[20px] rounded-[5px] bg-cover bg-center"
                style={{ backgroundImage: "url('/colin de land.jpg')" }}
              />

              {/* Large main card — cycles between mocks */}
              <div
                className="absolute bg-white rounded-[10px] overflow-hidden"
                style={{ top: isMobile ? 20 : 90, bottom: isMobile ? 20 : 90, left: isMobile ? "8%" : "18%", right: isMobile ? "8%" : "18%", zIndex: 10, boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Mock />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3 small step cards — always visible, active one highlighted */}
              {STEP_DATA.map((step, i) => {
                const isActive = active === i;
                const isRevealed = revealed.has(i);
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isRevealed ? 1 : 0,
                      scale: isRevealed ? 1 : 0.9,
                      boxShadow: isActive
                        ? "0 8px 24px rgba(0,0,0,0.14)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                    transition={{ duration: 0.4, ease }}
                    className="hidden md:block absolute bg-white rounded-[10px] px-3 py-2.5"
                    style={{ ...STEP_POSITIONS[i], zIndex: 20, maxWidth: 210 }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors duration-300 ${
                          isActive ? "bg-[#111110] text-white" : "bg-[#F0F0EE] text-[#ADADAA]"
                        }`}
                      >
                        {step.number}
                      </div>
                      <span
                        className={`text-[11px] font-medium leading-tight transition-colors duration-300 ${
                          isActive ? "text-[#111110]" : "text-[#ADADAA]"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[10px] text-[#ADADAA] leading-[1.45] mt-1.5 pl-7 overflow-hidden"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile steps list */}
            <div className="order-3 block md:hidden px-[15px] py-4 md:order-none" style={{ borderTop: "0.5px solid #E8E8E6" }}>
              {STEP_DATA.map((step, i) => {
                const isActive = active === i;
                return (
                  <div key={step.number} className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-[#F4F4F2]" : ""}`}>
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 transition-colors duration-300 ${isActive ? "bg-[#111110] text-white" : "bg-[#F0F0EE] text-[#ADADAA]"}`}>
                      {step.number}
                    </div>
                    <div>
                      <p className={`text-[13px] font-medium leading-tight transition-colors duration-300 ${isActive ? "text-[#111110]" : "text-[#ADADAA]"}`}>
                        {step.title}
                      </p>
                      {isActive && (
                        <p className="text-[12px] text-[#6B6A67] leading-[1.45] mt-0.5">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: text — order-1 sur mobile = au-dessus de l’anim */}
            <div className="order-1 flex flex-col justify-center px-[15px] py-6 md:order-none md:px-10 md:py-12">
              <h3 className="font-display text-[14px] md:text-[18px] font-normal text-[#111110] tracking-[-0.02em] mb-1 md:mb-3">
                Publier du contenu — sans effort
              </h3>
              <p className="text-[#6B6A67] text-[14px] md:text-[18px] font-normal leading-[1.3] tracking-[-0.02em]">
                Vous publiez en autonomie. Ajoutez vos œuvres, elles apparaissent instantanément sur votre site.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
