import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

const backendBaseUrl = process.env.API_BASE_URL!;

export async function GET(req: NextRequest) {
  return fetchWithAutoRefresh({
    req,
    input: `${backendBaseUrl}/v1/api/websites`,
    init: {
      method: "GET",
    },
  });
}
export async function POST(req: NextRequest) {
  const body = await req.json();

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/websites/submit`, // ganti sesuai endpoint category
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    retry: true,
    retryBody: JSON.stringify(body),
    retryHeaders: {
      "Content-Type": "application/json",
    },
  });
}
