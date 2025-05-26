import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  const body = await req.json();

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/albums/images/${uuid}`,
    init: {
      method: "PATCH",
      body: {
        image_url: body.urlImage,
      },
    },
  });
}
