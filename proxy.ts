import { type NextRequest, NextResponse, type NextFetchEvent } from 'next/server'

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

export async function proxy(req: NextRequest, event: NextFetchEvent) {
  if (!clerkEnabled) return NextResponse.next()

  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')
  const isProtectedRoute = createRouteMatcher(['/ovr/editor(.*)'])
  const handler = clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) await auth.protect()
  })
  return handler(req, event)
}

export const proxyConfig = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
