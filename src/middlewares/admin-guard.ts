import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { verifyJwtToken } from "@/utils/jwt";

export async function adminGuard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];
  const accessToken = request.cookies.get("access_token")?.value;

  const isAdminRoot = new RegExp(`^/${locale}/admin$`).test(pathname);
  const isProtected = new RegExp(`^/${locale}/admin(/.*)?$`).test(pathname);
  const isLoginPage = pathname === `/${locale}/admin`;

  let role: string | null = null;

  if (accessToken) {
    try {
      const decoded = verifyJwtToken(accessToken);

      role = decoded.role;
    } catch (err) {
      console.error("JWT verification failed:", err);

      request.cookies.delete("access_token");

      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }
  }

  // 🔁 Kalau akses /admin (login page), tapi sudah login → redirect ke dashboard
  if (isAdminRoot && role === "admin") {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/dashboard`, request.url),
    );
  }

  // 🔐 Kalau akses halaman admin tapi belum login → redirect ke login
  if (isProtected && !accessToken && !isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
  }

  return null; // lanjutkan ke middleware berikutnya (intl, dll)
}
