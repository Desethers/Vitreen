type QuotaCheck =
  | { ok: true; userId: string; isPro: boolean; used: number }
  | { ok: false; status: 401 | 402; error: string };

export async function checkExportQuota(): Promise<QuotaCheck> {
  return { ok: true, userId: "anonymous", isPro: true, used: 0 };
}

export async function consumeExport(_userId: string, _currentUsed: number) {
  return;
}
