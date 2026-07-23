"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/*
 * Réplique fidèle de la fiche œuvre du vrai dashboard Gallery OS :
 * ArtworkForm.tsx (Field/TextInput, pills de statut, prix + devise) et
 * ArtworkGalleryEditor.tsx (panneau Images, dropzone → image "Principale").
 * L'action animée reproduit l'upload de l'image principale.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const STATUSES = ["Available", "Reserved", "Sold", "NFS", "Consignment", "On loan"];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1 block text-[10px] font-medium text-zinc-700">
      {children}
      {required ? <span className="ml-0.5 text-red-500">*</span> : null}
    </label>
  );
}

const inputCls =
  "flex h-[26px] items-center rounded-md border border-zinc-200 bg-white px-2.5 text-[11px] text-zinc-900";

function UploadIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  );
}

function ImagesIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function DocumentsIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function DocumentsPanel() {
  const docs = [
    { name: "Certificate of authenticity.pdf", size: "412 KB" },
    { name: "Condition report.pdf", size: "1.2 MB" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-3 py-2">
        <span className="text-zinc-400">
          <DocumentsIcon />
        </span>
        <h3 className="text-[11px] font-medium text-zinc-800">Documents</h3>
        <span className="ml-auto text-[11px] tabular-nums text-zinc-400">{docs.length}</span>
      </div>
      <div className="space-y-1.5 p-2.5">
        {docs.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-2 rounded-md border border-zinc-100 bg-zinc-50/60 px-2 py-1.5"
          >
            <span className="text-zinc-400">
              <DocumentsIcon />
            </span>
            <span className="min-w-0 flex-1 truncate text-[10px] text-zinc-700">{d.name}</span>
            <span className="shrink-0 text-[9px] tabular-nums text-zinc-400">{d.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <motion.svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3f3f46"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </motion.svg>
  );
}

type Phase = "empty" | "uploading" | "done";

function ImagesPanel() {
  const [phase, setPhase] = useState<Phase>("empty");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase("empty");
      timers.push(setTimeout(() => setPhase("uploading"), 1500));
      timers.push(setTimeout(() => setPhase("done"), 2500));
      timers.push(setTimeout(run, 6000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const count = phase === "done" ? 1 : 0;

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-3 py-2">
        <span className="text-zinc-400">
          <ImagesIcon />
        </span>
        <h3 className="text-[11px] font-medium text-zinc-800">Images</h3>
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-auto text-[11px] tabular-nums text-zinc-400"
        >
          {count}
        </motion.span>
      </div>

      <div className="space-y-2 p-3">
        <div className="relative h-[168px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
          {/* Dropzone layer — visible while empty / uploading */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-zinc-200 text-zinc-400"
            animate={{ opacity: phase === "done" ? 0 : 1 }}
            transition={{ duration: 0.3, ease }}
          >
            {phase === "uploading" ? (
              <Spinner />
            ) : (
              <>
                <UploadIcon />
                <span className="px-4 text-center text-[11px] leading-tight">
                  Drop an image
                  <br />
                  ou cliquez pour parcourir
                </span>
              </>
            )}
          </motion.div>

          {/* Image layer — fades in when done */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: phase === "done" ? 1 : 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <img
              src="/artworks/painting-03.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-zinc-600 shadow-sm">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </span>
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] text-emerald-700 shadow-sm">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2 15 9l7 .5-5.3 4.6L18.5 21 12 17l-6.5 4 1.8-6.9L2 9.5 9 9z" />
              </svg>
              Principale
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          <div className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-zinc-200 text-[15px] leading-none text-zinc-400">
            +
          </div>
        </div>

        <p className="pt-0.5 text-center text-[9.5px] leading-tight text-zinc-400">
          Vues additionnelles — survolez une vignette pour la définir comme principale
        </p>
      </div>
    </div>
  );
}

export function ArtworkFormMock() {
  return (
    <div className="h-full w-full bg-white">
      <div className="grid h-full grid-cols-[1fr_248px] gap-5 p-5">
        {/* Left — form fields */}
        <div className="space-y-2.5">
          <div>
            <Label required>Title</Label>
            <div className={inputCls}>Dawn Study No. 7</div>
          </div>

          <div>
            <Label>Artist</Label>
            <div className={`${inputCls} relative`}>
              Sacha Elron
              <span className="absolute right-2.5 inline-flex items-center gap-1 text-[10px] text-emerald-600">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Linked
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-[92px] shrink-0">
              <Label>Year</Label>
              <div className={inputCls}>2023</div>
            </div>
            <div className="min-w-0 flex-1">
              <Label>Medium</Label>
              <div className={inputCls}>Acrylic</div>
            </div>
          </div>

          <div>
            <Label>Dimensions</Label>
            <div className="flex items-start gap-1.5">
              {[
                { v: "30", s: "Height" },
                { v: "30", s: "Width" },
                { v: "0", s: "Depth", muted: true },
              ].map((d, i) => (
                <div key={d.s} className="flex items-start gap-1.5">
                  {i > 0 ? (
                    <span className="flex h-[26px] items-center text-zinc-300">×</span>
                  ) : null}
                  <div className="w-[54px] space-y-1">
                    <div className={`${inputCls} justify-center ${d.muted ? "text-zinc-300" : ""}`}>
                      {d.v}
                    </div>
                    <span className="block text-center text-[9px] text-zinc-400">{d.s}</span>
                  </div>
                </div>
              ))}
              <div className="space-y-1">
                <div className={`${inputCls} w-[52px] justify-center`}>cm</div>
                <span className="block text-center text-[9px] text-zinc-400">Unit</span>
              </div>
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <span
                  key={s}
                  className={`rounded-full border px-2.5 py-[3px] text-[10.5px] ${
                    s === "Available"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-600"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-[120px] shrink-0">
              <Label>Location</Label>
              <div className={inputCls}>Studio</div>
            </div>
            <div className="min-w-0 flex-1">
              <Label>Price</Label>
              <div className="flex items-stretch overflow-hidden rounded-md border border-zinc-200 bg-white">
                <span className="border-r border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-600">
                  EUR
                </span>
                <span className="px-2.5 py-1 text-[11px] tabular-nums text-zinc-900">6000</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-700">
              Internal notes
            </span>
            <span className="text-[10px] text-zinc-400">Never shown outside the gallery</span>
            <svg
              className="ml-auto text-zinc-400"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Right — media */}
        <div className="flex flex-col gap-2.5 self-start">
          <ImagesPanel />
          <DocumentsPanel />
        </div>
      </div>
    </div>
  );
}
