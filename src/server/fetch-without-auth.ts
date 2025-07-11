import { NextResponse } from "next/server";

import { rawServerOnly } from "./go-raw-server-only";

import { safeRawCall } from "@/utils/api";

interface FetchWithoutAuthOptions {
  input: string | URL;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export async function fetchWithoutAuth({
  input,
  method = "GET",
  body,
  headers = {},
}: FetchWithoutAuthOptions): Promise<NextResponse> {
  const [res, err] = await safeRawCall(
    rawServerOnly(input.toString(), method, {
      data: body,
      headers,
    }),
  );

  if (err || !res) {
    return NextResponse.json(
      { error: err?.message || "Fetch failed" },
      { status: err?.status || 500 },
    );
  }

  return new NextResponse(JSON.stringify(res.data), {
    status: res.status,
    headers: {
      "Content-Type": res.headers["content-type"] || "application/json",
    },
  });
}
