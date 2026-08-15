import { cookies } from "next/headers";

/** Activer/désactiver le plafond gratuit pour comptes connectés. */
export const EXPORT_QUOTA_ENABLED = true;

/** Plafond gratuit pour utilisateurs connectés free. */
export const FREE_EXPORT_LIMIT = 3;

/** Plafond gratuit pour utilisateurs ANONYMES (track via cookie). */
export const FREE_ANON_LIMIT = 10;

const ANON_COOKIE = "vr_anon_exports";
const ANON_USER_ID = "__anonymous__";

type QuotaCheck =
  | { ok: true; userId: string; isPro: boolean; used: number; anonymous?: boolean }
  | { ok: false; status: 401 | 402; error: string };

async function readAnonCount(): Promise<number> {
  try {
    const store = await cookies();
    const raw = store.get(ANON_COOKIE)?.value;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? Math.min(n, 9999) : 0;
  } catch {
    return 0;
  }
}

async function writeAnonCount(count: number) {
  try {
    const store = await cookies();
    store.set(ANON_COOKIE, String(count), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 90, // 90 days
    });
  } catch {
    /* cookie write may fail outside route handlers; ignore silently */
  }
}

export async function checkExportQuota(): Promise<QuotaCheck> {
  const used = await readAnonCount();
  if (used >= FREE_ANON_LIMIT) {
    return { ok: false, status: 402, error: "anonymous_limit_reached" };
  }
  return { ok: true, userId: ANON_USER_ID, isPro: false, used, anonymous: true };
}

export async function consumeExport(userId: string, currentUsed: number) {
  if (userId === ANON_USER_ID) {
    await writeAnonCount(currentUsed + 1);
  }
}
