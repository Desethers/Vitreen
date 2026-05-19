import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Parcours — Vitreen",
  description: "De la photo WhatsApp à la fiche partagée, sans changer d'outil.",
};

export default function ParcoursPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden>
              <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900">Vitreen</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[13px] text-zinc-500 transition-colors hover:text-zinc-900"
        >
          Retour au site
          <ArrowRightIcon />
        </Link>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-10 pt-10 sm:px-10 sm:pt-16">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">Parcours</p>
        <h1 className="mb-5 text-3xl font-medium leading-[1.1] tracking-tight text-zinc-900 sm:text-[42px]">
          Tout passe par WhatsApp.
          <br />
          Le dashboard garde la trace.
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-500">
          Le galleriste envoie une photo, reçoit un PDF, le transfère à ses collectionneurs. Vitreen ne change pas le
          canal — il prépare ce qui doit être partagé.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
        <div className="relative">
          <div className="absolute bottom-3 left-[11px] top-3 w-px bg-zinc-200" aria-hidden />

          <Step number={1} title="La photo et sa fiche">
            <p className="mb-3 text-[13px] leading-relaxed text-zinc-500">
              Le galleriste envoie une photo d&apos;œuvre au bot Vitreen, avec la fiche en légende.
            </p>
            <WhatsAppBubble
              author="Camille"
              from="me"
              caption={
                <>
                  Sacha Elron — <span className="italic">Sans titre</span>, 2024
                  <br />
                  Huile sur toile · 120×80 cm · 15&nbsp;000&nbsp;€
                </>
              }
            />
          </Step>

          <Step number={2} title="L'œuvre est reconnue">
            <div className="flex flex-wrap gap-2">
              <Tag variant="accent">
                <SparklesIcon /> Artiste reconnu
              </Tag>
              <Tag>Œuvre disponible</Tag>
              <Tag>Dyptique</Tag>
            </div>
          </Step>

          <Step number={3} title="Le PDF se compose">
            <div className="space-y-2.5">
              <ChecklistItem icon={<FileTextIcon className="text-zinc-400" />}>
                Charte galerie appliquée — logo, footer, palette.
              </ChecklistItem>
              <ChecklistItem icon={<AlertIcon className="text-amber-500" />}>
                Prix retiré pour les collectionneurs hors France.
              </ChecklistItem>
              <ChecklistItem icon={<CheckIcon className="text-emerald-500" />}>
                PDF prêt à être partagé.
              </ChecklistItem>
            </div>
          </Step>

          <Step number={4} title="Renvoyé au galleriste sur WhatsApp">
            <p className="mb-3 text-[13px] leading-relaxed text-zinc-500">
              Le galleriste reçoit le PDF dans la conversation, prêt à transférer à un ou plusieurs collectionneurs.
            </p>
            <WhatsAppBubble
              author="Vitreen"
              from="bot"
              attachment={{
                title: "Selection-Sacha-Elron.pdf",
                subtitle: "1 page · 480 ko",
              }}
              caption={<>Fiche prête. Transférez à vos collectionneurs.</>}
            />
          </Step>

          <Step number={5} title="Tout s'archive dans le dashboard" active>
            <div className="space-y-2.5">
              <DeliveryRow icon={<FileTextIcon className="text-zinc-400" />}>
                <strong className="font-semibold text-zinc-900">3 Sélections</strong> envoyées cette semaine — chacune
                horodatée avec ses destinataires.
              </DeliveryRow>
              <DeliveryRow icon={<InboxIcon className="text-zinc-400" />}>
                <strong className="font-semibold text-zinc-900">5 réponses</strong> de collectionneurs centralisées dans
                l&apos;onglet Inquiries.
              </DeliveryRow>
              <DeliveryRow icon={<UsersIcon className="text-zinc-400" />}>
                <strong className="font-semibold text-zinc-900">12 collectionneurs</strong> rattachés à leur fiche,
                prêts pour la relance.
              </DeliveryRow>
            </div>
          </Step>
        </div>
      </section>
    </div>
  );
}

function Step({
  number,
  title,
  active,
  children,
}: {
  number: number;
  title: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative pb-10 pl-10 last:pb-0">
      <div
        className={`absolute left-0 top-0 flex h-[23px] w-[23px] items-center justify-center rounded-full text-[10px] font-medium ${
          active ? "border-2 border-zinc-900 bg-zinc-900 text-white" : "border border-zinc-300 bg-white text-zinc-400"
        }`}
      >
        {number}
      </div>
      <h3 className="mb-3 text-[15px] font-semibold leading-tight text-zinc-900">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function WhatsAppBubble({
  author,
  from,
  caption,
  attachment,
}: {
  author: string;
  from: "me" | "bot";
  caption: ReactNode;
  attachment?: { title: string; subtitle: string };
}) {
  return (
    <div className="max-w-md rounded-2xl bg-zinc-900 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2.5">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            from === "bot"
              ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
              : "bg-gradient-to-br from-zinc-700 to-zinc-600"
          }`}
        >
          <span className="text-[11px] font-medium text-white">{from === "bot" ? "V" : author.slice(0, 2).toUpperCase()}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-white">{author}</span>
            <span className="text-[10px] text-zinc-400">il y a 1 min</span>
          </div>
        </div>
        <WhatsAppIcon className="h-5 w-5" />
      </div>

      {attachment ? (
        <div className="mb-2.5 flex items-center gap-3 rounded-lg bg-zinc-800 px-3 py-3">
          <div className="flex h-11 w-9 shrink-0 items-center justify-center rounded border border-rose-500/30 bg-rose-500/15">
            <span className="text-[9px] font-bold tracking-wider text-rose-400">PDF</span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-zinc-100">{attachment.title}</p>
            <p className="mt-0.5 text-[10px] text-zinc-500">{attachment.subtitle}</p>
          </div>
        </div>
      ) : (
        <div className="mb-2.5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-zinc-800">
          <ImageIcon className="h-9 w-9 text-zinc-600" />
        </div>
      )}

      <p className="text-[12.5px] leading-relaxed text-zinc-200">{caption}</p>
    </div>
  );
}

function Tag({ variant = "default", children }: { variant?: "default" | "accent"; children: ReactNode }) {
  const cn =
    variant === "accent"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-zinc-200 bg-white text-zinc-700";

  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium ${cn}`}>{children}</span>;
}

function ChecklistItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <p className="text-[13px] leading-relaxed text-zinc-700">{children}</p>
    </div>
  );
}

function DeliveryRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <p className="text-[13px] leading-relaxed text-zinc-700">{children}</p>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3Z" />
      <path d="M19 15l.8 2.6L22 18l-2.2.4L19 21l-.8-2.6L16 18l2.2-.4L19 15Z" />
    </svg>
  );
}

function FileTextIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  );
}

function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function InboxIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="m5.5 5.5-3 6V20a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-8.5l-3-6A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.5Z" />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </svg>
  );
}

function ImageIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="m3 16 5-5 4 4 2-2 7 7" />
      <circle cx="9" cy="8" r="1.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="WhatsApp">
      <path
        fill="#25D366"
        d="M20.52 3.48A12 12 0 0 0 3.5 20.36L2 22l1.69-1.51A12 12 0 1 0 20.52 3.48Zm-8.51 18.34a9.83 9.83 0 0 1-5.05-1.39l-.36-.21-3.74.98 1-3.66-.24-.38a9.85 9.85 0 1 1 8.39 4.66Zm5.46-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47a8.91 8.91 0 0 1-1.65-2.06c-.17-.29 0-.45.13-.6.13-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.21 5.09 4.5.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"
      />
    </svg>
  );
}
