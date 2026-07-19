"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const OLD_PRICE = "8 000 €";
const NEW_PRICE = "9 500 €";
// Valeur brute tapée dans le champ prix du dashboard (input numérique réel)
const RECORD_OLD = "8000";
const RECORD_NEW = "9500";

function SurfacePrice({ synced, delay }: { synced: boolean; delay: number }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={synced ? "new" : "old"}
        className="block text-[#18181B]"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3, ease, delay: synced ? delay : 0 }}
      >
        {synced ? NEW_PRICE : OLD_PRICE}
      </motion.span>
    </AnimatePresence>
  );
}

/*
 * Légende d’œuvre partagée par les 3 surfaces de sortie (Website / PDF / Viewing
 * Room). Structure et typo identiques partout pour que la ligne de prix tombe
 * exactement au même Y sur chaque carte — c’est le même artwork record réutilisé.
 */
function ArtworkCaption({ synced, delay }: { synced: boolean; delay: number }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-[#111110]">Sacha Elron</p>
      <p className="text-[11px] text-[#6B6A67]">
        <span className="italic">Evening Field</span>, 2023
      </p>
      <p className="mt-1 truncate text-[10px] leading-[14px] text-[#9A9A97]">
        Acrylic on canvas · 120 × 120 cm
      </p>
      <div className="mt-2 text-[12px] font-semibold">
        <SurfacePrice synced={synced} delay={delay} />
      </div>
    </div>
  );
}

// Surfaces de sortie : en-tête à hauteur fixe + image à hauteur fixe → alignement
const OUTPUT_INTRO = "flex h-[64px] shrink-0";
const OUTPUT_BODY = "flex flex-1 flex-col px-5 pt-3";
const OUTPUT_IMG = "h-[128px] w-full object-cover";

function BleedPanel({ children, address }: { children: ReactNode; address: string }) {
  return (
    <div className="mt-6 min-h-0 flex-1 pb-[20px] pl-[20px]">
      <div className="h-full w-[calc(100%+40px)] overflow-hidden rounded-[12px] border border-[#E4E4E7] bg-white">
        <div className="flex h-10 items-center gap-2 border-b border-[#E8E8E6] bg-white px-4">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3E3E1]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3E3E1]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3E3E1]" />
          </div>
          <div className="ml-2 max-w-[170px] truncate rounded-full bg-[#F3F3F1] px-3 py-1 text-[9px] text-[#6B6A67]">
            {address}
          </div>
        </div>
        <div className="h-[calc(100%-2.5rem)] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/*
 * Réplique fidèle de la fiche œuvre du vrai dashboard Gallery OS :
 * ArtworkForm.tsx (Field/TextInput, pills de statut, champ prix + devise)
 * et ArtworkPublicationBar (barre "Published · The public website is up to date").
 */
