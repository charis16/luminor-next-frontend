import { cookies } from "next/headers";

export async function getAuthCookieHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();

  const access = cookieStore.get("access_token")?.value;
  const refresh = cookieStore.get("refresh_token")?.value;

  const pairs = [];

  if (access) pairs.push(`access_token=${access}`);
  if (refresh) pairs.push(`refresh_token=${refresh}`);

  return pairs.length > 0 ? { cookie: pairs.join("; ") } : {};
}
