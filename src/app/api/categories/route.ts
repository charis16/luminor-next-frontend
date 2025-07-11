import { fetchWithoutAuth } from "@/server/fetch-without-auth";

const backendBaseUrl = process.env.API_BASE_URL!;

export async function GET() {
  return fetchWithoutAuth({
    input: `${backendBaseUrl}/v1/api/categories/options`,
    method: "GET",
  });
}
