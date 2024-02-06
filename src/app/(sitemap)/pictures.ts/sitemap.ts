import { getPictures } from "@/_interface/backend/api/pictures";
import { MetadataRoute } from "next";

const SPLIT_SIZE = 120;

export async function generateSitemaps() {
  const res = await getPictures({});
  const numSitemaps = Math.ceil(res.count / SPLIT_SIZE);
  return Array.from({ length: numSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const res = await getPictures({ limit: SPLIT_SIZE, offset: id * SPLIT_SIZE });
  return res.results.map((picture) => ({
    url: `/pictures/${picture.id}`,
    lastModified: picture.updatedAt,
    changeFrequency: "weekly",
    priority: 1,
  }));
}
