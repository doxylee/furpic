import { NextResponse } from "next/server";

const BASE_URL = "https://furpic.net";

export function generateSitemapIndex(
  sitemaps: { url: string; lastModified?: string }[],
) {
  const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (postUrl) => `  <sitemap>
    <loc>${BASE_URL}/${postUrl.url}</loc>
    <lastmod>${postUrl.lastModified || new Date().toISOString()}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xmlStr, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
    },
  });
}

export function generateSitemap(
  sitemap: {
    url: string;
    lastModified?: string;
    changeFreq?: string;
    priority?: number;
  }[],
) {
  const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
  .map(
    (postUrl) => `  <url>
    <loc>${BASE_URL}/${postUrl.url}</loc>
    <lastmod>${postUrl.lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${postUrl.changeFreq || "daily"}</changefreq>
    <priority>${postUrl.priority || 0.8}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;
  return new NextResponse(xmlStr, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
    },
  });
}
