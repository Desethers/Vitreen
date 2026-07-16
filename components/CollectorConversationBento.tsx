"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AppIcon } from "@/components/icons/AppIcon";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

function SmallArtworkSwatch({ color = "#1B2A4A" }: { color?: string }) {
  return (
    <div
      className="h-10 w-9 shrink-0 overflow-hidden rounded-[3px] bg-white"
      style={{ border: "0.5px solid #E8E8E6" }}
    >
      <div className="h-[68%] w-full" style={{ background: color }} />
      <div className="h-[32%] w-full bg-[#E8E8E6]" />
    </div>
  );
}

type ArtistField = {
  key: string;
  label: string;
  value: string;
  col: "half" | "full";
  required?: boolean;
  placeholder?: string;
};

const artistFields = [
  { key: "firstName", label: "First name", value: "Sacha", col: "half" },
  { key: "lastName", label: "Last name", value: "Elron", required: true, col: "half" },
  { key: "displayName", label: "Display name", value: "Sacha Elron", col: "full" },
  { key: "nationality", label: "Nationality", value: "US", col: "half" },
  {
    key: "location",
    label: "Location / studio",
    value: "",
    placeholder: "e.g. Paris, France",
    col: "half",
  },
  { key: "birthYear", label: "Birth year", value: "1975", col: "half" },
  { key: "deathYear", label: "Death year", value: "", placeholder: "-", col: "half" },
] as const satisfies readonly ArtistField[];

type ArtistFieldKey = (typeof artistFields)[number]["key"];

