import { NextRequest } from "next/server";
import FormData from "form-data";

import { fetchWithAutoRefresh } from "@/server/fetch-with-auto-refresh";

export async function POST(req: NextRequest) {
  const incomingForm = await req.formData();
  const form = new FormData();

  const entries = Array.from(incomingForm.entries());

  await Promise.all(
    entries.map(async ([key, value]) => {
      if (typeof value === "string") {
        form.append(key, value);
      } else if (value instanceof File) {
        const buffer = await value.arrayBuffer();

        form.append(key, Buffer.from(buffer), value.name);
      }
    }),
  );

  return fetchWithAutoRefresh({
    req,
    input: `${process.env.API_BASE_URL}/v1/api/users/submit`,
    init: {
      method: "POST",
      headers: form.getHeaders(),
      body: form as any, // form-data tidak cocok dengan BodyInit
    },
  });
}
