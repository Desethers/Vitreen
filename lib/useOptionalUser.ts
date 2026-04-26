'use client'

import { useUser } from '@clerk/nextjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptionalUser = { isSignedIn: boolean; user: any | null; isPro: boolean }

export function useOptionalUser(): OptionalUser {
  const { isSignedIn, user } = useUser()
  return {
    isSignedIn: isSignedIn ?? false,
    user: user ?? null,
    isPro: user?.publicMetadata?.isPro === true,
  }
}

export const clerkEnabled = true
