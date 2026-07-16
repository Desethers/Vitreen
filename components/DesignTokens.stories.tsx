"use client";

import type { Story } from "@ladle/react";

export default {
  title: "Foundations",
};

const colors: { name: string; cls: string; hex: string }[] = [
  { name: "ink", cls: "bg-ink", hex: "#111110" },
  { name: "muted", cls: "bg-muted", hex: "#6B6A67" },
  { name: "subtle", cls: "bg-subtle", hex: "#ADADAA" },
  { name: "line", cls: "bg-line", hex: "#E8E8E6" },
  { name: "line-soft", cls: "bg-line-soft", hex: "#EFEFEB" },
  { name: "surface-soft", cls: "bg-surface-soft", hex: "#F5F5F3" },
  { name: "surface-warm", cls: "bg-surface-warm", hex: "#FAFAF8" },
  { name: "background", cls: "bg-background", hex: "#FFFFFF" },
];

export const Colors: Story = () => (
  <div className="min-h-screen bg-white p-10">
    <h1 className="font-display mb-2 text-[26px] tracking-[-0.02em]">Design tokens — colors</h1>
    <p className="mb-8 text-[13px] text-[#6B6A67]">
      Exposed in <code>app/globals.css</code> via <code>@theme inline</code>. Use as Tailwind
      utilities (<code>text-ink</code>, <code>border-line</code>, …).
    </p>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {colors.map((c) => (
        <div key={c.name} className="flex flex-col gap-2 rounded-lg border border-[#E8E8E6] p-4">
          <div className={`h-20 w-full rounded ${c.cls} border border-[#E8E8E6]`} />
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-medium text-[#111110]">{c.name}</span>
            <span className="font-mono text-[10px] text-[#6B6A67]">{c.hex}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
Colors.storyName = "Colors";

const typeScale = [
  { label: "Display 26", cls: "font-display text-[26px] tracking-[-0.02em]" },
  { label: "Display 20", cls: "font-display text-[20px] tracking-[-0.02em]" },
  { label: "Body 15", cls: "text-[15px] leading-[1.65]" },
  { label: "Body 14", cls: "text-[14px] leading-[1.6]" },
  { label: "Body 13", cls: "text-[13px] leading-[1.6]" },
  { label: "Meta 11 uppercase", cls: "text-[11px] uppercase tracking-[0.12em]" },
];

export const Typography: Story = () => (
  <div className="min-h-screen bg-white p-10">
    <h1 className="font-display mb-8 text-[26px] tracking-[-0.02em]">Typography</h1>
    <div className="flex flex-col gap-6">
      {typeScale.map((t) => (
        <div key={t.label} className="flex items-baseline gap-6 border-b border-[#E8E8E6] pb-4">
          <span className="w-44 flex-shrink-0 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
            {t.label}
          </span>
          <p className={`${t.cls} text-[#111110]`}>
            Every gallery develops its own way of working.
          </p>
        </div>
      ))}
    </div>
  </div>
);
Typography.storyName = "Typography";
