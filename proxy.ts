import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/ovr/editor(.*)', '/onboarding'])
const isOnboarding = createRouteMatcher(['/onboarding'])

export const proxy = clerkMiddleware(async (auth, req) => {
  // Protect editor
  if (isProtectedRoute(req)) await auth.protect()

  // Redirect signed-in users who haven't completed onboarding
  const { userId, sessionClaims } = await auth()
  if (
    userId &&
    !isOnboarding(req) &&
    !(sessionClaims?.metadata as Record<string, unknown>)?.onboardingComplete
  ) {
    const { NextResponse } = await import('next/server')
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }
})

export const proxyConfig = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
