import { NextRequest } from "next/server";
import FormData from "form-data";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function POST(req: NextRequest) {
  const incomingForm = await req.formData();
  const clone1 = new FormData();
  const clone2 = new FormData();

  incomingForm.forEach((value, key) => {
    if (typeof value === "string") {
      clone1.append(key, value);
      clone2.append(key, value);
    } else if (value instanceof File) {
      value.arrayBuffer().then((buffer) => {
        const file = Buffer.from(buffer);

        clone1.append(key, file, value.name);
        clone2.append(key, file, value.name);
      });
    }
  });

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/users/submit`,
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
