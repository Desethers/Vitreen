"use client";

import { EYEBROW } from "@/components/landing/styles";

const PROBLEMS = [
  {
    title: "Spread across files",
    text: "Artwork information lives in folders, spreadsheets and previous PDFs, never in one place.",
  },
  {
    title: "Every request starts from scratch",
    text: "Each collector question means finding images and checking details again.",
  },
  {
    title: "Documents rebuilt by hand",
    text: "Reopening InDesign to prepare another PDF, every single time.",
  },
];

export default function LandingProblemStatement() {
  return (
    <section className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[20px] bg-[#F5F5F3] p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-24">
            <div>
              <p className={EYEBROW}>The problem</p>
              <h2 className="mt-4 max-w-lg text-balance font-display text-[26px] font-normal leading-[1.2] tracking-[-0.04em] text-[#111110] md:text-[30px]">
                Selling art still means rebuilding the same material again and again.
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
                Artwork information is spread across folders, spreadsheets and previous PDFs.
              </p>
              <p className="mt-4 max-w-md text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
                Every collector request means finding images, checking details and reopening
                InDesign to prepare another document.
              </p>
            </div>

            <div>
              {PROBLEMS.map((item, index) => (
                <div
                  key={item.title}
                  className={`border-t border-[#DCDCD8] py-6 ${
                    index === PROBLEMS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <h3 className="font-display text-[17px] font-normal tracking-[-0.02em] text-[#111110] md:text-[18px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
