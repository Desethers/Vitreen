import { auth, clerkClient } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

/** Activer/désactiver le plafond gratuit pour comptes connectés. */
export const EXPORT_QUOTA_ENABLED = true

/** Plafond gratuit pour utilisateurs connectés free. */
export const FREE_EXPORT_LIMIT = 3

/** Plafond gratuit pour utilisateurs ANONYMES (track via cookie). */
export const FREE_ANON_LIMIT = 5

const ANON_COOKIE = 'vr_anon_exports'
const BYPASS_USER_ID = '__bypass_export_quota__'
const ANON_USER_ID = '__anonymous__'

type QuotaCheck =
  | { ok: true; userId: string; isPro: boolean; used: number; anonymous?: boolean }
  | { ok: false; status: 401 | 402; error: string }

async function readAnonCount(): Promise<number> {
  try {
    const store = await cookies()
    const raw = store.get(ANON_COOKIE)?.value
    const n = Number(raw)
    return Number.isFinite(n) && n >= 0 ? Math.min(n, 9999) : 0
  } catch {
    return 0
  }
}

async function writeAnonCount(count: number) {
  try {
    const store = await cookies()
    store.set(ANON_COOKIE, String(count), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 90, // 90 days
    })
  } catch {
    /* cookie write may fail outside route handlers; ignore silently */
  }
}

export async function checkExportQuota(): Promise<QuotaCheck> {
  try {
    const { userId } = await auth()

    if (!userId) {
      // Anonymous: allow up to FREE_ANON_LIMIT via cookie counter.
      const used = await readAnonCount()
      if (used >= FREE_ANON_LIMIT) {
        return { ok: false, status: 402, error: 'anonymous_limit_reached' }
      }
      return { ok: true, userId: ANON_USER_ID, isPro: false, used, anonymous: true }
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const isPro = Boolean(user.publicMetadata?.isPro)
    const used = Number(user.privateMetadata?.exportCount ?? 0)

    if (EXPORT_QUOTA_ENABLED && !isPro && used >= FREE_EXPORT_LIMIT) {
      return { ok: false, status: 402, error: 'export_limit' }
    }
    return { ok: true, userId, isPro, used }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Quota check bypassed in development:', err)
      return { ok: true, userId: BYPASS_USER_ID, isPro: true, used: 0 }
    }
    // In production, fall back to anonymous flow if Clerk auth() throws
    const used = await readAnonCount()
    if (used >= FREE_ANON_LIMIT) {
      return { ok: false, status: 402, error: 'anonymous_limit_reached' }
    }
    return { ok: true, userId: ANON_USER_ID, isPro: false, used, anonymous: true }
  }
}

export async function consumeExport(userId: string, currentUsed: number) {
  if (userId === BYPASS_USER_ID) return

  if (userId === ANON_USER_ID) {
    await writeAnonCount(currentUsed + 1)
    return
  }

  if (!EXPORT_QUOTA_ENABLED) return
  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    privateMetadata: { exportCount: currentUsed + 1 },
  })
}
