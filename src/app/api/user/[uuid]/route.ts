import { NextRequest } from "next/server";
import FormData from "form-data";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/users/${uuid}`,
    init: {
      method: "PATCH",
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
    if (typeof value === "string") {
      clone1.append(key, value);
      clone2.append(key, value);
    } else if (value instanceof File) {
      const buffer = Buffer.from(await value.arrayBuffer());

      clone1.append(key, buffer, value.name);
      clone2.append(key, buffer, value.name);
    }
  }

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/users/${uuid}`,
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
