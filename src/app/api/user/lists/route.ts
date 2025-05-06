import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

const backendBaseUrl = process.env.API_BASE_URL!;

export async function GET(req: NextRequest) {
  const queryString = req.nextUrl.search; // <-- ini sudah termasuk `?search=...&page=...`

  return fetchWithAutoRefresh({
    req,
    input: `${backendBaseUrl}/v1/api/users/lists${queryString}`, // <-- sambungkan
    init: {
      method: "GET",
    },
  });
}
