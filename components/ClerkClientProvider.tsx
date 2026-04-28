'use client'
import { ClerkProvider } from '@clerk/nextjs'

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

export function ClerkClientProvider({ children }: { children: React.ReactNode }) {
  if (!clerkEnabled) return <>{children}</>
  return (
    <ClerkProvider
      localization={{
        signIn: { start: { title: 'Sign in to Viewing Room Studio' } },
        signUp: { start: { title: 'Create your Viewing Room Studio account' } },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
