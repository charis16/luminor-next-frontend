import { NextRequest, NextResponse } from "next/server";
import { parse, serialize } from "cookie";

import { goFetcher, safeRawCall } from "@/utils/api";

interface FetchWithRefreshOptions {
  req: NextRequest;
  input: string | URL;
  init?: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  };
  retryBody?: any;
  retryHeaders?: Record<string, string>;
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
  retryBody,
  retryHeaders,
  retry = true,
}: FetchWithRefreshOptions): Promise<NextResponse> {
  const accessCookie = getFilteredCookie(req, ["admin_access_token"]);
  const refreshCookie = getFilteredCookie(req, ["admin_refresh_token"]);

  const makeRequest = (cookieHeader: string, body: any, headers: any) => {
    return goFetcher.raw(input.toString(), init.method || "GET", {
      data: body,
      headers: {
        ...headers,
        Cookie: cookieHeader,
      },
    });
  };

  // === First attempt
  const [res, reqErr] = await safeRawCall(
    makeRequest(accessCookie, init.body, init.headers || {}),
  );

  if (res && res.status !== 401) {
    return new NextResponse(JSON.stringify(res.data), {
      status: res.status,
      headers: {
        "Content-Type": res.headers["content-type"] || "application/json",
      },
    });
  }

  // === Refresh token attempt
  if (reqErr?.status === 401 && retry) {
    const [refreshRes, refreshErr] = await safeRawCall(
      goFetcher.raw(
        `${process.env.API_BASE_URL}/v1/api/auth/admin-refresh-token`,
        "POST",
        { headers: { Cookie: refreshCookie } },
      ),
    );

    if (refreshErr || !refreshRes || refreshRes.status !== 200) {
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: 401 },
      );
    }

    const newCookies = refreshRes.headers["set-cookie"];
    const cookiesArray = Array.isArray(newCookies) ? newCookies : [newCookies];
    const refreshedCookieHeader = cookiesArray
      .map((c) => (c ?? "").split(";")[0])
      .join("; ");

    const [retryRes, retryErr] = await safeRawCall(
      makeRequest(refreshedCookieHeader, retryBody, retryHeaders || {}),
    );

    if (retryErr || !retryRes) {
      return NextResponse.json(
        {
          error: retryErr?.message || "Retry after refresh failed",
          status: retryErr?.status || 500,
        },
        { status: retryErr?.status || 500 },
      );
    }

    const finalRes = new NextResponse(JSON.stringify(retryRes.data), {
      status: retryRes.status,
      headers: {
        "Content-Type": retryRes.headers["content-type"] || "application/json",
      },
    });

    cookiesArray.forEach((cookie) => {
      if (cookie) finalRes.headers.append("Set-Cookie", cookie);
    });

    return finalRes;
  }

  return NextResponse.json(
    { error: reqErr?.message || "Fetch failed" },
    { status: reqErr?.status || 500 },
  );
}
