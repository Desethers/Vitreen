"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";
import { ArtistWebsitePage } from "@/components/WebsitePublisherProductPage";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease, delay },
});

function CardCaption({
  title,
  action,
  actionHover = "light",
  titleTone = "dark",
}: {
  label: string;
  title: string;
  action?: string;
  actionHover?: "light" | "dark";
  titleTone?: "dark" | "light";
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/75 via-white/20 to-transparent px-4 pt-1.5 pb-1.5 backdrop-blur-[2px]">
      <div className="flex items-center justify-between gap-4">
        <h3
          className={[
            "truncate font-display text-[13px] font-normal leading-none tracking-[-0.01em]",
            titleTone === "light" ? "text-[#F8F8F6]" : "text-[#111110]",
          ].join(" ")}
        >
          {title}
        </h3>
        {action ? (
          <span
            className={[
              "inline-flex shrink-0 items-center gap-1 text-[13px] font-normal leading-none tracking-[-0.01em] text-[#ADADAA] transition-colors duration-200",
              actionHover === "dark" ? "group-hover:text-[#111110]" : "group-hover:text-[#F8F8F6]",
            ].join(" ")}
          >
            {action}
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 6.5h8" />
              <path d="m7.25 3.25 3.25 3.25-3.25 3.25" />
            </svg>
          </span>
        ) : null}
      </div>
    </div>
  );
}

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
] as const;

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
    const keyDelay = 115;
    const fieldPause = 380;

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
            cursor + keyDelay * (index + 1)
          )
        );
      });

      cursor += field.value.length * keyDelay + fieldPause;
    });

    timers.push(setTimeout(() => setActiveKey(null), cursor + 180));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return { values, activeKey };
}

