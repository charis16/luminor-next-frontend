import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const next = searchParams.get("next");
  const filter = searchParams.get("filter");
  let url = `${process.env.API_BASE_URL}/v1/api/albums/category/${slug}`;

  const queryParams = new URLSearchParams();

  if (next) queryParams.set("next", next);
  if (filter) queryParams.set("filter", filter);

  if (queryParams.toString().length > 0) {
    url += `?${queryParams.toString()}`;
  }

  return fetchWithAutoRefresh({
    req,
    input: url,
    init: {
      method: "GET",
    },
  });
}
