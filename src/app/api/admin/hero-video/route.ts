import { NextRequest } from "next/server";
import FormData from "form-data";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";
import { isServerFile } from "@/server/is-server-file";
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
  const incomingForm = await req.formData();
  const clone1 = new FormData();
  const clone2 = new FormData();

  for (const [key, value] of Array.from(incomingForm.entries())) {
    if (isServerFile(value)) {
      const buffer = Buffer.from(await value.arrayBuffer());

      clone1.append(key, buffer, value.name);
      clone2.append(key, buffer, value.name);
    }
  }

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/websites/submit`, // ganti sesuai endpoint category
    init: {
      method: "POST",
      body: clone1 as any,
      headers: clone1.getHeaders?.() ?? {},
    },
    retry: true,
    retryBody: clone2 as any,
    retryHeaders: clone2.getHeaders?.() ?? {},
  });
}
