import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === "true";

function applyHostRewrite(request: NextRequest): NextResponse | null {
  const host = request.nextUrl.hostname;
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (host === "room.vitreen.art") {
    // Legacy /ovr/editor → /editor (kept for old links)
    if (pathname === "/ovr/editor" || pathname === "/ovr") {
      return NextResponse.redirect(new URL("/editor", request.url));
    }
    // Landing
    if (pathname === "/") {
      url.pathname = "/room";
      return NextResponse.rewrite(url);
    }
  }

  // On vitreen.art, /editor lives on the room subdomain only
  if (host === "vitreen.art" && pathname === "/editor") {
    return NextResponse.redirect(new URL("https://room.vitreen.art/editor", request.url));
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
