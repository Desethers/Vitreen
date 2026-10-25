"use client";

import { motion } from "framer-motion";

/* Variantes de la section « Just talk to it » (/whatsapp), dans le style
 * Vitreen : blanc / #F5F5F3, encre #111110, bordures #E8E8E6, ni vert ni
 * ombre. Page de comparaison, non indexée. */

const PHRASES = [
  "Anything new from Elron for Marie?",
  "Elron sold.",
  "Who should see this piece?",
  "What has Thomas already seen?",
  "Make a PDF of the 5 large formats.",
  "Hold Evening Field for Marie until Friday.",
  "Price of the big blue one?",
  "Who haven’t I followed up this month?",
];

// Réponses courtes, groundées sur la démo (Sacha Elron, Marie, Thomas…).
const PAIRS: { q: string; a: string }[] = [
  { q: "Anything new from Elron for Marie?", a: "Evening Field, 120 × 150 cm. Draft ready." },
  { q: "Elron sold.", a: "Which one? Evening Field or Blue Hour." },
  { q: "What has Thomas already seen?", a: "Blue Hour, the large formats PDF, Evening Field." },
  {
    q: "Make a PDF of the 5 large formats.",
    a: "Ready to review. 5 works, prices from your stock.",
  },
  { q: "Hold Evening Field for Marie until Friday.", a: "On hold for Marie until Friday." },
  { q: "Who haven’t I followed up this month?", a: "Paul Girard and Anna Weiss." },
];

const CONTAINER = "mx-auto w-full max-w-6xl px-4 md:px-6";
const EYEBROW = "text-[12px] font-medium uppercase tracking-[0.14em] text-[#6B6A67]";
const H2 =
  "mt-4 max-w-3xl text-balance font-display text-[32px] font-medium leading-[1.05] tracking-[-0.035em] text-[#111110] md:text-[56px]";

function Marquee({
  children,
  duration = 50,
  reverse = false,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={`flex w-max ${className}`}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function Header({ title = "Talk to it like your best colleague." }: { title?: string }) {
  return (
    <div className={CONTAINER}>
      <p className={EYEBROW}>Just talk to it</p>
      <h2 className={H2}>{title}</h2>
    </div>
  );
}

function Label({ n, name, note }: { n: string; name: string; note: string }) {
  return (
    <div className="border-t border-[#E8E8E6] bg-white px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]">
        <span className="font-medium text-[#111110]">
          {n} · {name}
        </span>
        <span className="text-[#6B6A67]">{note}</span>
      </div>
    </div>
  );
}

/* A — Ticker typographique : les phrases sont le visuel, sans conteneur. */
function VariantA() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <Header />
      <div className="mt-14 flex flex-col gap-2 md:gap-3">
        {[0, 1].map((row) => (
          <Marquee key={row} reverse={row === 1} duration={row === 0 ? 60 : 70}>
            {(row === 0 ? PHRASES : [...PHRASES].reverse()).map((p, i) => (
              <span
                key={p}
                className={`flex items-center whitespace-nowrap font-display text-[28px] tracking-[-0.03em] md:text-[44px] ${
                  i % 3 === 0 ? "text-[#111110]" : "text-[#ADADAA]"
                }`}
              >
                {p}
                <span className="mx-6 text-[#DCDCD8] md:mx-10">/</span>
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

/* B — Pills sobres : contour fin sur fond doux, une seule rangée. */
function VariantB() {
  return (
    <section className="overflow-hidden border-t border-[#E8E8E6] bg-[#F5F5F3] py-20 md:py-28">
      <Header />
      <div className="mt-12 flex flex-col gap-3">
        {[0, 1].map((row) => (
          <Marquee key={row} reverse={row === 1} duration={55} className="gap-3 pr-3">
            {(row === 0 ? PHRASES : [...PHRASES].reverse()).map((p) => (
              <span
                key={p}
                className="whitespace-nowrap rounded-full border border-[#E8E8E6] bg-white px-5 py-2.5 text-[15px] text-[#111110] md:text-[17px]"
              >
                {p}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

/* C — Question → réponse : chaque carte montre ce qui revient. */
function VariantC() {
  return (
    <section className="overflow-hidden border-t border-[#E8E8E6] bg-white py-20 md:py-28">
      <Header title="Ask like you’d ask a colleague. Get the answer, not a search." />
      <div className="mt-12">
        <Marquee duration={70} className="gap-4 pr-4">
          {PAIRS.map((p) => (
            <div
              key={p.q}
              className="flex w-[300px] shrink-0 flex-col justify-between rounded-[12px] border border-[#E8E8E6] bg-white p-5 md:w-[340px]"
            >
              <p className="text-[17px] leading-[1.35] tracking-[-0.01em] text-[#111110]">{p.q}</p>
              <p className="mt-8 border-t border-[#E8E8E6] pt-3 text-[14px] leading-[1.45] text-[#6B6A67]">
                <span className="text-[#ADADAA]">Vitreen — </span>
                {p.a}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* D — Liste éditoriale : une phrase par ligne, fixe, entre filets. */
function VariantD() {
  return (
    <section className="border-t border-[#E8E8E6] bg-[#F5F5F3] py-20 md:py-28">
      <div className={`${CONTAINER} grid gap-10 md:grid-cols-[1fr_1.4fr]`}>
        <div>
          <p className={EYEBROW}>Just talk to it</p>
          <h2 className="mt-4 text-balance font-display text-[32px] font-medium leading-[1.05] tracking-[-0.035em] md:text-[48px]">
            Talk to it like your best colleague.
          </h2>
        </div>
        <ul className="border-t border-[#111110]">
          {PHRASES.slice(0, 6).map((p, i) => (
            <li
              key={p}
              className="flex items-baseline gap-5 border-b border-[#E1E1DE] py-4 font-display text-[20px] tracking-[-0.02em] text-[#111110] md:text-[26px]"
            >
              <span className="w-6 shrink-0 text-[12px] tabular-nums text-[#ADADAA]">
                {String(i + 1).padStart(2, "0")}
              </span>
              “{p}”
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function SayVariants() {
  return (
    <main className="bg-white text-[#111110]">
      <div className="px-4 pb-6 pt-10 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[#ADADAA]">
            /whatsapp — section « Just talk to it »
          </p>
          <h1 className="mt-2 font-display text-[28px] tracking-[-0.03em]">4 variantes</h1>
        </div>
      </div>
      <Label
        n="A"
        name="Ticker typographique"
        note="Les phrases en grand, sans boîte. Deux rangées en sens inverse."
      />
      <VariantA />
      <Label
        n="B"
        name="Pills sobres"
        note="Contour fin, fond blanc sur #F5F5F3. Le plus proche de l’actuel."
      />
      <VariantB />
      <Label
        n="C"
        name="Question → réponse"
        note="Rail de cartes : la demande, puis ce que Vitreen renvoie."
      />
      <VariantC />
      <Label
        n="D"
        name="Liste éditoriale"
        note="Fixe, pas d’animation. Six phrases numérotées entre filets."
      />
      <VariantD />
    </main>
  );
}
