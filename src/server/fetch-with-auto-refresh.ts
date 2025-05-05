// server/fetch-with-auto-refresh.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { parse, serialize } from "cookie";

interface FetchWithRefreshOptions {
  req: NextRequest;
  input: string | URL;
  init?: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  };
  retry?: boolean;
}

function getFilteredCookie(req: NextRequest, keys: string[]): string {
  const raw = req.headers.get("cookie") || "";
  const parsed = parse(raw);

  return keys
    .filter((key) => parsed[key])
    .map((key) => serialize(key, parsed[key]!))
    .join("; ");
}

export async function fetchWithAutoRefresh({
  req,
  input,
  init = {},
  retry = true,
}: FetchWithRefreshOptions): Promise<NextResponse> {
  const accessCookie = getFilteredCookie(req, ["access_token"]);
  const refreshCookie = getFilteredCookie(req, ["refresh_token"]);

  const makeRequest = async () => {
    const headers = {
      ...init.headers,
      Cookie: accessCookie,
      ...(typeof init.body?.getHeaders === "function"
        ? init.body.getHeaders()
        : {}),
    };

    return axios.request({
      url: input.toString(),
      method: init.method || "GET",
      data: init.body,
      headers,
      withCredentials: true,
    });
  };

  try {
    const res = await makeRequest();

    return new NextResponse(JSON.stringify(res.data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    if (err.response?.status === 401 && retry) {
      try {
        await axios.post(
          `${process.env.API_BASE_URL}/v1/api/auth/refresh`,
          null,
          {
            headers: {
              Cookie: refreshCookie,
            },
            withCredentials: true,
          },
        );

        return fetchWithAutoRefresh({ req, input, init, retry: false });
      } catch {
        const res = new NextResponse("Unauthorized", { status: 401 });

        res.headers.append(
          "Set-Cookie",
          "refresh_token=; Path=/; HttpOnly; Max-Age=0",
        );
        res.headers.append(
          "Set-Cookie",
          "access_token=; Path=/; HttpOnly; Max-Age=0",
        );

        return res;
      }
    }

    return new NextResponse(err.message || "Fetch failed", {
      status: err.response?.status || 500,
    });
  }
}
