import { auth, clerkClient } from "@clerk/nextjs/server";

export type DashboardUser = {
  userId: string;
  email: string;
  isPro: boolean;
};

export async function getSignedInDashboardUser(): Promise<DashboardUser | null> {
  const { userId, sessionClaims } = await auth();
  if (!userId) return null;

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const claimEmail = typeof sessionClaims?.email === "string" ? sessionClaims.email : "";
  const email = claimEmail || user.primaryEmailAddress?.emailAddress || "";

  return {
    userId,
    email,
    isPro: user.publicMetadata?.isPro === true,
  };
}

export async function requireDashboardUser({ requirePro = false }: { requirePro?: boolean } = {}) {
  const user = await getSignedInDashboardUser();
  if (!user) return { ok: false as const, status: 401 as const, error: "unauthorized" };
  if (requirePro && !user.isPro)
    return { ok: false as const, status: 402 as const, error: "upgrade_required" };
  return { ok: true as const, user };
}
