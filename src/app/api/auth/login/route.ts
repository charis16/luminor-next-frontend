// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

import { goFetcher } from "@/utils/api";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await goFetcher.raw(
    `${process.env.API_BASE_URL}/v1/api/auth/login`,
    "POST",
    {
      headers: { "Content-Type": "application/json" },
      data: body, // ⬅️ jangan pakai 'body', tapi 'data'
    },
  );

  const response = new NextResponse(JSON.stringify(backendRes.data), {
    status: backendRes.status,
    headers: {
      "Content-Type": backendRes.headers["content-type"] || "application/json",
    },
  });

  const setCookie = backendRes.headers["set-cookie"];

  if (setCookie) {
    const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

    cookies.forEach((cookie) => response.headers.append("Set-Cookie", cookie));
  }

  return response;
}