function RecordMock({
  typed,
  editing,
  saved,
  savedLabel,
}: {
  typed: string;
  editing: boolean;
  saved: boolean;
  savedLabel: string;
}) {
  const inputCls =
    "w-full rounded-md border border-zinc-200 bg-white px-3 py-0.5 text-[12px] leading-5 text-zinc-900";

  return (
    <div className="p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium text-zinc-900">Evening field</p>
          <p className="text-[11px] text-zinc-500">Sacha Elron, 2023</p>
        </div>
        <AnimatePresence>
          {saved ? (
            <motion.span
              className="flex shrink-0 items-center gap-1 text-[11px] text-emerald-600"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-600 text-[7px] text-white">
                ✓
              </span>
              {savedLabel}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-1.5 flex items-start gap-2 border-y border-zinc-200 py-1.5">
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-medium text-zinc-900">Published</p>
            <span className="text-[10px] text-zinc-400">Website ↗</span>
          </div>
          <p className="text-[10px] text-zinc-500">The public website is up to date</p>
        </div>
      </div>

      <div className="mt-1.5 space-y-0.5">
        <label className="block text-[10px] font-medium text-zinc-700">
          Title<span className="ml-0.5 text-red-500">*</span>
        </label>
        <div className={inputCls}>Evening field</div>
      </div>

      <div className="mt-1.5 space-y-0.5">
        <label className="block text-[10px] font-medium text-zinc-700">Artist</label>
        <div className="relative">
          <div className={inputCls}>Sacha Elron</div>
          <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[10px] text-emerald-600">
            ✓ Linked
          </span>
        </div>
      </div>

      <div className="mt-1.5 space-y-0.5">
        <label className="block text-[10px] font-medium text-zinc-700">Price</label>
        <div
          className={`flex items-stretch overflow-hidden rounded-md border bg-white transition-colors duration-300 ${
            editing ? "border-zinc-400 ring-2 ring-zinc-100" : "border-zinc-200"
          }`}
        >
          <span className="border-r border-zinc-200 bg-zinc-50 px-3 py-0.5 text-[12px] leading-5 text-zinc-600">
            EUR
          </span>
          <span className="flex min-w-0 flex-1 items-center px-3 py-0.5 text-[12px] leading-5 tabular-nums text-zinc-900">
            {typed}
            {editing ? (
              <motion.span
                className="ml-px h-4 w-px bg-zinc-900"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
            ) : null}
          </span>
        </div>
      </div>

      <div className="mt-1.5 space-y-0.5">
        <label className="block text-[10px] font-medium text-zinc-700">Status</label>
        <div className="flex flex-wrap gap-1.5">
          {["Available", "Reserved", "Sold"].map((status, index) => (
            <span
              key={status}
              className={`rounded-full border px-3 py-1 text-[12px] ${
                index === 0
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600"
              }`}
            >
              {status}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
 * Réduction du lightbox d’œuvre de Galerie-Template (`artist.html`):
 * média, détails d’œuvre, action Inquire et actions View in room / Share.
 */
function WebsiteMock({ synced, delay }: { synced: boolean; delay: number }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className={`${OUTPUT_INTRO} items-center border-b border-[#E8E8E6] px-5`}>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#111110]">Galerie</p>
      </div>
      <div className={OUTPUT_BODY}>
        <img
          src="/artworks/painting-05.jpg"
          alt="Evening Field by Sacha Elron"
          className={OUTPUT_IMG}
        />
        <div className="mt-3 flex items-start justify-between gap-3">
          <ArtworkCaption synced={synced} delay={delay} />
          <span className="shrink-0 border border-[#111110] px-3 py-1.5 text-[10px] text-[#111110]">
            Inquire
          </span>
        </div>
      </div>
    </div>
  );
}

/*
 * Page unique issue de `SessionTearsheet.tsx` dans Gallery OS:
 * marges A4, en-tête galerie, légende et pied confidentiel.
 */
function PdfMock({ synced, delay }: { synced: boolean; delay: number }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className={`${OUTPUT_INTRO} items-start justify-between px-5 pt-5`}>
        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#111110]">
          Galerie Fontaine
        </p>
        <p className="text-right text-[7px] leading-3 text-[#888]">Paris · 5 July 2026</p>
      </div>
      <div className={OUTPUT_BODY}>
        <img src="/artworks/painting-05.jpg" alt="" aria-hidden="true" className={OUTPUT_IMG} />
        <div className="mt-3">
          <ArtworkCaption synced={synced} delay={delay} />
        </div>
      </div>
      <div className="flex justify-between border-t border-[#EEE] px-5 pb-3 pt-2 text-[7px] text-[#AAA]">
        <span>Galerie Fontaine</span>
        <span>Confidentiel — usage privé</span>
      </div>
    </div>
  );
}

/*
 * Reprise du `ComposeMock` de RoomShowcase dans le projet Viewing room:
 * en-tête de sélection, image 16:9, légende et bouton Inquire.
 */
function ViewingRoomMock({ synced, delay }: { synced: boolean; delay: number }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className={`${OUTPUT_INTRO} flex-col justify-center px-5`}>
        <p className="text-[8px] uppercase italic tracking-[0.22em] text-[#ADADAA]">
          Gallery Fontaine
        </p>
        <p className="mt-1 font-display text-[16px] leading-tight text-[#111110]">
          Exhibition Selection
        </p>
        <p className="text-[9px] text-[#6B6A67]">For Jean Dupont</p>
      </div>
      <div className={OUTPUT_BODY}>
        <img src="/artworks/painting-05.jpg" alt="" aria-hidden="true" className={OUTPUT_IMG} />
        <div className="mt-3 flex items-start justify-between gap-2">
          <ArtworkCaption synced={synced} delay={delay} />
          <span className="shrink-0 rounded-[2px] border border-rose-300 px-3 py-1 text-[9px] text-[#111110]">
            Inquire
          </span>
        </div>
      </div>
      <div className="mt-auto flex justify-center px-5 pb-3 pt-2">
        <div className="flex items-center gap-2 rounded-[10px] border border-black/[0.06] bg-white px-3 py-2">
          <span className="text-[8px] text-[#6B6A67]">+ Images</span>
          <span className="h-3 w-px bg-[#E8E8E6]" />
          <span className="text-[8px] text-[#6B6A67]">+ Text</span>
          <span className="rounded-[6px] bg-[#15161C] px-3 py-1 text-[8px] text-white">Send</span>
        </div>
      </div>
    </div>
  );
}

export default function SignatureDemo() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();

  const [typed, setTyped] = useState(RECORD_OLD);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(RECORD_OLD);
      setEditing(false);
      setSaved(false);
      setSynced(false);
      return;
    }

    const timers: number[] = [];

    const play = () => {
      setTyped(RECORD_OLD);
      setEditing(false);
      setSaved(false);
      setSynced(false);

      timers.push(
        window.setTimeout(() => {
          setEditing(true);
          setTyped("");
        }, 1400)
      );

      RECORD_NEW.split("").forEach((_, index) => {
        timers.push(
          window.setTimeout(() => setTyped(RECORD_NEW.slice(0, index + 1)), 1800 + index * 130)
        );
      });

      timers.push(
        window.setTimeout(() => {
          setEditing(false);
          setSaved(true);
        }, 3200)
      );
      timers.push(window.setTimeout(() => setSynced(true), 3700));
      timers.push(window.setTimeout(play, 9500));
    };

    play();

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  const mocks = [
    (delay: number) => <WebsiteMock synced={synced} delay={delay} />,
    (delay: number) => <PdfMock synced={synced} delay={delay} />,
    (delay: number) => <ViewingRoomMock synced={synced} delay={delay} />,
  ];

  return (
    <section id="solutions" className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
          {t.signatureDemo.title}
        </h2>
        <p className="mt-0 max-w-xl text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
          {t.signatureDemo.subtitle}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article className="relative flex h-[480px] flex-col overflow-hidden rounded-[12px] bg-[#F8F8F6] pt-6">
            <div className="h-10 shrink-0 px-6">
              <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[#111110]">
                {t.signatureDemo.sourceLabel}
              </h3>
            </div>
            <BleedPanel address="app.galleryos.com/artworks/evening-field">
              <RecordMock
                typed={typed}
                editing={editing}
                saved={saved}
                savedLabel={t.signatureDemo.saved}
              />
            </BleedPanel>
          </article>

          {t.signatureDemo.outputs.map((output, index) => {
            const delay = index * 0.18;
            return (
              <article
                key={output.label}
                className="relative flex h-[480px] flex-col overflow-hidden rounded-[12px] bg-[#F8F8F6] pt-6"
              >
                <div className="h-10 shrink-0 px-6">
                  <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[#111110]">
                    {output.label}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-[12px] text-[#14804A]">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#28A864]"
                      animate={synced ? { scale: [1, 1.9, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5, delay }}
                    />
                    {output.status}
                  </p>
                </div>
                <BleedPanel
                  address={
                    [
                      "galerie.com/artists/sacha-elron",
                      "galleryos.com/exports/evening-field.pdf",
                      "galerie.com/private-selection/evening-field",
                    ][index] ?? ""
                  }
                >
                  {mocks[index]?.(delay)}
                </BleedPanel>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
