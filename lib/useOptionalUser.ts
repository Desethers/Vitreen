'use client'

import { useUser } from '@clerk/nextjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptionalUser = { isSignedIn: boolean; user: any | null; isPro: boolean }

export const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

function useNoopUser(): OptionalUser {
  return { isSignedIn: false, user: null, isPro: false }
}

function useClerkUser(): OptionalUser {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isSignedIn, user } = useUser()
  return { isSignedIn: isSignedIn ?? false, user: user ?? null, isPro: user?.publicMetadata?.isPro === true }
}

export const useOptionalUser: () => OptionalUser = clerkEnabled ? useClerkUser : useNoopUser
