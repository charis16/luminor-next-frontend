import { cookies } from "next/headers";

export async function getAuthCookieHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();

  const access = cookieStore.get("admin_access_token")?.value;
  const refresh = cookieStore.get("admin_refresh_token")?.value;

  const pairs = [];

  if (access) pairs.push(`admin_access_token=${access}`);
  if (refresh) pairs.push(`admin_refresh_token=${refresh}`);

  return pairs.length > 0 ? { cookie: pairs.join("; ") } : {};
}
