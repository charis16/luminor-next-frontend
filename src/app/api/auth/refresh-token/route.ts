// app/api/auth/refresh-token/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { goFetcher, safeRawCall } from "@/utils/api";

export async function POST() {
  const refreshToken = (await cookies()).get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 401 },
    );
  }

  const [backendRes, err] = await safeRawCall(
    goFetcher.raw(
      `${process.env.API_BASE_URL}/v1/api/auth/refresh-token`,
      "POST",
      {
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      },
    ),
  );

  if (err || !backendRes) {
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 401 },
    );
  }

  const res = NextResponse.json(backendRes.data, {
    status: backendRes.status,
    headers: {
      "Content-Type": backendRes.headers["content-type"] || "application/json",
    },
  });

  const setCookies = backendRes.headers["set-cookie"];

  if (setCookies) {
    const cookiesArray = Array.isArray(setCookies) ? setCookies : [setCookies];

    cookiesArray.forEach((cookie) => {
      res.headers.append("Set-Cookie", cookie);
    });
  }

  return res;
}
