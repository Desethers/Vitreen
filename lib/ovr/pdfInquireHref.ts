import type { VrSetup } from "@/lib/ovr/buildTypes";

/** Construit l’URL du lien INQUIRE (PDF / mail) : mailto si contact email, sinon URL absolue. */
export function buildInquireHref(
  setup: VrSetup | null,
  shareUrl: string | null | undefined
): string {
  const contact = setup?.galleryContact?.trim() ?? "";
  const emailLike = /^[^\s<>"']+@[^\s<>"']+\.[^\s<>"']+$/;
  if (contact && emailLike.test(contact)) {
    const subject = encodeURIComponent(`Inquiry — ${setup?.galleryName?.trim() || "Viewing room"}`);
    return `mailto:${contact}?subject=${subject}`;
  }
  if (/^mailto:/i.test(contact)) return contact;
  if (/^https?:\/\//i.test(contact)) return contact;
  const url = shareUrl?.trim();
  return url && /^https?:\/\//i.test(url) ? url : "";
}

/** Côté serveur : schémas autorisés pour les liens du PDF (pas de javascript:/data:). */
export function sanitizeInquireHrefForPdf(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const t = raw.trim().slice(0, 4000);
  if (!t) return "";
  const u = t.toLowerCase();
  if (u.startsWith("javascript:") || u.startsWith("data:")) return "";
  if (u.startsWith("mailto:") || u.startsWith("https://") || u.startsWith("http://")) return t;
  return "";
}
