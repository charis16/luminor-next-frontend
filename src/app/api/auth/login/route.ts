// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(
    `${process.env.API_BASE_URL}/v1/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include", // agar cookie dari backend bisa diterima
    },
  );

  const resBody = await backendRes.text(); // bisa pakai .json() kalau yakin formatnya

  const response = new NextResponse(resBody, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") || "application/json",
    },
  });

  // ✅ Gunakan append agar semua cookie ikut dikirim ke browser
  const setCookie = backendRes.headers.getSetCookie();

  if (setCookie) {
    for (const cookie of setCookie) {
      response.headers.append("Set-Cookie", cookie);
    }
  }

  return response;
}
