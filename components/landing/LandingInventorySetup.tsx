"use client";

import { useEffect, useState } from "react";
import { ConnectInventoryMockup } from "@/components/shared/ArtworkAddInMocks";
import { BODY, EYEBROW, H2 } from "@/components/landing/styles";

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-[#ADADAA]"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#ADADAA]"
      aria-hidden="true"
    >
      <path d="M16 16l-4-4-4 4" />
      <path d="M12 12v9" />
      <path d="M20.4 17.5A5 5 0 0 0 18 8.2 7 7 0 0 0 4.3 10.6 4.5 4.5 0 0 0 5.5 19H7" />
    </svg>
  );
}

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-[13px] font-medium text-[#111110]">{title}</h3>
      <span className="text-[10px] text-[#ADADAA]">← Back</span>
    </div>
  );
}

function DropFileMockup() {
  return (
    <div className="flex h-full w-full flex-col rounded-[16px] border border-[#E4E4E7] bg-white p-6">
      <PanelHeader title="Import a file" />
      <p className="mt-1 text-[10px] text-[#ADADAA]">Bring your whole inventory from a CSV file</p>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-[#E4E4E7] text-center">
        <UploadIcon />
        <p className="mt-2 text-[12px] font-medium text-[#111110]">Drop your CSV file</p>
        <p className="mt-0.5 text-[10px] text-[#ADADAA]">or click to browse</p>
      </div>

      <p className="mt-4 text-[10px] text-[#6B6A67] underline underline-offset-2">
        Download CSV template
      </p>

      <div className="mt-4 flex items-center gap-4">
        <span className="rounded-[6px] bg-[#111110] px-3.5 py-2 text-[10px] font-medium text-white">
          Finish →
        </span>
        <span className="text-[10px] text-[#ADADAA]">Skip</span>
      </div>
    </div>
  );
}

const DONE_CIRCLE_AT_MS = 300;
const DONE_CIRCLE_DURATION_MS = 550;
const DONE_CHECK_AT_MS = DONE_CIRCLE_AT_MS + DONE_CIRCLE_DURATION_MS;
const DONE_CHECK_DURATION_MS = 450;
const DONE_HOLD_MS = 2200;
const DONE_CYCLE_MS = DONE_CHECK_AT_MS + DONE_CHECK_DURATION_MS + DONE_HOLD_MS;

function DoneMockup() {
  const [circleGrown, setCircleGrown] = useState(false);
  const [checkDrawn, setCheckDrawn] = useState(false);

  useEffect(() => {
    const timeouts: number[] = [];
    const runCycle = () => {
      setCircleGrown(false);
      setCheckDrawn(false);
      timeouts.push(window.setTimeout(() => setCircleGrown(true), DONE_CIRCLE_AT_MS));
      timeouts.push(window.setTimeout(() => setCheckDrawn(true), DONE_CHECK_AT_MS));
    };

    runCycle();
    const intervalId = window.setInterval(runCycle, DONE_CYCLE_MS);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-[#E4E4E7] bg-white p-6 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6EF]"
        style={{
          transform: circleGrown ? "scale(1)" : "scale(0)",
          transitionProperty: "transform",
          transitionDuration: `${DONE_CIRCLE_DURATION_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#168044"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline
            points="20 6 9 17 4 12"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: checkDrawn ? 0 : 24,
              transition: `stroke-dashoffset ${DONE_CHECK_DURATION_MS}ms ease`,
            }}
          />
        </svg>
      </div>
      <h3 className="mt-4 text-[13px] font-semibold text-[#111110]">You&apos;re all set!</h3>
      <p className="mt-2 max-w-[220px] text-[10px] leading-[1.5] text-[#6B6A67]">
        Your gallery is live on Vitreen. You can add more artworks and artists from the dashboard.
      </p>
      <span className="mt-4 rounded-[6px] bg-[#111110] px-3.5 py-2 text-[10px] font-medium text-white">
        Go to dashboard →
      </span>
    </div>
  );
}

const PREVIEW_BADGE_AT_MS = 300;
const PREVIEW_BADGE_DURATION_MS = 350;
const PREVIEW_ROW_AT_MS = PREVIEW_BADGE_AT_MS + PREVIEW_BADGE_DURATION_MS + 150;
const PREVIEW_ROW_DURATION_MS = 350;
const PREVIEW_HOLD_MS = 2200;
const PREVIEW_CYCLE_MS = PREVIEW_ROW_AT_MS + PREVIEW_ROW_DURATION_MS + PREVIEW_HOLD_MS;

function ImportPreviewMockup() {
  const [badgeDrawn, setBadgeDrawn] = useState(false);
  const [rowShown, setRowShown] = useState(false);

  useEffect(() => {
    const timeouts: number[] = [];
    const runCycle = () => {
      setBadgeDrawn(false);
      setRowShown(false);
      timeouts.push(window.setTimeout(() => setBadgeDrawn(true), PREVIEW_BADGE_AT_MS));
      timeouts.push(window.setTimeout(() => setRowShown(true), PREVIEW_ROW_AT_MS));
    };

    runCycle();
    const intervalId = window.setInterval(runCycle, PREVIEW_CYCLE_MS);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col rounded-[16px] border border-[#E4E4E7] bg-white p-6">
      <PanelHeader title="Import a file" />
      <p className="mt-1 text-[10px] text-[#ADADAA]">Bring your whole inventory from a CSV file</p>

      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="flex items-center justify-between rounded-[8px] border border-[#E4E4E7] px-3 py-2 text-[10px] text-[#6B6A67]">
          <span>▧ inventory-template.csv</span>
          <span className="text-[#ADADAA]">×</span>
        </div>

        <p className="flex items-center gap-1.5 text-[10px] text-[#168044]">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#168044]">
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline
                points="20 6 9 17 4 12"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: badgeDrawn ? 0 : 24,
                  transition: `stroke-dashoffset ${PREVIEW_BADGE_DURATION_MS}ms ease`,
                }}
              />
            </svg>
          </span>
          1 ready to import
        </p>

        <div className="overflow-hidden rounded-[8px] border border-[#E4E4E7]">
          <div className="grid grid-cols-[1.1fr_0.9fr_0.35fr_0.75fr_0.35fr] gap-1 bg-[#FAFAF9] px-3 py-2 text-[8px] text-[#ADADAA]">
            <span>Title</span>
            <span>Artist</span>
            <span>Year</span>
            <span>Price</span>
            <span>Image</span>
          </div>
          <div
            className="grid grid-cols-[1.1fr_0.9fr_0.35fr_0.75fr_0.35fr] items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[8.5px] text-[#111110]"
            style={{
              opacity: rowShown ? 1 : 0,
              transform: rowShown ? "translateY(0)" : "translateY(4px)",
              transitionProperty: "opacity, transform",
              transitionDuration: `${PREVIEW_ROW_DURATION_MS}ms`,
              transitionTimingFunction: "ease-out",
            }}
          >
            <span className="truncate">Untitled</span>
            <span className="truncate">S. Elron</span>
            <span>2024</span>
            <span>15 000 €</span>
            <span className="text-[#168044]">✓</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span className="rounded-[6px] bg-[#111110] px-3.5 py-2 text-[10px] font-medium text-white">
          Import 1 artwork →
        </span>
        <span className="text-[10px] text-[#ADADAA]">Cancel</span>
      </div>
    </div>
  );
}

const HOVER_AT_MS = 1000;
const PRESS_AT_MS = 1900;
const RELEASE_AT_MS = 2060;
const SWITCH_AT_MS = 2200;
const HOLD_MS = 3000;
const RESET_AT_MS = SWITCH_AT_MS + HOLD_MS;
const CYCLE_MS = RESET_AT_MS + 1000;

/**
 * Loops the "Connect your inventory" screen through a simulated hover and
 * click on "Import a file", then crossfades into the drop-file screen.
 */
function AnimatedConnectImportMockup() {
  const [screen, setScreen] = useState<"connect" | "dropfile">("connect");
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const timeouts: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    const runCycle = () => {
      setScreen("connect");
      setActiveTitle(null);
      setPressed(false);

      after(HOVER_AT_MS, () => setActiveTitle("Import a file"));
      after(PRESS_AT_MS, () => setPressed(true));
      after(RELEASE_AT_MS, () => setPressed(false));
      after(SWITCH_AT_MS, () => setScreen("dropfile"));
      after(RESET_AT_MS, () => {
        setScreen("connect");
        setActiveTitle(null);
      });
    };

    runCycle();
    const intervalId = window.setInterval(runCycle, CYCLE_MS);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        className={`transition-opacity duration-500 ease-out ${
          screen === "connect" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ConnectInventoryMockup activeTitle={activeTitle} pressed={pressed} />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          screen === "dropfile" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <DropFileMockup />
      </div>
    </div>
  );
}

export type InventorySetupCopy = {
  eyebrow: string;
  title: string;
  body: string;
  /** Deux réassurances affichées sous le chapeau. */
  reassurances: readonly [string, string];
};

const EN_COPY: InventorySetupCopy = {
  eyebrow: "Your inventory",
  title: "Keep the database you already have.",
  body: "Vitreen can sit on top of an existing inventory. If the system already works for your records, there is no reason to replace it just to improve sales workflows.",
  reassurances: ["Migration not forced", "Your data stays confidential"],
};

export function InventorySetupSection({ copy }: { copy: InventorySetupCopy }) {
  return (
    <section className="relative bg-white px-4 py-16 md:px-6 md:py-20">
      <div className="absolute inset-x-7 top-0 border-t border-[#E8E8E6] md:inset-x-12" />
      <div className="absolute inset-x-7 bottom-0 border-b border-[#E8E8E6] md:inset-x-12" />
      <div className="mx-auto w-full max-w-7xl text-center">
        <p className={`${EYEBROW} mx-auto`}>{copy.eyebrow}</p>
        <h2 className={`${H2} mx-auto mt-4 max-w-2xl`}>{copy.title}</h2>
        <p className={`${BODY} mx-auto mt-5 max-w-2xl`}>{copy.body}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {copy.reassurances.map((item) => (
            <span key={item} className="flex items-center gap-2 text-[13px] text-[#6B6A67]">
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 text-left md:mt-12 md:grid-cols-3">
          <AnimatedConnectImportMockup />
          <ImportPreviewMockup />
          <DoneMockup />
        </div>
      </div>
    </section>
  );
}

export default function LandingInventorySetup() {
  return <InventorySetupSection copy={EN_COPY} />;
}
