"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const SLIDE_DURATION = 5000;

const STEPS = [
  {
    title: "Artwork details",
    description: "Title, artist, year, medium, dimensions and internal reference.",
  },
  {
    title: "Main image",
    description: "Upload and manage the image attached to the artwork record.",
  },
  {
    title: "Status and price",
    description: "Set availability, price, currency and collector-facing visibility.",
  },
  {
    title: "Artwork list",
    description: "Search, filter and update records directly from the artwork browser.",
  },
];

function ToggleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      stroke={active ? "#111110" : "#6B6A67"}
      strokeWidth="1.3"
      strokeLinecap="round"
      className="shrink-0"
    >
      {active ? <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" /> : <path d="M7 2v10M2 7h10" />}
    </svg>
  );
}

function Field({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[9px] font-medium text-[#6B6A67]">{label}</span>
      <span className="block rounded-[5px] border border-[#D8D8D5] bg-white px-3 py-2 text-[11px] text-[#111110]">
        {value}
      </span>
    </label>
  );
}

function ArtworkRow({
  image,
  title,
  year,
  price,
  status,
}: {
  image: string;
  title: string;
  year: string;
  price: string;
  status: string;
}) {
  return (
    <div className="grid grid-cols-[36px_1.45fr_0.8fr_0.5fr_0.65fr_0.8fr] items-center gap-3 border-b border-[#EFEFED] px-4 py-2.5 text-[10px]">
      <img src={image} alt="" aria-hidden="true" className="h-8 w-8 rounded object-cover" />
      <span className="truncate font-medium text-[#111110]">{title}</span>
      <span className="truncate text-[#6B6A67]">Sacha Elron</span>
      <span className="text-right text-[#6B6A67]">{year}</span>
      <span className="text-right text-[#111110]">{price}</span>
      <span className="w-fit rounded-full border border-[#D8D8D5] px-2 py-1 text-[9px] text-[#6B6A67]">
        {status}
      </span>
    </div>
  );
}

function ArtworkFormHeader({ title }: { title: string }) {
  return (
    <div className="flex h-12 items-center justify-between border-b border-[#E8E8E6] px-5">
      <div>
        <p className="text-[12px] font-medium text-[#111110]">{title}</p>
        <p className="mt-0.5 text-[9px] text-[#ADADAA]">Artwork · Evening Field</p>
      </div>
      <button className="rounded-[5px] bg-[#111110] px-3 py-1.5 text-[9px] font-medium text-white">
        Save
      </button>
    </div>
  );
}

function ArtworkRecordMock({ activeStep }: { activeStep: number }) {
  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-hidden rounded-[6px] border border-[#E8E8E6] bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.28, ease }}
            className="h-full"
          >
            {activeStep === 0 && (
              <div className="h-full">
                <ArtworkFormHeader title="Edit artwork" />
                <div className="grid h-[calc(100%-48px)] grid-cols-[1fr_190px] gap-5 p-5">
                  <div className="space-y-3">
                    <Field label="Title" value="Evening Field" />
                    <Field
                      label="Artist"
                      value="Sacha Elron                                      ✓ Linked"
                    />
                    <div className="grid grid-cols-[0.35fr_0.65fr] gap-3">
                      <Field label="Year" value="2023" />
                      <Field label="Medium" value="Acrylic on canvas" />
                    </div>
                    <div>
                      <p className="mb-1.5 text-[9px] font-medium text-[#6B6A67]">Dimensions</p>
                      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_0.72fr] items-center gap-1.5">
                        {["120", "×", "120", "×", "4", "cm"].map((value, index) =>
                          value === "×" ? (
                            <span key={`${value}-${index}`} className="text-center text-[#ADADAA]">
                              ×
                            </span>
                          ) : (
                            <span
                              key={`${value}-${index}`}
                              className="rounded-[5px] border border-[#D8D8D5] px-2 py-2 text-center text-[10px] text-[#111110]"
                            >
                              {value}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[9px] font-medium text-[#6B6A67]">Main image</p>
                    <div className="relative aspect-square overflow-hidden rounded-[6px] border border-[#D8D8D5] bg-[#F5F5F3]">
                      <img
                        src="/artworks/painting-05.jpg"
                        alt="Evening Field by Sacha Elron"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[8px] text-[#168044]">
                        ✓ Current
                      </span>
                    </div>
                    <button className="mt-2 w-full rounded-[5px] border border-[#D8D8D5] px-3 py-2 text-[9px] text-[#6B6A67]">
                      Change image
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="h-full">
                <ArtworkFormHeader title="Main image" />
                <div className="grid h-[calc(100%-48px)] grid-cols-[1fr_0.72fr] gap-6 p-5">
                  <div className="flex items-center justify-center rounded-[7px] border-2 border-dashed border-[#D8D8D5] bg-[#FAFAF9]">
                    <div className="text-center">
                      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[18px] text-[#6B6A67]">
                        ↑
                      </span>
                      <p className="mt-3 text-[11px] font-medium text-[#111110]">Drop an image</p>
                      <p className="mt-1 text-[9px] text-[#ADADAA]">or click to browse</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-medium text-[#6B6A67]">Current image</p>
                    <div className="relative mt-2 aspect-square overflow-hidden rounded-[7px] border border-[#D8D8D5]">
                      <img
                        src="/artworks/painting-05.jpg"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[8px] text-[#168044]">
                        ✓ Uploaded
                      </span>
                    </div>
                    <button className="mt-3 w-full rounded-[5px] border border-[#D8D8D5] px-3 py-2 text-[9px] text-[#6B6A67]">
                      Remove image
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="h-full">
                <ArtworkFormHeader title="Status, price and visibility" />
                <div className="grid h-[calc(100%-48px)] grid-cols-2 gap-6 p-5">
                  <div>
                    <p className="text-[9px] font-medium text-[#6B6A67]">Status</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Available", "Reserved", "Sold", "NFS", "Consignment", "On loan"].map(
                        (status) => (
                          <span
                            key={status}
                            className={`rounded-full border px-2.5 py-1 text-[9px] ${
                              status === "Available"
                                ? "border-[#111110] bg-[#111110] text-white"
                                : "border-[#D8D8D5] text-[#6B6A67]"
                            }`}
                          >
                            {status}
                          </span>
                        )
                      )}
                    </div>
                    <div className="mt-6">
                      <p className="text-[9px] font-medium text-[#6B6A67]">Price</p>
                      <div className="mt-2 flex overflow-hidden rounded-[5px] border border-[#D8D8D5]">
                        <span className="border-r border-[#D8D8D5] bg-[#FAFAF9] px-3 py-2 text-[10px] text-[#6B6A67]">
                          EUR
                        </span>
                        <span className="flex-1 px-3 py-2 text-[10px] text-[#111110]">8000</span>
                      </div>
                      <button className="mt-2 rounded-full border border-[#D8D8D5] px-2.5 py-1 text-[9px] text-[#6B6A67]">
                        Price on request
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-medium text-[#6B6A67]">Visibility</p>
                    <div className="mt-2 flex items-center justify-between rounded-[6px] border border-[#D8D8D5] px-3 py-3">
                      <div>
                        <p className="text-[10px] text-[#111110]">Show on the artist page</p>
                        <p className="mt-1 text-[8px] text-[#ADADAA]">
                          Visible on the public website.
                        </p>
                      </div>
                      <span className="relative h-5 w-9 rounded-full bg-[#26A65B]">
                        <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                      </span>
                    </div>
                    <div className="mt-4 rounded-[6px] bg-[#FAFAF9] p-4">
                      <p className="text-[9px] text-[#6B6A67]">Record state</p>
                      <div className="mt-3 flex items-center justify-between text-[10px]">
                        <span className="text-[#111110]">Evening Field</span>
                        <span className="text-[#168044]">Published</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="h-full">
                <div className="border-b border-[#E8E8E6] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-medium text-[#111110]">Artworks</p>
                      <p className="mt-0.5 text-[9px] text-[#6B6A67]">
                        127 total · 89 available · 14 sold
                      </p>
                    </div>
                    <button className="rounded-[5px] bg-[#111110] px-3 py-1.5 text-[9px] text-white">
                      + Add
                    </button>
                  </div>
                  <div className="mt-3 flex max-w-md items-center rounded-[5px] border border-[#D8D8D5] px-3 py-2">
                    <span className="mr-2 text-[#ADADAA]">⌕</span>
                    <span className="flex-1 text-[9px] text-[#ADADAA]">
                      Search title, artist, year, medium…
                    </span>
                    <span className="rounded border border-[#E8E8E6] px-1.5 py-0.5 text-[8px] text-[#ADADAA]">
                      ⌘K
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {["Available", "Reserved", "Sold", "Consignment", "On loan"].map(
                      (filter, index) => (
                        <span
                          key={filter}
                          className={`rounded-full border px-2 py-1 text-[8px] ${
                            index === 0
                              ? "border-[#111110] bg-[#111110] text-white"
                              : "border-[#D8D8D5] text-[#6B6A67]"
                          }`}
                        >
                          {filter}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-[36px_1.45fr_0.8fr_0.5fr_0.65fr_0.8fr] gap-3 border-b border-[#E8E8E6] bg-[#FAFAF9] px-4 py-2 text-[8px] font-medium text-[#6B6A67]">
                  <span />
                  <span>Title</span>
                  <span>Artist</span>
                  <span className="text-right">Year</span>
                  <span className="text-right">Price</span>
                  <span>Status</span>
                </div>
                <ArtworkRow
                  image="/artworks/painting-01.png"
                  title="Evening Field"
                  year="2023"
                  price="8 000 €"
                  status="Available"
                />
                <ArtworkRow
                  image="/artworks/painting-02.png"
                  title="Untitled (Horizon)"
                  year="2024"
                  price="15 000 €"
                  status="Reserved"
                />
                <ArtworkRow
                  image="/artworks/painting-03.jpg"
                  title="Night Garden IV"
                  year="2024"
                  price="6 000 €"
                  status="Available"
                />
                <div className="flex items-center justify-between px-4 py-3 text-[9px]">
                  <span className="text-[#ADADAA]">4 results · 127 total</span>
                  <div className="flex overflow-hidden rounded-[4px] border border-[#D8D8D5]">
                    <span className="bg-[#111110] px-2 py-1 text-white">Grid</span>
                    <span className="px-2 py-1 text-[#6B6A67]">List</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ArtworkSourceSection() {
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(() => {
      setCurrent((value) => (value + 1) % STEPS.length);
      setProgressKey((value) => value + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, prefersReduced]);

  const goTo = (index: number) => {
    setCurrent(index);
    setProgressKey((value) => value + 1);
  };

  return (
    <section
      id="inventory-source"
      className="bg-white px-4 pt-14 pb-14 md:px-6 md:pt-[72px] md:pb-[72px]"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-start md:gap-14"
        >
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">Artwork record</p>
            <h2 className="mt-3 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              Everything the gallery needs around an artwork
            </h2>
            <p className="mt-5 text-[13px] leading-[1.7] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
              Keep artwork information, images, documents, availability and sales context together,
              ready for the team to reuse.
            </p>

            <div className="mt-12" role="tablist" aria-label="Artwork record anatomy">
              {STEPS.map((step, index) => {
                const active = index === current;
                return (
                  <div key={step.title} className="relative border-t border-[#E8E8E6]">
                    <span className="absolute -top-px left-0 right-0 h-[1.5px] overflow-hidden">
                      {active && (
                        <motion.span
                          key={progressKey}
                          className="block h-full bg-[#111110]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: prefersReduced ? 0 : SLIDE_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                      {index < current && <span className="block h-full w-full bg-[#111110]" />}
                    </span>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => goTo(index)}
                      className="group flex w-full items-center justify-between gap-4 py-2 text-left focus:outline-none"
                    >
                      <span
                        className={`font-display text-[12.5px] tracking-[-0.01em] transition-colors md:text-[13px] ${
                          active ? "text-[#111110]" : "text-[#6B6A67] group-hover:text-[#111110]"
                        }`}
                      >
                        {step.title}
                      </span>
                      <ToggleIcon active={active} />
                    </button>

                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-md pb-2 text-[12px] leading-[1.35] text-[#6B6A67] md:text-[13px]">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="border-t border-[#E8E8E6]" />
            </div>
          </div>

          <div
            className="md:ml-auto md:self-start"
            style={{ maxWidth: 640, width: "100%" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative h-[470px] rounded-lg bg-white">
              <ArtworkRecordMock activeStep={current} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
