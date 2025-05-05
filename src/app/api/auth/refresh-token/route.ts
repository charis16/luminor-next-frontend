import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 401 },
    );
  }

  const backendRes = await fetch(
    `${process.env.API_BASE_URL}/v1/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
      credentials: "include",
    },
  );

  const body = await backendRes.text();

  const response = new NextResponse(body, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") || "application/json",
    },
  });

  const setCookies = backendRes.headers.getSetCookie();

  if (setCookies) {
    for (const cookie of setCookies) {
      response.headers.append("Set-Cookie", cookie);
    }
  }

  return response;
}
