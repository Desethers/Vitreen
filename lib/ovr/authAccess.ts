export type DashboardUser = {
  userId: string;
  email: string;
  isPro: boolean;
};

export async function getSignedInDashboardUser(): Promise<DashboardUser | null> {
  return null;
}

export async function requireDashboardUser({ requirePro = false }: { requirePro?: boolean } = {}) {
  void requirePro;
  const user = await getSignedInDashboardUser();
  if (!user) return { ok: false as const, status: 401 as const, error: "unauthorized" };
  return { ok: true as const, user };
}
