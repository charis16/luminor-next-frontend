import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://luminorpictures.com";
  const now = new Date().toISOString();

  const staticUrls = [`${baseUrl}/`, `${baseUrl}/about`];

  const [categoriesRes, teamsRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, {
      cache: "no-store",
    }),
    fetch(`${baseUrl}/api/team-members`, {
      cache: "no-store",
    }),
  ]);

  const handleJson = async (res: Response) => {
    if (!res.ok) {
      const text = await res.text();

      throw new Error(`Fetch failed: ${res.status} - ${text}`);
    }

    return res.json();
  };
  const categories = await handleJson(categoriesRes);
  const teams = await handleJson(teamsRes);

  const categoryUrls = categories.data.map(
    (cat: any) => `${baseUrl}/category/${cat.slug}`,
  );
  const teamUrls = teams.data.map((team: any) => `${baseUrl}/${team.slug}`);

  const urls = [...staticUrls, ...categoryUrls, ...teamUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
