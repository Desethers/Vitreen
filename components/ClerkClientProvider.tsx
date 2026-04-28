'use client'
import { ClerkProvider } from '@clerk/nextjs'

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

export function ClerkClientProvider({ children }: { children: React.ReactNode }) {
  if (!clerkEnabled) return <>{children}</>
  return <ClerkProvider>{children}</ClerkProvider>
}
