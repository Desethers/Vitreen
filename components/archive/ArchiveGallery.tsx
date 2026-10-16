import ArchiveFrame from "@/components/archive/ArchiveFrame";
import { FAMILIES, LEGACY } from "@/components/archive/registry";

const MUTED = "text-[#6B6A67]";

export default function ArchiveGallery() {
  const total = FAMILIES.reduce((n, f) => n + f.versions.length, 0);

  return (
    <main className="bg-white text-[#111110]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <p className={`text-[12px] font-medium uppercase tracking-[0.14em] ${MUTED}`}>Archive</p>
        <h1 className="font-display mt-3 text-[32px] leading-[1.1] tracking-tight md:text-[48px]">
          Les formes de la home, depuis le début
        </h1>
        <p className={`mt-4 max-w-[640px] text-[16px] leading-[1.6] ${MUTED}`}>
          {total} versions de {FAMILIES.length} sections, recensées depuis l’historique de{" "}
          <code>main</code> (26 août 2026 → aujourd’hui). Chaque version est un snapshot figé du
          composant au moment du commit indiqué ; la dernière de chaque série est la forme actuelle.
          Page interne, non référencée.
        </p>

        <nav aria-label="Sections" className="mt-10 flex flex-wrap gap-2">
          {FAMILIES.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="rounded-full border border-[#E8E8E6] px-3.5 py-1.5 text-[13px] transition-colors hover:border-[#111110]"
            >
              {f.label} <span className="text-[#ADADAA]">{f.versions.length}</span>
            </a>
          ))}
          <a
            href="#legacy"
            className="rounded-full border border-[#E8E8E6] px-3.5 py-1.5 text-[13px] transition-colors hover:border-[#111110]"
          >
            Mockups &amp; pages produit <span className="text-[#ADADAA]">{LEGACY.length}</span>
          </a>
        </nav>

        {FAMILIES.map((f) => (
          <section
            key={f.id}
            id={f.id}
            className="mt-20 scroll-mt-8 border-t border-[#E8E8E6] pt-10"
          >
            <h2 className="font-display text-[26px] tracking-tight md:text-[32px]">{f.label}</h2>
            <p className={`mt-1 text-[14px] ${MUTED}`}>
              {f.versions.length} version{f.versions.length > 1 ? "s" : ""}, de la plus ancienne à
              la plus récente
            </p>
            <div className="mt-8 space-y-14">
              {f.versions.map((v, i) => (
                <figure key={v.file}>
                  <figcaption className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]">
                    <span className="font-medium">
                      v{i + 1}
                      {v.current ? " · actuelle" : ""}
                    </span>
                    <span className={MUTED}>{v.date}</span>
                    <code className="text-[#ADADAA]">{v.sha}</code>
                    <span className={`${MUTED} min-w-0 flex-1`}>{v.subject}</span>
                    <code className="text-[11px] text-[#ADADAA]">{v.source}</code>
                  </figcaption>
                  <ArchiveFrame minHeight={f.id === "nav" ? 72 : 240}>
                    <v.Component />
                  </ArchiveFrame>
                </figure>
              ))}
            </div>
          </section>
        ))}

        <section id="legacy" className="mt-20 scroll-mt-8 border-t border-[#E8E8E6] pt-10">
          <h2 className="font-display text-[26px] tracking-tight md:text-[32px]">
            Mockups &amp; visuels des pages produit
          </h2>
          <p className={`mt-1 text-[14px] ${MUTED}`}>
            Composants encore dans le repo, plus utilisés sur la home — forme actuelle uniquement.
          </p>
          <div className="mt-8 space-y-14">
            {LEGACY.map((c) => (
              <figure key={c.name}>
                <figcaption className="mb-3 flex flex-wrap items-baseline gap-x-3 text-[13px]">
                  <span className="font-medium">{c.name}</span>
                  <span className={MUTED}>{c.description}</span>
                </figcaption>
                <ArchiveFrame minHeight={160}>
                  <c.Component />
                </ArchiveFrame>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
