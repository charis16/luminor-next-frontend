import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { refreshTokenAndSetCookies } from "@/server/refresh-token";

export async function adminGuard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("admin_access_token")?.value;
  const refreshToken = request.cookies.get("admin_refresh_token")?.value;

  const isAdminRoot = pathname === "/admin";
  const isProtected = pathname.startsWith("/admin") && !isAdminRoot;

  if (!accessToken && refreshToken) {
    const res = await refreshTokenAndSetCookies(request);

    if (res) return res;
  }

  if (isAdminRoot && accessToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return null;
}
