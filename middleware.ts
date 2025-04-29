import { AUTH_COOKIE_NAME } from "./constants";
import { decodeToken } from "./features/auth/auth.service";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  // Allow any client-action calls through
  if (req.headers.get("x-invoke-action") === "1") {
    return NextResponse.next();
  }

  // Handle login page
  if (pathname === "/login" && req.method === "GET") {
    if (token) {
      try {
        const user = decodeToken(token);
        if (user) {
          const clonedUrl = req.nextUrl.clone();
          clonedUrl.pathname = "/chat";
          return NextResponse.redirect(clonedUrl);
        }
      } catch {
        // invalid token → show login
      }
    }
    return NextResponse.next();
  }

  // Protect chat and documents
  if (pathname.startsWith("/chat") || pathname.startsWith("/documents")) {
    if (!token) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete(AUTH_COOKIE_NAME);
      return res;
    }
    try {
      decodeToken(token);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete(AUTH_COOKIE_NAME);
      return res;
    }
  }

  // Everything else (e.g. /blog, public, etc.) is public
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/chat/:path*", "/documents/:path*"],
};
