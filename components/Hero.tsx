export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center px-4 md:px-6 overflow-hidden bg-white pt-20 pb-6 md:pt-28 md:pb-10">
      <div className="max-w-7xl w-full mx-auto relative">
        <h1
          className="font-display text-[20px] md:text-[32px] leading-[1.1] tracking-[-0.03em] mb-2 md:mb-3 max-w-4xl hero-fade-up"
          style={{ color: "#111110" }}
        >
          L&apos;art doit être vu dans son époque
        </h1>

        <p
          className="text-[18px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.02em] max-w-xl hero-fade-up hero-fade-up-delay"
          style={{ color: "#6B6A67" }}
        >
          Vitreen conçoit des interfaces digitales contemporaines pour galeries,
          artistes et art advisors
        </p>
      </div>
    </section>
  );
}
