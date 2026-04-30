import { auth, clerkClient } from '@clerk/nextjs/server'

export const FREE_EXPORT_LIMIT = 3

type QuotaCheck =
  | { ok: true; userId: string; isPro: boolean; used: number }
  | { ok: false; status: 401 | 402; error: string }

export async function checkExportQuota(): Promise<QuotaCheck> {
  const { userId } = await auth()
  if (!userId) return { ok: false, status: 401, error: 'unauthorized' }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const isPro = Boolean(user.publicMetadata?.isPro)
  const used = Number(user.privateMetadata?.exportCount ?? 0)

  if (!isPro && used >= FREE_EXPORT_LIMIT) {
    return { ok: false, status: 402, error: 'export_limit' }
  }
  return { ok: true, userId, isPro, used }
}

export async function consumeExport(userId: string, currentUsed: number) {
  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    privateMetadata: { exportCount: currentUsed + 1 },
  })
}
