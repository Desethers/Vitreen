import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'
const isEditorRoute = createRouteMatcher(['/ovr/editor(.*)'])

export const proxy = clerkEnabled
  ? clerkMiddleware(async (auth, request) => {
      const host = request.headers.get("host") ?? "";

      if (host === "room.vitreen.art") {
        const { pathname } = request.nextUrl;

        // Clean URL: block internal /ovr/* routes, redirect to /editor
        if (pathname.startsWith("/ovr/")) {
          return NextResponse.redirect(new URL("/editor", request.url));
        }

        // Protect /editor, then rewrite to internal route
        if (pathname === "/editor") {
          await auth.protect();
          const url = request.nextUrl.clone();
          url.pathname = "/ovr/editor";
          return NextResponse.rewrite(url);
        }

        // Landing page
        if (pathname === "/") {
          const url = request.nextUrl.clone();
          url.pathname = "/room";
          return NextResponse.rewrite(url);
        }
      }

      // vitreen.art: protect /ovr/editor if accessed directly
      if (isEditorRoute(request)) await auth.protect();
    })
  : function proxy(request: NextRequest) {
      const host = request.headers.get("host") ?? "";
      if (host === "room.vitreen.art") {
        const { pathname } = request.nextUrl;
        if (pathname.startsWith("/ovr/")) {
          return NextResponse.redirect(new URL("/editor", request.url));
        }
        if (pathname === "/editor") {
          const url = request.nextUrl.clone();
          url.pathname = "/ovr/editor";
          return NextResponse.rewrite(url);
        }
        if (pathname === "/") {
          const url = request.nextUrl.clone();
          url.pathname = "/room";
          return NextResponse.rewrite(url);
        }
      }
      return NextResponse.next();
    };

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
