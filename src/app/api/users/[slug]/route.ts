import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = `${process.env.API_BASE_URL}/v1/api/users/website/${slug}`;

  return fetchWithAutoRefresh({
    req,
    input: url,
    init: {
      method: "GET",
    },
  });
}
