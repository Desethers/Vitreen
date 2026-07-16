"use client";

import type { Story } from "@ladle/react";
import { PILLARS } from "@/components/PillarMocks";

export default {
  title: "Pillars",
};

/** A consistent frame that mimics the ArtworkSourceSection container so
 *  mocks render at the same proportions they ship with on the homepage. */
function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="relative rounded-lg bg-white" style={{ width: 640, height: 480 }}>
        {children}
      </div>
    </div>
  );
}

export const Audit: Story = () => {
  const { Mock } = PILLARS[0];
  return (
    <MockFrame>
      <Mock />
    </MockFrame>
  );
};
Audit.storyName = "01 — Audit";

export const Connect: Story = () => {
  const { Mock } = PILLARS[1];
  return (
    <MockFrame>
      <Mock />
    </MockFrame>
  );
};
Connect.storyName = "02 — Connect & build";

export const Deploy: Story = () => {
  const { Mock } = PILLARS[2];
  return (
    <MockFrame>
      <Mock />
    </MockFrame>
  );
};
Deploy.storyName = "03 — Deploy";

/* All pillars side-by-side for visual diffing */
export const AllPillars: Story = () => (
  <div className="flex min-h-screen flex-col items-center gap-10 bg-white p-8">
    {PILLARS.map((p) => (
      <div key={p.number} className="flex flex-col items-center gap-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
          {p.number} — {p.title}
        </p>
        <div className="relative rounded-lg bg-white" style={{ width: 640, height: 480 }}>
          <p.Mock />
        </div>
        <p className="max-w-md text-center text-[12px] leading-relaxed text-[#6B6A67]">{p.desc}</p>
      </div>
    ))}
  </div>
);
AllPillars.storyName = "All pillars (stacked)";