function useTypedArtistFields(started: boolean) {
  const [values, setValues] = useState<Record<ArtistFieldKey, string>>({
    firstName: "",
    lastName: "",
    displayName: "",
    nationality: "",
    location: "",
    birthYear: "",
    deathYear: "",
  });
  const [activeKey, setActiveKey] = useState<ArtistFieldKey | null>(null);

  useEffect(() => {
    if (!started) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cursor = 320;

    artistFields.forEach((field) => {
      if (!field.value) return;

      timers.push(
        setTimeout(() => {
          setActiveKey(field.key);
          setValues((previous) => ({ ...previous, [field.key]: "" }));
        }, cursor)
      );

      [...field.value].forEach((_, index) => {
        timers.push(
          setTimeout(
            () => {
              setValues((previous) => ({
                ...previous,
                [field.key]: field.value.slice(0, index + 1),
              }));
            },
            cursor + 90 * (index + 1)
          )
        );
      });

      cursor += field.value.length * 90 + 340;
    });

    timers.push(setTimeout(() => setActiveKey(null), cursor + 240));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return { values, activeKey };
}

function ArtistFormField({
  field,
  value,
  active,
}: {
  field: ArtistField & { key: ArtistFieldKey };
  value: string;
  active: boolean;
}) {
  const showCursor = active && field.value;

  return (
    <div className={field.col === "full" ? "col-span-2" : ""}>
      <label className="block text-[11px] font-medium text-zinc-700">
        {field.label} {field.required ? <span className="text-red-500">*</span> : null}
      </label>
      <div
        className={[
          "mt-1.5 flex h-9 items-center rounded-md border bg-white px-3 text-[12px] text-zinc-900 transition-shadow",
          active ? "border-zinc-400 shadow-[0_0_0_2px_rgba(24,24,27,0.12)]" : "border-zinc-200",
        ].join(" ")}
      >
        <span className={value ? "" : "text-zinc-300"}>{value || field.placeholder}</span>
        {showCursor ? (
          <motion.span
            aria-hidden="true"
            className="ml-0.5 h-4 w-px bg-zinc-900"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        ) : null}
      </div>
      {field.key === "displayName" ? (
        <p className="mt-1.5 text-[10px] text-zinc-400">
          Override if different from First + Last name (collective, alias...)
        </p>
      ) : null}
      {field.key === "deathYear" ? (
        <p className="mt-1.5 text-[10px] text-zinc-400">Leave empty if living</p>
      ) : null}
    </div>
  );
}

function ArtistFormMock() {
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: false, margin: "-80px" });
  const { values, activeKey } = useTypedArtistFields(started);

  return (
    <div
      ref={ref}
      className="h-full overflow-hidden rounded-lg border border-[#E8E8E6] bg-white text-[#111110]"
    >
      <div className="flex h-full min-h-[560px] flex-col">
        <div className="border-b border-zinc-100 px-5 py-4">
          <div className="flex h-8 items-center rounded-md border border-zinc-200 px-3 text-[12px] text-zinc-400">
            <span className="mr-2 text-zinc-400">⌕</span>
            Find anything in your gallery...
            <span className="ml-auto rounded border border-zinc-200 px-1.5 py-0.5 text-[9px] text-zinc-300">
              ⌘K
            </span>
          </div>
        </div>

        <div className="px-5 pt-5">
          <p className="text-[11px] text-zinc-400">‹ Artists</p>
          <h3 className="mt-3 font-display text-[20px] font-medium leading-tight tracking-[-0.02em]">
            {values.displayName || "Sacha Elron"}
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            US <span className="mx-2 text-zinc-300">—</span> Born 1975{" "}
            <span className="mx-1 normal-case tracking-normal">·</span> 6 artworks
          </p>
        </div>

        <div className="mt-7 flex border-b border-zinc-200 px-5">
          {["Identity", "Bio", "Works", "News & press", "Website"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={[
                "mr-6 border-b-2 px-0 pb-3 text-[12px] transition-colors",
                tab === "Identity"
                  ? "border-zinc-900 font-medium text-zinc-900"
                  : "border-transparent text-zinc-600",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid flex-1 gap-6 overflow-hidden px-5 py-5 lg:grid-cols-[1fr_230px]">
          <div className="grid auto-rows-min grid-cols-2 gap-x-4 gap-y-4">
            {artistFields.map((field) => (
              <ArtistFormField
                key={field.key}
                field={field}
                value={values[field.key]}
                active={activeKey === field.key}
              />
            ))}
            <div className="col-span-2">
              <p className="text-[11px] font-medium text-zinc-700">Status</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Represented", "Guest", "Historic", "Archived"].map((status) => (
                  <span
                    key={status}
                    className={[
                      "rounded-full border px-3 py-1 text-[11px]",
                      status === "Represented"
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-600",
                    ].join(" ")}
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-700">
              Portrait
            </p>
            <div className="relative mt-2 aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
              <img
                src="/artist page/sundog.png"
                alt="Portrait"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[16px] text-zinc-600 shadow-sm"
              >
                ×
              </button>
              <button
                type="button"
                className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] text-zinc-600 shadow-sm"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 px-5 py-4">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-400"
          >
            ♲
          </button>
          <div className="flex items-center gap-3">
            <button type="button" className="text-[12px] font-medium text-zinc-600">
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-zinc-900 px-4 py-2 text-[12px] font-medium text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GmailOutputCard() {
  return (
    <div className="rounded-lg border border-[#E8E8E6] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/logos/icon-gmail-96.png"
            alt=""
            aria-hidden="true"
            className="h-[22px] w-[22px] object-contain"
          />
          <h3 className="font-display text-[18px] font-normal tracking-[-0.02em] text-[#111110]">
            Gmail add-in
          </h3>
        </div>
        <span className="text-[11px] text-[#ADADAA]">Email thread</span>
      </div>
      <p className="mt-4 text-[14px] leading-[1.6] text-[#6B6A67]">
        Prepare artwork sheets, collector PDFs and follow-ups without leaving the email thread.
      </p>
      <div className="mt-5 rounded-[6px] border border-[#E8E8E6] p-3">
        <div className="h-2 w-2/3 rounded-full bg-[#E8E8E6]" />
        <div className="mt-2 flex items-center gap-2">
          <SmallArtworkSwatch />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-[#111110]">Evening Field</p>
            <p className="text-[11px] text-[#6B6A67]">PDF · artwork sheet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppOutputCard() {
  return (
    <div className="rounded-lg border border-[#E8E8E6] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AppIcon brand="whatsapp" size={22} />
          <h3 className="font-display text-[18px] font-normal tracking-[-0.02em] text-[#111110]">
            WhatsApp sharing
          </h3>
        </div>
        <span className="text-[11px] text-[#ADADAA]">Collector selection</span>
      </div>
      <p className="mt-4 text-[14px] leading-[1.6] text-[#6B6A67]">
        Select artworks from the archive and turn them into a clean collector selection.
      </p>
      <div className="mt-5 rounded-[6px] bg-[#111110] p-3 text-white">
        <p className="text-[11px] text-white/45">Selection ready</p>
        <div className="mt-2 flex items-center gap-2">
          <SmallArtworkSwatch color="#E8D34A" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium">3 works selected</p>
            <p className="text-[11px] text-white/50">Private link prepared</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectorConversationBento() {
  return (
    <section className="px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp(0)} className="max-w-2xl">
          <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[30px]">
            From artwork record to collector conversation
          </h2>
          <p className="mt-4 text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
            When a collector asks about an artwork, the gallery can reuse the same information
            directly inside Gmail or WhatsApp.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.05)}
          className="relative mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch"
        >
          <div className="absolute left-[61.5%] top-1/2 hidden h-px w-[8%] bg-[#E8E8E6] lg:block" />
          <ArtistFormMock />
          <div className="grid gap-4">
            <GmailOutputCard />
            <WhatsAppOutputCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
