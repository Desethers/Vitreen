"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FAMILIES, LEGACY } from "@/components/archive/registry";

/* Une seule version à l’écran à la fois : on choisit une section à gauche,
 * on parcourt ses versions dans le temps avec la frise (ou ← →). */

type Item = {
  key: string;
  title: string;
  meta: string;
  subject: string;
  source?: string;
  current: boolean;
  Component: React.ComponentType;
};
type Group = { id: string; label: string; note: string; items: Item[] };

const GROUPS: Group[] = [
  ...FAMILIES.map((f) => ({
    id: f.id,
    label: f.label,
    note: "Versions dans le temps",
    items: f.versions.map((v, i) => ({
      key: v.file,
      title: `v${i + 1}${v.current ? " · actuelle" : ""}`,
      meta: `${v.date} · ${v.sha}`,
      subject: v.subject,
      source: v.source,
      current: v.current,
      Component: v.Component,
    })),
  })),
  {
    id: "mockups",
    label: "Mockups & visuels produit",
    note: "Composants encore dans le repo, plus utilisés sur la home",
    items: LEGACY.map((c) => ({
      key: c.name,
      title: c.name,
      meta: "forme actuelle",
      subject: c.description,
      current: true,
      Component: c.Component,
    })),
  },
];

function readHash(): [number, number] {
  try {
    const [g, v] = window.location.hash.slice(1).split("/");
    const gi = Math.max(
      0,
      GROUPS.findIndex((x) => x.id === g)
    );
    const vi = Math.min(Math.max(0, Number(v) - 1 || 0), GROUPS[gi].items.length - 1);
    return [gi, vi];
  } catch {
    return [0, 0];
  }
}

export default function ArchiveGallery() {
  const [gi, setGi] = useState(0);
  const [vi, setVi] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      const [g, v] = readHash();
      setGi(g);
      setVi(v);
    };
    sync();
    setReady(true);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = useCallback((g: number, v: number) => {
    const group = GROUPS[g];
    const next = Math.min(Math.max(v, 0), group.items.length - 1);
    setGi(g);
    setVi(next);
    try {
      history.replaceState(null, "", `#${group.id}/${next + 1}`);
    } catch {}
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key === "ArrowRight") go(gi, vi + 1);
      else if (e.key === "ArrowLeft") go(gi, vi - 1);
      else if (e.key === "ArrowDown") go(Math.min(gi + 1, GROUPS.length - 1), 0);
      else if (e.key === "ArrowUp") go(Math.max(gi - 1, 0), 0);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gi, vi, go]);

  const group = GROUPS[gi];
  const item = group.items[vi];
  const total = useMemo(() => FAMILIES.reduce((n, f) => n + f.versions.length, 0), []);

  return (
    <div className="min-h-screen bg-white text-[#111110] md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-[#E8E8E6] md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r">
        <div className="px-5 pb-3 pt-6 md:px-6 md:pt-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#6B6A67]">
            Archive
          </p>
          <p className="mt-1 text-[13px] leading-[1.5] text-[#6B6A67]">
            {total} versions · {FAMILIES.length} sections
          </p>
        </div>
        <nav
          aria-label="Sections"
          className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:space-y-0.5 md:pb-8"
        >
          {GROUPS.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => go(i, g.id === group.id ? vi : 0)}
              aria-current={i === gi}
              className={`flex shrink-0 items-baseline justify-between gap-3 rounded-[8px] px-3 py-2 text-left text-[14px] transition-colors md:w-full ${
                i === gi ? "bg-[#F5F5F3] text-[#111110]" : "text-[#6B6A67] hover:bg-[#F5F5F3]"
              }`}
            >
              <span>{g.label}</span>
              <span className="text-[12px] text-[#ADADAA]">{g.items.length}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-[#E8E8E6] bg-white/95 backdrop-blur">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 md:px-8">
            <h1 className="font-display text-[18px] tracking-tight md:text-[20px]">
              {group.label}
            </h1>
            <div
              className="flex min-w-0 flex-1 gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Versions"
            >
              {group.items.map((it, i) => (
                <button
                  key={it.key}
                  type="button"
                  role="tab"
                  aria-selected={i === vi}
                  onClick={() => go(gi, i)}
                  title={`${it.title} — ${it.meta}`}
                  className={`shrink-0 rounded-full border px-3 py-1 text-[12px] transition-colors ${
                    i === vi
                      ? "border-[#111110] bg-[#111110] text-white"
                      : "border-[#E8E8E6] text-[#6B6A67] hover:border-[#111110]"
                  }`}
                >
                  {group.id === "mockups" ? it.title : `v${i + 1}`}
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="Version précédente"
                disabled={vi === 0}
                onClick={() => go(gi, vi - 1)}
                className="h-8 w-8 rounded-full border border-[#E8E8E6] text-[14px] hover:border-[#111110] disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Version suivante"
                disabled={vi === group.items.length - 1}
                onClick={() => go(gi, vi + 1)}
                className="h-8 w-8 rounded-full border border-[#E8E8E6] text-[14px] hover:border-[#111110] disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-t border-[#E8E8E6] px-5 py-2 text-[13px] md:px-8">
            <span className="font-medium">{item.title}</span>
            <span className="text-[#6B6A67]">{item.meta}</span>
            <span className="min-w-0 flex-1 text-[#6B6A67]">{item.subject}</span>
            {item.source ? <code className="text-[11px] text-[#ADADAA]">{item.source}</code> : null}
          </div>
        </header>

        <div className="p-5 md:p-8">
          {/* `transform` : les éléments fixed (la nav) restent dans le cadre. */}
          <div
            key={`${group.id}-${item.key}`}
            className="relative isolate overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white"
            style={{ transform: "translateZ(0)", minHeight: group.id === "nav" ? 72 : 240 }}
          >
            {ready ? <item.Component /> : null}
          </div>
          <p className="mt-4 text-[12px] text-[#ADADAA]">
            ← → versions · ↑ ↓ sections · {group.note}
          </p>
        </div>
      </main>
    </div>
  );
}
