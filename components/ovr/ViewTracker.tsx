"use client";

import { useEffect } from "react";

const VIEW_TTL_MS = 6 * 60 * 60 * 1000;

export function ViewTracker({ token }: { token: string }) {
  useEffect(() => {
    if (!token) return;

    const key = `ovr:view:${token}`;
    const now = Date.now();
    const previous = Number(window.localStorage.getItem(key) || 0);

    if (previous && now - previous < VIEW_TTL_MS) return;

    window.localStorage.setItem(key, String(now));

    fetch("/api/ovr/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      keepalive: true,
    }).catch(() => {
      window.localStorage.removeItem(key);
    });
  }, [token]);

  return null;
}
