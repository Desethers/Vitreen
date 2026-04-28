import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'
const isProtected = createRouteMatcher(['/ovr/editor(.*)'])

function applyHostRewrite(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host") ?? "";
  if (host === "room.vitreen.art") {
    const url = request.nextUrl.clone();
    if (request.nextUrl.pathname === "/editor") {
      url.pathname = "/ovr/editor";
      return NextResponse.rewrite(url);
    }
    if (request.nextUrl.pathname === "/") {
      url.pathname = "/room";
      return NextResponse.rewrite(url);
    }
  }
  return null;
}

export const proxy = clerkEnabled
  ? clerkMiddleware(async (auth, request) => {
      const rewrite = applyHostRewrite(request);
      if (rewrite) return rewrite;
      if (isProtected(request)) await auth.protect();
    })
  : function proxy(request: NextRequest) {
      return applyHostRewrite(request) ?? NextResponse.next();
    };

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
