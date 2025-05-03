// middleware/index.ts
import { NextRequest } from "next/server";

import { intlMiddleware } from "./intl";
import { adminGuard } from "./admin-guard";

export default async function combinedMiddleware(request: NextRequest) {
  const guardResponse = await adminGuard(request);

  if (guardResponse) return guardResponse;

  return intlMiddleware(request);
}
