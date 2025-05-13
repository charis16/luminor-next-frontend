import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function POST(req: NextRequest) {
  const body = await req.json();

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/faqs/submit`, // ganti sesuai endpoint category
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
