import { NextRequest } from "next/server";

export function getClientIP(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0] || realIP || "";
}