function ArtistInput({
  field,
  value,
  active,
}: {
  field: (typeof artistFields)[number];
  value: string;
  active: boolean;
}) {
  return (
    <div className={field.col === "full" ? "col-span-2" : ""}>
      <p className="text-[11px] font-medium text-zinc-700">
        {field.label} {"required" in field ? <span className="text-red-500">*</span> : null}
      </p>
      <div
        className={[
          "mt-1.5 flex h-9 items-center rounded-md border bg-white px-3 text-[12px] text-zinc-900",
          active ? "border-zinc-400 shadow-[0_0_0_2px_rgba(24,24,27,0.12)]" : "border-zinc-200",
        ].join(" ")}
      >
        <span className={value ? "" : "text-zinc-300"}>
          {value || ("placeholder" in field ? field.placeholder : "")}
        </span>
        {active ? (
          <motion.span
            aria-hidden="true"
            className="ml-0.5 h-4 w-px bg-zinc-900"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
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

function GalleryOsArtistMock() {
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: false, margin: "-80px" });
  const { values, activeKey } = useTypedArtistFields(started);

  return (
    <div ref={ref} className="h-full overflow-hidden bg-white">
      <div
        className="origin-top-left text-[#111110]"
        style={{ width: "172%", transform: "scale(0.66)" }}
      >
        <div className="px-8 pt-4 pb-2">
          <div className="flex h-9 max-w-[520px] items-center rounded-md border border-zinc-200 px-3 text-[13px] text-zinc-400">
            <span className="mr-2 text-zinc-400">⌕</span>
            Find anything in your gallery...
            <span className="ml-auto rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-300">
              ⌘K
            </span>
          </div>
        </div>

        <div className="px-8 pt-7">
          <p className="text-[13px] text-zinc-400">‹ Artists</p>
          <h3 className="mt-2 text-[22px] font-medium tracking-[-0.02em]">Sacha Elron</h3>
          <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-zinc-400">
            US <span className="mx-2 text-zinc-300">—</span> Born 1975{" "}
            <span className="mx-1 normal-case tracking-normal">·</span> 6 artworks
          </p>
        </div>

        <div className="mt-6 flex border-b border-zinc-200 px-8">
          {["Identity", "Bio", "Works", "News & press", "Website"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={[
                "mr-8 border-b-2 px-0 pb-3 text-[13px]",
                tab === "Identity"
                  ? "border-zinc-900 font-medium text-zinc-900"
                  : "border-transparent text-zinc-600",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 px-8 py-6 lg:grid-cols-[1fr_280px]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {artistFields.map((field) => (
              <ArtistInput
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
                      "rounded-full border px-3 py-1 text-[12px]",
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

          <div>
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
                x
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
      </div>
    </div>
  );
}

function PrivateSelectionPageMock() {
  return (
    <div className="h-full overflow-hidden bg-white">
      <div
        className="origin-top-left text-gray-900"
        style={{ width: "230%", transform: "scale(0.44)" }}
      >
        <header className="px-6">
          <div className="mx-auto max-w-3xl py-10">
            <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">Sélection privée</p>
            <div className="mb-6 text-2xl font-light text-gray-900">Selection — Sacha Elron</div>
            <p className="mb-2 text-sm text-gray-500">Pour Marie Beaumont</p>
            <p className="mt-4 text-xs text-gray-400">
              Cette sélection est disponible jusqu&apos;au 24 juillet 2026
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <article className="group mx-auto w-full max-w-3xl">
            <div className="mb-4 overflow-hidden">
              <img
                src="/artworks/painting-10.jpg"
                alt="Amber Nocturne"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-1 text-left">
                <p className="text-xs text-gray-400">Sacha Elron</p>
                <h2 className="text-sm font-medium text-gray-900">
                  <em>Amber Nocturne</em>, 2025
                </h2>
                <p className="text-xs text-gray-500">Oil on canvas</p>
                <p className="text-xs text-gray-400">150 × 150 cm</p>
              </div>

              <div className="shrink-0 text-right">
                <button
                  type="button"
                  className="border border-gray-300 px-4 py-2 text-xs text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  Faire une demande
                </button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

const addInCards = [
  {
    type: "gmail",
    label: "Gmail",
    src: "/logos/icon-gmail-96.png",
    className: "h-[42px] w-[42px]",
  },
  {
    type: "whatsapp",
    label: "WhatsApp",
    src: "/logos/whatsapp.svg",
    className: "h-[42px] w-[42px]",
  },
] as const satisfies readonly {
  type: string;
  label: string;
  src: string;
  className: string;
}[];

function AddInMiniMock({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#F8F8F6] p-6 text-center">
      <img src={src} alt="" aria-hidden="true" className={`${className} object-contain`} />
      <p className="max-w-full truncate text-[15px] font-medium leading-none tracking-[-0.01em] text-[#111110]">
        {label}
      </p>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const cards = t.services.cards;

  return (
    <section className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-10">
          <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
            {t.services.title}
          </h2>
          <p className="mt-0 max-w-xl text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-6">
          <motion.a
            {...fadeUp(0.05)}
            href="/products/archive"
            className="group relative overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#111110]/20 md:col-span-3"
          >
            <div className="pointer-events-none h-[300px] overflow-hidden bg-[#F8F8F6]">
              <div className="h-full transition-transform duration-300 ease-out group-hover:scale-[1.018]">
                <GalleryOsArtistMock />
              </div>
            </div>
            <CardCaption
              label={cards.dashboard.label}
              title={cards.dashboard.title}
              action="Explore"
            />
          </motion.a>

          <motion.a
            {...fadeUp(0.1)}
            href="/products/publishing"
            className="group relative overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#111110]/20 md:col-span-3"
          >
            <div className="pointer-events-none h-[300px] overflow-hidden bg-[#F8F8F6]">
              <div className="h-full transition-transform duration-300 ease-out group-hover:scale-[1.018]">
                <ArtistWebsitePage />
              </div>
            </div>
            <CardCaption
              label={cards.website.label}
              title={cards.website.title}
              action="Explore"
              actionHover="dark"
            />
          </motion.a>

          <motion.a
            {...fadeUp(0.12)}
            href="/products/viewing-rooms"
            className="group relative overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#111110]/20 md:col-span-3"
          >
            <div className="h-[300px] overflow-hidden">
              <div className="h-full transition-transform duration-300 ease-out group-hover:scale-[1.018]">
                <PrivateSelectionPageMock />
              </div>
            </div>
            <CardCaption
              label={cards.pdf.label}
              title={cards.pdf.title}
              action="Explore"
              actionHover="dark"
            />
          </motion.a>

          <motion.a
            {...fadeUp(0.16)}
            href="/products/custom-operations"
            className="group relative grid h-[300px] grid-cols-2 gap-[6px] overflow-hidden rounded-[12px] border border-transparent transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#111110]/20 md:col-span-3"
          >
            {addInCards.map((card) => (
              <article
                key={card.type}
                className="group relative overflow-hidden rounded-[8px] bg-[#F8F8F6]"
              >
                <AddInMiniMock src={card.src} label={card.label} className={card.className} />
              </article>
            ))}
            <CardCaption
              label={cards.addins.label}
              title={cards.addins.title}
              action="Explore"
              actionHover="dark"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
