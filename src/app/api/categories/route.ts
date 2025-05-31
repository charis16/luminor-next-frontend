import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

const backendBaseUrl = process.env.API_BASE_URL!;

export async function GET(req: NextRequest) {
  return fetchWithAutoRefresh({
    req,
    input: `${backendBaseUrl}/v1/api/categories`,
    init: {
      method: "GET",
    },
  });
}
