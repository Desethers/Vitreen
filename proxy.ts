import { NextRequest, NextResponse } from 'next/server'

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
const clerkEnabled = clerkKey.startsWith('pk_') && !clerkKey.includes('REPLACE_ME')

async function buildHandler() {
  if (!clerkEnabled) {
    return (_req: NextRequest) => NextResponse.next()
  }

  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')

  const isProtectedRoute = createRouteMatcher(['/ovr/editor(.*)', '/onboarding'])
  const isOnboarding = createRouteMatcher(['/onboarding'])

  return clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth()

    // Protect editor
    if (isProtectedRoute(req)) await auth.protect()

    // Redirect signed-in users who haven't completed onboarding
    if (
      userId &&
      !isOnboarding(req) &&
      !(sessionClaims?.metadata as Record<string, unknown>)?.onboardingComplete
    ) {
      const onboardingUrl = new URL('/onboarding', req.url)
      return NextResponse.redirect(onboardingUrl)
    }
  })
}

const handlerPromise = buildHandler()

export async function proxy(req: NextRequest, event: unknown) {
  const handler = await handlerPromise
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (handler as any)(req, event)
}

export const proxyConfig = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
