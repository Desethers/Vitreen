import type { ReactNode } from "react";
import StudiesNav from "@/components/studies/StudiesNav";

export type Study = {
  name: string;
  component: ReactNode;
};

export default function StudiesLayout({
  title,
  description,
  studies,
}: {
  title: string;
  description?: string;
  studies: Study[];
}) {
  return (
    <main className="min-h-screen bg-white">
      <StudiesNav />

      <header className="mx-auto max-w-7xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#ADADAA]">Studies</p>
        <h1 className="mt-3 font-display text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-[#111110] md:text-[40px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-xl text-[14px] leading-[1.6] text-[#6B6A67] md:text-[15px]">
            {description}
          </p>
        ) : null}
      </header>

      {studies.length > 0 ? (
        <div className="mt-12 md:mt-16">
          {studies.map((study) => (
            <section key={study.name} className="border-t border-[#E8E8E6]">
              {/* Component label — under the filet, just above the title */}
              <div className="mx-auto max-w-7xl px-4 pt-12 md:px-6 md:pt-20">
                <span className="inline-flex items-center rounded-full border border-[#E8E8E6] bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-[#111110]">
                  {study.name}
                </span>
              </div>

              {/* Live component — full width, native (top padding/border neutralized so title hugs the badge) */}
              <div className="[&>section]:!border-t-0 [&>section]:!pt-5">{study.component}</div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <p className="text-[14px] text-[#ADADAA]">No sections catalogued yet.</p>
        </div>
      )}
    </main>
  );
}
