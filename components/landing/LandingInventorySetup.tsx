"use client";

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

function ImportPreviewMockup() {
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
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#168044] text-[8px] text-white">
            ✓
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
          <div className="grid grid-cols-[1.1fr_0.9fr_0.35fr_0.75fr_0.35fr] items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[8.5px] text-[#111110]">
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

export default function LandingInventorySetup() {
  return (
    <section className="border-t border-[#E8E8E6] bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto w-full max-w-7xl text-center">
        <p className={`${EYEBROW} mx-auto`}>Your inventory</p>
        <h2 className={`${H2} mx-auto mt-4 max-w-2xl`}>
          Bring your artwork inventory into Vitreen.
        </h2>
        <p className={`${BODY} mx-auto mt-5 max-w-2xl`}>
          After auditing the way you work, we manage the migration of your data into Vitreen&rsquo;s
          database to improve the circulation of images and information across the tool.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-2 text-[13px] text-[#6B6A67]">
            <CheckIcon />
            Migration included
          </span>
          <span className="flex items-center gap-2 text-[13px] text-[#6B6A67]">
            <CheckIcon />
            Your data stays confidential
          </span>
        </div>

        <div className="mt-10 grid gap-5 text-left md:mt-12 md:grid-cols-3">
          <ConnectInventoryMockup />
          <DropFileMockup />
          <ImportPreviewMockup />
        </div>
      </div>
    </section>
  );
}
