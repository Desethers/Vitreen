import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

// Routes that used to live at the root of vitreen.art (and on the old
// room.vitreen.art subdomain). They are now nested under /viewing-room-studio/.
const LEGACY_PREFIXES = [
  "/dashboard",
  "/editor",
  "/inquire",
  "/ovr",
  "/room",
  "/sign-in",
  "/sign-up",
  "/vr",
];

function isLegacyPath(pathname: string): boolean {
  return LEGACY_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

function applyHostRewrite(request: NextRequest): NextResponse | null {
  const host = request.nextUrl.hostname;
  const { pathname, search } = request.nextUrl;

  // Legacy subdomain — redirect to the new prefix on the main domain.
  if (host === "room.vitreen.art") {
    const target = new URL(
      `https://vitreen.art/viewing-room-studio${pathname === "/" ? "" : pathname}${search}`,
      request.url
    );
    return NextResponse.redirect(target, 308);
  }

  // Legacy bare paths on vitreen.art — redirect to /viewing-room-studio/<path>.
  if (isLegacyPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/viewing-room-studio${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  return null;
}

export const proxy = clerkEnabled
  ? clerkMiddleware(async (_auth, request) => {
      const rewrite = applyHostRewrite(request);
      if (rewrite) return rewrite;
      return NextResponse.next();
    })
  : function proxy(request: NextRequest) {
      return applyHostRewrite(request) ?? NextResponse.next();
    };

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
