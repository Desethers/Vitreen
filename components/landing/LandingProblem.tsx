"use client";

import { BODY, CONTAINER, H2, H3, LINE_INK, SECTION } from "@/components/landing/styles";

const BENEFITS = [
  "Find the right work faster.",
  "Check accurate price and availability.",
  "Share collector-ready material immediately.",
];

const LIMITS = [
  "No full database replacement.",
  "No second sales platform.",
  "No presentation rebuilt from scratch.",
];

export default function LandingProblem() {
  return (
    <>
      <section className={`${SECTION} bg-white`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-3xl`}>
            Your artwork information and your collector conversations live in different places.
          </h2>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div className="max-w-xl space-y-4">
              <p className={BODY}>A collector asks for available works.</p>
              <p className={BODY}>
                The email stays open while someone checks the database, searches image folders,
                confirms the price and rebuilds a presentation.
              </p>
              <p className={`${LINE_INK} pt-1`}>Vitreen connects those steps.</p>
            </div>

            <ul className="flex list-none flex-col gap-0 p-0">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="border-t border-[#E8E8E6] py-4 last:border-b md:py-5">
                  <p className={H3}>{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div>
              <h2 className={`${H2} max-w-2xl`}>
                Your database stores the work. Vitreen helps you use it.
              </h2>
              <div className="mt-6 max-w-xl space-y-4 md:mt-8">
                <p className={BODY}>
                  Vitreen adds a practical sales layer to the systems your gallery already uses.
                </p>
                <p className={BODY}>
                  We connect the artwork information required for collector conversations, then make
                  it available from Gmail and WhatsApp.
                </p>
              </div>
            </div>

            <ul className="flex list-none flex-col gap-0 self-start p-0">
              {LIMITS.map((limit) => (
                <li key={limit} className="border-t border-[#DCDCD8] py-4 last:border-b md:py-5">
                  <p className={LINE_INK}>{limit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
