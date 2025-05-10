import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { verifyJwtToken } from "@/utils/jwt";
import { refreshTokenAndSetCookies } from "@/server/refresh-token";

export async function adminGuard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isAdminRoot = pathname === "/admin";
  const isProtected = pathname.startsWith("/admin") && !isAdminRoot;

  let role: string | null = null;

  if (accessToken) {
    try {
      const decoded = verifyJwtToken(accessToken);

      role = decoded.role;
    } catch {
      const response = NextResponse.redirect(new URL("/admin", request.url));

      response.headers.set(
        "Set-Cookie",
        `access_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
      );

      return response;
    }
  }

  if (!accessToken && refreshToken) {
    const res = await refreshTokenAndSetCookies(request);

    if (res) return res;
  }

  if (isAdminRoot && role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return null;
}
