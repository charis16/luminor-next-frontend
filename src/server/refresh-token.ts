// utils/auth.ts
import { NextRequest, NextResponse } from "next/server";

export async function refreshTokenAndSetCookies(
  request: NextRequest,
): Promise<NextResponse | null> {
  const refreshToken = request.cookies.get("admin_refresh_token")?.value;

  if (!refreshToken) return null;

  try {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          cookie: `admin_refresh_token=${refreshToken}`,
        },
      },
    );

    if (!refreshRes.ok) throw new Error("Refresh failed");

    const response = NextResponse.redirect(request.nextUrl);
    const setCookies = refreshRes.headers.getSetCookie?.();

    if (setCookies) {
      setCookies.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
    }

    return response;
  } catch {
    const response = NextResponse.redirect(new URL("/admin", request.url));

    response.headers.set(
      "Set-Cookie",
      [
        `admin_access_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
        `admin_refresh_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
        `admin_user=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
      ].join(", "),
    );

    return response;
  }
}
