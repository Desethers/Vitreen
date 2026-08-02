"use client";

function FileSpreadsheetIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ConnectInventoryMockup() {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-white p-5">
      <h3 className="text-[14px] font-semibold text-[#18181B]">Connect your inventory</h3>
      <p className="mt-1 text-[11px] text-[#3F3F46]">
        Choose how to bring your works into Gallery OS
      </p>
      <div className="mt-3.5 flex items-center gap-3 rounded-[10px] border border-[#E4E4E7] px-3.5 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAFAFA] text-[#71717A]">
          <FileSpreadsheetIcon size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap text-[13px] font-semibold text-[#18181B]">
              Import a file
            </span>
            <span className="rounded bg-[#ECFDF5] px-1.5 py-0.5 text-[9px] font-medium text-[#047857]">
              Recommended
            </span>
          </span>
          <span className="mt-0.5 block text-[11px] text-[#71717A]">
            CSV or Excel — bring your whole inventory at once
          </span>
        </span>
        <span className="shrink-0 text-[#D4D4D8]">
          <ChevronRightIcon size={16} />
        </span>
      </div>
    </div>
  );
}

export function GalleryOsSearchWidget({
  insertLabel = "Insert an artwork",
  searchLabel = "Search Vitreen",
  searchCta = "Search",
  galleryViewCta = "Gallery view",
}: {
  insertLabel?: string;
  searchLabel?: string;
  searchCta?: string;
  galleryViewCta?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[266px] overflow-hidden rounded-[8px] border border-[#E8E8E6] bg-white">
      <div className="bg-[#424242] px-4 py-3 text-[12px] font-semibold text-white">Vitreen</div>
      <div className="space-y-1 px-4 pt-4">
        <p className="text-[12px] text-[#111110]">{insertLabel}</p>
        <p className="text-[12px] text-[#6B6A67]">{searchLabel}</p>
      </div>
      <div className="mt-4 border-t border-[#E8E8E6] px-4 py-4">
        <div className="rounded-[4px] border border-[#6B6A67] px-4 py-2.5 text-[12px] text-[#111110]">
          Sacha Elron
        </div>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-[#0059D8] px-5 py-1.5 text-[11px] text-white">
            {searchCta}
          </span>
          <span className="rounded-full border border-[#6B6A67] px-5 py-1.5 text-[11px] text-[#0059D8]">
            {galleryViewCta}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WhatsAppPdfMockup({
  incomingLabel = "Building your selection...",
  readyLabel = "Selection ready · 1 page",
}: {
  incomingLabel?: string;
  readyLabel?: string;
}) {
  return (
    <div
      className="relative mx-auto h-[230px] w-[262px]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
    >
      <div className="absolute right-0 top-2 h-[30px] w-[103px]">
        <img
          src="/mockups/whatsapp-figma/outgoing-shape.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative z-10 flex h-full items-center gap-2 px-3">
          <span className="text-[14px] text-black">/pdf</span>
          <span className="ml-auto text-[9px] text-black/30">11:43</span>
        </div>
      </div>

      <div className="absolute left-[5px] top-[53px] h-[44px] w-[250px]">
        <img
          src="/mockups/whatsapp-figma/incoming-shape.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full -scale-x-100"
        />
        <p className="absolute left-2 top-[7px] z-10 text-[14px] text-black">{incomingLabel}</p>
        <p className="absolute bottom-1 right-2 z-10 text-[9px] text-black/30">11:45</p>
      </div>

      <div className="absolute left-[-8px] top-[102px] h-[107px] w-[263px]">
        <img
          src="/mockups/whatsapp-figma/pdf-shape.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full -scale-x-100"
        />
        <div className="absolute left-[17px] top-[3px] z-10 flex h-[74px] w-[242px] gap-3 rounded-[7px] bg-[#F3F0F0] px-3 py-3">
          <span className="flex h-6 w-5 shrink-0 items-center justify-center bg-[#D90B2B] text-[6px] font-bold text-white">
            PDF
          </span>
          <div>
            <p className="text-[14px] leading-4 text-black">
              spring_selection_2026_
              <br />
              Marie_Beaumont.pdf
            </p>
            <p className="mt-1 text-[10px] text-black/40">2.8 MB · PDF</p>
          </div>
        </div>
        <p className="absolute bottom-[7px] left-[17px] z-10 text-[11px] text-black">
          {readyLabel}
        </p>
      </div>
    </div>
  );
}
