// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

import { safeRawCall } from "@/utils/api";
import { rawServerOnly } from "@/server/go-raw-server-only";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const [res, err] = await safeRawCall(
    rawServerOnly(
      `${process.env.API_BASE_URL}/v1/api/auth/admin-login`,
      "POST",
      {
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ),
  );

  if (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: err.status || 500,
    });
  }

  if (!res) {
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      {
        status: 500,
      },
    );
  }

  const response = new NextResponse(JSON.stringify(res.data), {
    status: res.status,
    headers: {
      "Content-Type": res.headers["content-type"] || "application/json",
    },
  });

  const setCookie = res.headers["set-cookie"];

  if (setCookie) {
    const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

    cookies.forEach((cookie) => response.headers.append("Set-Cookie", cookie));
  }

  return response;
}
