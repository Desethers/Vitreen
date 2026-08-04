"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ScrollStoryStep = {
  title: string;
  subtitle: string;
  bullets?: string[];
};

function StepCopy({ step, active }: { step: ScrollStoryStep; active: boolean }) {
  return (
    <div
      className={`relative max-w-sm transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-35"
      }`}
    >
      <h2 className="font-display text-[22px] font-normal leading-[1.15] tracking-[-0.025em] text-[#111110] md:text-[26px]">
        {step.title}
      </h2>
      <p className="mt-2 text-[16px] leading-[1.45] text-[#6B6A67]">{step.subtitle}</p>
      {step.bullets ? (
        <ul className="mt-6 space-y-2.5">
          {step.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3 text-[13px] text-[#111110]">
              <span className="text-[11px] text-[#8A8A86]" aria-hidden="true">
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function ScrollStory({
  title,
  subtitle,
  steps,
  renderVisual,
  renderVisualFooter,
  isVisualBare,
  compactMobileVisual = false,
  renderHeader,
}: {
  title: string;
  subtitle: string;
  steps: ScrollStoryStep[];
  renderVisual: (activeIndex: number) => ReactNode;
  renderVisualFooter?: (activeIndex: number) => ReactNode;
  isVisualBare?: (activeIndex: number) => boolean;
  compactMobileVisual?: boolean;
  renderHeader?: ReactNode;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    if (!media.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.step);
        if (Number.isFinite(index)) setActiveStep(index);
      },
      {
        rootMargin: "-41% 0px -58% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`bg-white px-5 md:px-10 md:pt-[72px] xl:px-14 ${
        compactMobileVisual ? "pt-10" : "pt-14"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className={compactMobileVisual ? "pb-4 md:pb-10" : "pb-12 md:pb-10"}>
          {renderHeader ?? (
            <>
              <h2 className="font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
                {title}
              </h2>
              <p className="mt-1.5 text-[22px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
                {subtitle}
              </p>
            </>
          )}
        </div>

        <div className="hidden lg:grid lg:grid-cols-[0.54fr_1fr] lg:gap-8 xl:gap-10">
          <div className="pb-[12vh] pt-[6vh]">
            {steps.map((step, index) => (
              <article
                key={step.title}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step={index}
                className="flex h-[44vh] items-center py-10"
              >
                <StepCopy step={step} active={activeStep === index} />
              </article>
            ))}
          </div>

          <div className="relative h-full">
            <div className="sticky top-[calc(12vh+40px)] ml-auto h-[480px] w-full max-w-[800px]">
              <div
                className={`relative h-full w-full ${
                  isVisualBare?.(activeStep)
                    ? "overflow-visible bg-transparent"
                    : "overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F8F8F6]"
                }`}
              >
                {renderVisual(activeStep)}
              </div>
              {renderVisualFooter ? renderVisualFooter(activeStep) : null}
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden ${
            compactMobileVisual ? "space-y-16 pb-8 pt-3" : "space-y-20 py-16"
          }`}
        >
          {steps.map((step, index) => (
            <article key={step.title}>
              <StepCopy step={step} active />
              <div
                className={`relative ${compactMobileVisual ? "mt-6" : "mt-8"} sm:h-[520px] ${
                  compactMobileVisual ? "h-[300px]" : "h-[420px]"
                } ${
                  isVisualBare?.(index)
                    ? "overflow-visible bg-transparent"
                    : "overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F8F8F6]"
                }`}
              >
                {renderVisual(index)}
              </div>
              {renderVisualFooter ? renderVisualFooter(index) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
