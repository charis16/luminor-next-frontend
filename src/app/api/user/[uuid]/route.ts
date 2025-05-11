import { NextRequest } from "next/server";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/users/${uuid}`,
    init: {
      method: "GET",
    },
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/users/${uuid}`,
    init: {
      method: "DELETE",
    },
  });
}
