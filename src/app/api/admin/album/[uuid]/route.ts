import { NextRequest } from "next/server";
import FormData from "form-data";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";
import { isServerFile } from "@/server/is-server-file";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/albums/${uuid}`,
    init: {
      method: "GET",
    },
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;

  const incomingForm = await req.formData();
  const clone1 = new FormData();
  const clone2 = new FormData();

  for (const [key, value] of Array.from(incomingForm.entries())) {
    if (isServerFile(value)) {
      const buffer = Buffer.from(await value.arrayBuffer());

      clone1.append(key, buffer, value.name);
      clone2.append(key, buffer, value.name);
    } else {
      clone1.append(key, value as string);
      clone2.append(key, value as string);
    }
  }

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/albums/${uuid}`,
    init: {
      method: "PUT",
      body: clone1 as any,
      headers: clone1.getHeaders?.() ?? {},
    },
    retry: true,
    retryBody: clone2 as any,
    retryHeaders: clone2.getHeaders?.() ?? {},
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/albums/${uuid}`,
    init: {
      method: "DELETE",
    },
  });
}
