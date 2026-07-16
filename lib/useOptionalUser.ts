"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptionalUser = { isSignedIn: boolean; user: any | null; isPro: boolean };

export function useOptionalUser(): OptionalUser {
  return { isSignedIn: false, user: null, isPro: true };
}
