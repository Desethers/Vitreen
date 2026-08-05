import { BODY, CONTAINER, H2, LINE_INK, SECTION } from "@/components/landing/styles";

const ARTWORK_DETAILS = ["Images", "Price", "Dimensions", "Availability"];

export default function LandingRecognition() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div
        className={`${CONTAINER} grid gap-10 md:grid-cols-[0.78fr_1fr] md:items-center md:gap-16`}
      >
        <div className="max-w-xl">
          <h2 className={H2}>Every sale starts with a conversation.</h2>
          <p className={`${BODY} mt-5`}>
            A collector asks for more works by an artist — in Gmail, WhatsApp, after a studio visit
            or on a call.
          </p>
          <p className={`${BODY} mt-4`}>
            The images, prices, dimensions and availability needed to reply are often somewhere
            else. Someone has to find, check and rebuild the material before sending it.
          </p>
          <p className={`${LINE_INK} mt-6 font-medium`}>
            Vitreen brings everything into the conversation, ready to send.
          </p>
        </div>

        <div className="border border-[#E8E8E6] bg-white p-5 md:p-6">
          <p className="text-[11px] tracking-[0.02em] text-[#ADADAA]">Collector</p>
          <div className="mt-3 max-w-[330px] rounded-[10px] bg-[#F5F5F3] px-4 py-3 text-[15px] leading-[1.45] tracking-[-0.01em] text-[#111110]">
            Do you have any other works by this artist?
          </div>

          <div className="mt-7 grid grid-cols-2 border-t border-[#E8E8E6]">
            {ARTWORK_DETAILS.map((detail, index) => (
              <div
                key={detail}
                className={`py-3 text-[13px] text-[#111110] ${
                  index % 2 === 0 ? "border-r border-[#E8E8E6] pr-3" : "pl-3"
                } ${index < 2 ? "border-b border-[#E8E8E6]" : ""}`}
              >
                {detail}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-[#ADADAA]">
            <span>Scattered across</span>
            {["Database", "Folders", "Old PDFs"].map((source) => (
              <span key={source} className="border border-[#E8E8E6] px-2 py-1 text-[#6B6A67]">
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
