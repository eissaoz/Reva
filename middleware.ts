import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/customers",
  "/tasks",
  "/settings",
  "/billing",
  "/resolve-complaint",
  "/onboarding",
];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function middleware(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const sessionResponse = await fetch(new URL("/api/auth/get-session", request.url), {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  if (!sessionResponse.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = (await sessionResponse.json()) as { user?: { email?: string | null } } | null;

  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/customers/:path*", "/tasks/:path*", "/settings/:path*", "/billing/:path*", "/resolve-complaint/:path*", "/onboarding/:path*"],
};
