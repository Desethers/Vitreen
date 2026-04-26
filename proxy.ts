import { NextRequest, NextResponse } from 'next/server'

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
const clerkEnabled = clerkKey.startsWith('pk_') && !clerkKey.includes('REPLACE_ME')

// Dynamically load Clerk middleware only when a valid key is configured.
// Without this guard, @clerk/nextjs/server throws "Publishable key not valid"
// before any page renders, breaking the entire app.
async function buildHandler() {
  if (!clerkEnabled) {
    return (_req: NextRequest) => NextResponse.next()
  }
  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')
  const isProtectedRoute = createRouteMatcher(['/ovr/editor(.*)'])
  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  })
}

const handlerPromise = buildHandler()

export async function proxy(req: NextRequest) {
  const handler = await handlerPromise
  return handler(req)
}

export const proxyConfig = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
