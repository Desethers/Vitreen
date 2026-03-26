"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const INTERVAL = 5000;

const steps = [
  {
    number: 1,
    action: "Ajoutez une œuvre",
    result:
      "Remplissez un formulaire simple : titre, artiste, image. Publiez en un clic depuis votre espace privé.",
    status: "Œuvre publiée avec succès",
  },
  {
    number: 2,
    action: "Votre site se met à jour",
    result:
      "L'œuvre apparaît instantanément sur votre site. Pas de code, pas d'intervention technique — c'est automatique.",
    status: "Site mis à jour en temps réel",
  },
  {
    number: 3,
    action: "Partagez & Convertissez",
    result:
      "Envoyez un lien public, ouvrez un Viewing Room privé ou notifiez vos collectionneurs par email. Les demandes arrivent directement.",
    status: "3 canaux de diffusion actifs",
  },
];

/* ───── Visual mocks per step ───── */

function StepVisual({ step }: { step: number }) {
  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#FAFAF9] border border-[#E8E8E6] overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && <AdminMock key="admin" />}
        {step === 1 && <LiveSiteMock key="live" />}
        {step === 2 && <ShareMock key="share" />}
      </AnimatePresence>
    </div>
  );
}

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
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-6 h-6 rounded-md bg-[#111110] flex items-center justify-center">
          <span className="text-white text-[8px] font-bold tracking-wider">V</span>
        </div>
        <span className="text-[11px] font-medium text-[#111110] tracking-[-0.01em]">
          Mon espace galerie
        </span>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
            <span className="text-[10px] text-[#6B6A67]">En ligne</span>
          </div>
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
        <div className="flex-1 bg-white rounded-xl border border-[#E8E8E6] p-4 md:p-5 flex flex-col gap-3">
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
      <div className="flex-1 bg-white rounded-xl border border-[#E8E8E6] overflow-hidden flex flex-col">
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
            className="flex-1 bg-[#F7F7F5] rounded-lg flex items-center justify-center"
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

/* Step 3 — Sharing channels */
function ShareMock() {
  const channels = [
    {
      label: "Lien public",
      desc: "galerie-fontaine.com/oeuvres/composition-no-7",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      label: "Viewing Room privé",
      desc: "Accessible sur invitation uniquement",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      label: "Email collectionneurs",
      desc: "3 collectionneurs ciblés notifiés",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 p-5 md:p-6 flex flex-col"
    >
      <div className="text-[12px] font-medium text-[#111110] mb-1">
        Diffuser l&apos;œuvre
      </div>
      <div className="text-[10px] text-[#ADADAA] mb-5">
        Composition No. 7 — Claire Fontaine
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.4, ease }}
            className="flex items-center gap-3.5 bg-white rounded-xl border border-[#E8E8E6] px-4 py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#F7F7F5] flex items-center justify-center text-[#111110] flex-shrink-0">
              {ch.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-[#111110]">
                {ch.label}
              </div>
              <div className="text-[10px] text-[#ADADAA] truncate">
                {ch.desc}
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.3, ease }}
              className="w-6 h-6 rounded-full bg-[#111110] flex items-center justify-center flex-shrink-0"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-4 flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
        <span className="text-[10px] text-[#6B6A67]">
          3 canaux actifs — diffusion en cours
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ───── Main component ───── */

export default function Stepper() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-xl">
            Publier du contenu. Sans effort.
          </h2>
          <p className="mt-1 text-[#6B6A67] text-[26px] font-normal leading-[1.3] tracking-[-0.02em] max-w-lg">
            Vous publiez en autonomie. Ajoutez vos œuvres, elles apparaissent instantanément sur votre site.
          </p>
        </motion.div>

        {/* Stepper + Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left: step list */}
          <div
            className="flex flex-col gap-3 md:max-w-md"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.number}
                  onClick={() => setActive(i)}
                  className={`relative text-left w-full rounded-xl px-5 py-4 transition-all duration-300 ${
                    isActive
                      ? "bg-white border border-[#E8E8E6] shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
                      : "border border-transparent hover:bg-[#FAFAF9]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <div
                      className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#111110] text-white"
                          : "bg-[#F0F0EE] text-[#ADADAA]"
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Text */}
                    <div className="pt-0.5 flex-1 min-w-0">
                      <p
                        className={`text-[14px] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#111110]" : "text-[#6B6A67]"
                        }`}
                      >
                        {step.action}
                      </p>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="text-[#6B6A67] text-[13px] leading-[1.55] mt-1.5 overflow-hidden"
                          >
                            {step.result}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Progress bar */}
                      {isActive && !paused && (
                        <div className="mt-3 h-[2px] bg-[#F0F0EE] rounded-full overflow-hidden">
                          <motion.div
                            key={`progress-${active}`}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: INTERVAL / 1000,
                              ease: "linear",
                            }}
                            className="h-full bg-[#111110] rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Bottom status */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`status-${active}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 mt-3 px-5"
              >
                <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                <span className="text-[11px] text-[#6B6A67]">
                  {steps[active].status}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: visual mock — square container */}
          <div className="aspect-square max-h-[520px]">
            <StepVisual step={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
