// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const backendRes = await fetch(
    `${process.env.API_BASE_URL}/v1/api/auth/logout`,
    {
      method: "POST",
      credentials: "include", // agar cookie dari browser dikirim ke backend
    },
  );

  const resBody = await backendRes.text();

  const response = new NextResponse(resBody, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") || "application/json",
    },
  });

  const setCookie = backendRes.headers.getSetCookie();

  if (setCookie) {
    for (const cookie of setCookie) {
      response.headers.append("Set-Cookie", cookie);
    }
  }

  return response;
}
