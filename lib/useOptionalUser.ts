'use client'

/**
 * Safe wrapper around Clerk's useUser.
 * When NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing or a placeholder,
 * returns { isSignedIn: false, user: null, isPro: false } so the app
 * works normally before real Clerk keys are added.
 *
 * Avoids a top-level static import of @clerk/nextjs so the Clerk module
 * is never loaded (and never validates the key) when Clerk is disabled.
 */

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
export const clerkEnabled = clerkKey.startsWith('pk_') && !clerkKey.includes('REPLACE_ME')

type OptionalUser = {
  isSignedIn: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null
  isPro: boolean
}

function useNoopUser(): OptionalUser {
  return { isSignedIn: false, user: null, isPro: false }
}

// Only loaded when Clerk is actually configured — avoids module-level init
function useClerkUser(): OptionalUser {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useUser } = require('@clerk/nextjs') as typeof import('@clerk/nextjs')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isSignedIn, user } = useUser()
  return {
    isSignedIn: isSignedIn ?? false,
    user: user ?? null,
    isPro: user?.publicMetadata?.isPro === true,
  }
}

export const useOptionalUser: () => OptionalUser = clerkEnabled ? useClerkUser : useNoopUser
