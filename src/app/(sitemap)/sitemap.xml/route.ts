import { getCharacters } from "@/_interface/backend/api/characters";
import { getPictures } from "@/_interface/backend/api/pictures";
import { getUsers } from "@/_interface/backend/api/user";
import { generateSitemapIndex } from "../utils";

const SPLIT_SIZE = 120;

export async function GET() {
  const sitemaps = [{ url: "sitemap/main.xml" }];

  const pRes = await getPictures({});
  const pCount = Math.ceil(pRes.count / SPLIT_SIZE);
  sitemaps.push(...Array.from({ length: pCount }, (_, i) => ({ url: `sitemap/pictures/${i}.xml` })));

  const cRes = await getCharacters({});
  const cCount = Math.ceil(cRes.count / SPLIT_SIZE);
  sitemaps.push(...Array.from({ length: cCount }, (_, i) => ({ url: `sitemap/characters/${i}.xml` })));

  const uRes = await getUsers({});
  const uCount = Math.ceil(uRes.count / SPLIT_SIZE);
  sitemaps.push(...Array.from({ length: uCount }, (_, i) => ({ url: `sitemap/users/${i}.xml` })));

  return generateSitemapIndex(sitemaps)
}
