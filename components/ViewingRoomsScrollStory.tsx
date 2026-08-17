"use client";

import ScrollStory, { type ScrollStoryStep } from "@/components/ScrollStory";

const STEPS: ScrollStoryStep[] = [
  {
    title: "Compose",
    subtitle: "Pick works straight from your inventory.",
    bullets: ["Select from your records", "Reorder the sequence freely", "No PDF to rebuild"],
  },
  {
    title: "Control",
    subtitle: "Decide what each collector sees.",
    bullets: ["Show or hide the price", "Availability on or off", "Add a private note"],
  },
  {
    title: "Share",
    subtitle: "Send a private link, not attachments.",
    bullets: ["One link per collector", "Expiry and access control", "Opens by invitation"],
  },
  {
    title: "Stay in sync",
    subtitle: "The selection stays current after you send.",
    bullets: [
      "Availability follows inventory",
      "Reserved works update live",
      "Direct inquiry per work",
    ],
  },
];

const WORKS = [
  { title: "Evening field", year: "2023", image: "/artworks/painting-01.png" },
  { title: "Dawn Study No. 7", year: "2023", image: "/artworks/painting-03.jpg" },
  { title: "Untitled (Horizon)", year: "2024", image: "/artworks/painting-09.png" },
  { title: "Sun Dog", year: "2024", image: "/artworks/painting-05.jpg" },
  { title: "Solstice", year: "2024", image: "/artworks/painting-07.jpg" },
  { title: "Nightfall", year: "2022", image: "/artworks/painting-08.jpg" },
];

const COMPOSE_SELECTED = new Set([0, 2, 3, 4]);

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-5 md:p-8">
      <div className="w-full max-w-[420px] overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0_18px_48px_rgba(17,17,16,0.08)]">
        {children}
      </div>
    </div>
  );
}

function PanelHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="border-b border-zinc-100 px-4 py-2.5 sm:px-5 sm:py-3.5">
      <p className="text-[13px] font-medium text-zinc-900">{title}</p>
      <p className="mt-0.5 text-[11px] text-zinc-400">{sub}</p>
    </div>
  );
}

function Thumb({ image, className = "" }: { image: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-md bg-zinc-100 ${className}`}>
      <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
    </div>
  );
}

/* 1 — Compose: select works from inventory */
function ComposeVisual() {
  return (
    <Panel>
      <PanelHeader title="Your inventory" sub="Select works for this selection" />
      <div className="grid grid-cols-3 gap-2 p-4">
        {WORKS.map((work, index) => {
          const isSelected = COMPOSE_SELECTED.has(index);
          return (
            <div
              key={work.title}
              className={`relative overflow-hidden rounded-md border transition-colors ${
                isSelected ? "border-zinc-900 ring-1 ring-zinc-900" : "border-zinc-200"
              }`}
            >
              <Thumb image={work.image} className="aspect-square rounded-none" />
              {isSelected ? (
                <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-zinc-900 text-[7px] text-white">
                  ✓
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3">
        <span className="text-[11px] text-zinc-500">{COMPOSE_SELECTED.size} works selected</span>
        <span className="rounded-md bg-zinc-900 px-3 py-1.5 text-[10px] font-medium text-white">
          Add to selection
        </span>
      </div>
    </Panel>
  );
}

/* 2 — Control: what the collector sees */
function ControlToggle({ label, value, on }: { label: string; value: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-[12px] text-zinc-700">{label}</span>
      <span className="inline-flex items-center gap-2">
        <span className="text-[11px] text-zinc-500">{value}</span>
        <span
          className={`flex h-4 w-7 items-center rounded-full px-0.5 transition-colors ${
            on ? "justify-end bg-zinc-900" : "justify-start bg-zinc-200"
          }`}
        >
          <span className="h-3 w-3 rounded-full bg-white" />
        </span>
      </span>
    </div>
  );
}

function ControlVisual() {
  return (
    <Panel>
      <PanelHeader title="Selection settings" sub="Untitled (Horizon), 2024" />
      <div className="flex gap-4 px-5 py-4">
        <Thumb image={WORKS[2].image} className="h-20 w-16 shrink-0" />
        <div className="flex-1 divide-y divide-zinc-100">
          <ControlToggle label="Show price" value="8 000 €" on={true} />
          <ControlToggle label="Show availability" value="Available" on={true} />
          <ControlToggle label="Show dimensions" value="Hidden" on={false} />
        </div>
      </div>
      <div className="border-t border-zinc-100 px-5 py-3">
        <p className="text-[10px] uppercase tracking-wide text-zinc-400">Collector note</p>
        <p className="mt-1 text-[11px] text-zinc-600">First option offered until end of month.</p>
      </div>
    </Panel>
  );
}

/* 3 — Share: private link */
function ShareVisual() {
  return (
    <Panel>
      <PanelHeader title="Share privately" sub="Spring selection · 4 works" />
      <div className="space-y-3 px-5 py-4">
        <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
          <span className="min-w-0 flex-1 truncate text-[11px] text-zinc-500">
            galerie.com/private/spring-2026
          </span>
          <span className="rounded bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-white">
            Copy
          </span>
        </div>
        <div className="divide-y divide-zinc-100">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[12px] text-zinc-700">Recipient</span>
            <span className="text-[11px] text-zinc-500">Jean Dupont</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[12px] text-zinc-700">Expires</span>
            <span className="text-[11px] text-zinc-500">In 14 days</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[12px] text-zinc-700">Access</span>
            <span className="text-[11px] text-zinc-500">By invitation only</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* 4 — Stay in sync: collector-facing room, live availability */
export function SyncVisual() {
  return (
    <Panel>
      <div className="border-b border-zinc-100 px-5 py-3.5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400">Gallery Fontaine</p>
        <p className="mt-1 text-[13px] font-medium text-zinc-900">
          Exhibition Selection · For Jean Dupont
        </p>
      </div>
      <div className="p-4 sm:p-5">
        <Thumb image={WORKS[3].image} className="h-24 w-full sm:h-40" />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium text-zinc-900">
              Sun Dog<span className="font-normal text-zinc-400">, 2024</span>
            </p>
            <p className="mt-0.5 text-[11px] text-zinc-500">Sacha Elron · 12 000 €</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700">
            <span className="h-1 w-1 rounded-full bg-amber-500" />
            Reserved
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-[10px] text-zinc-400">Updated just now</span>
          <span className="rounded-md border border-zinc-900 px-3 py-1.5 text-[10px] font-medium text-zinc-900">
            Inquire
          </span>
        </div>
      </div>
    </Panel>
  );
}

const STEP_VISUALS = [ComposeVisual, ControlVisual, ShareVisual, SyncVisual];

export default function ViewingRoomsScrollStory() {
  return (
    <ScrollStory
      title="From inventory to a private viewing room."
      subtitle="Compose, control, share — and it stays in sync."
      hideHeader
      steps={STEPS}
      compactMobileVisual
      renderVisual={(index) => {
        const Visual = STEP_VISUALS[index] ?? ComposeVisual;
        return <Visual />;
      }}
    />
  );
}
