import { auth, clerkClient } from "@clerk/nextjs/server";

/** Remettre à `true` pour réactiver le plafond gratuit (FREE_EXPORT_LIMIT). */
export const EXPORT_QUOTA_ENABLED = false;

export const FREE_EXPORT_LIMIT = 3;
const BYPASS_USER_ID = "__bypass_export_quota__";

type QuotaCheck =
  | { ok: true; userId: string; isPro: boolean; used: number }
  | { ok: false; status: 401 | 402; error: string };

export async function checkExportQuota(): Promise<QuotaCheck> {
  try {
    const { userId } = await auth();
    if (!userId) {
      if (process.env.NODE_ENV !== "production") {
        return { ok: true, userId: BYPASS_USER_ID, isPro: true, used: 0 };
      }
      return { ok: false, status: 401, error: "unauthorized" };
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const isPro = Boolean(user.publicMetadata?.isPro);
    const used = Number(user.privateMetadata?.exportCount ?? 0);

    if (EXPORT_QUOTA_ENABLED && !isPro && used >= FREE_EXPORT_LIMIT) {
      return { ok: false, status: 402, error: "export_limit" };
    }
    return { ok: true, userId, isPro, used };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Quota check bypassed in development:", err);
      return { ok: true, userId: BYPASS_USER_ID, isPro: true, used: 0 };
    }
    return { ok: false, status: 401, error: "unauthorized" };
  }
}

export async function consumeExport(userId: string, currentUsed: number) {
  if (!EXPORT_QUOTA_ENABLED) return;
  if (userId === BYPASS_USER_ID) return;
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    privateMetadata: { exportCount: currentUsed + 1 },
  });
}
