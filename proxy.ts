import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

function applyHostRewrite(request: NextRequest): NextResponse | null {
  const host = request.nextUrl.hostname;

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (host === "room.vitreen.art") {
    // Block internal routes — redirect /ovr/* → /editor
    if (pathname.startsWith("/ovr/")) {
      return NextResponse.redirect(new URL("/editor", request.url));
    }
    // Editor: rewrite /editor → /ovr/editor (auth handled client-side)
    if (pathname === "/editor") {
      url.pathname = "/ovr/editor";
      return NextResponse.rewrite(url);
    }
    // Landing
    if (pathname === "/") {
      url.pathname = "/room";
      return NextResponse.rewrite(url);
    }
  }

  // On vitreen.art, block direct access to /ovr/editor — redirect to room subdomain
  if (host === "vitreen.art" && pathname.startsWith("/ovr/editor")) {
    return NextResponse.redirect(new URL("https://room.vitreen.art/editor", request.url));
  }

  return null;
}

export const proxy = clerkEnabled
  ? clerkMiddleware(async (_auth, request) => {
      const rewrite = applyHostRewrite(request);
      if (rewrite) return rewrite;
    })
  : function proxy(request: NextRequest) {
      return applyHostRewrite(request) ?? NextResponse.next();
    };

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
