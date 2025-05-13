import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = parseJwt(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const currentPath = new URL(request.url).pathname;

  if (
    payload.user_type === "individual" &&
    !currentPath.startsWith("/dashboard/individual")
  ) {
    return NextResponse.redirect(new URL("/dashboard/individual", request.url));
  }

  if (
    payload.user_type === "partner" &&
    !currentPath.startsWith("/dashboard/individual")
  ) {
    return NextResponse.redirect(new URL("/dashboard/individual", request.url));
  }

  if (
    payload.user_type === "admin" &&
    !currentPath.startsWith("/dashboard/admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
