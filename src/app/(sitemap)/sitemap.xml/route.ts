import { getCharacters } from "@/_interface/backend/api/characters";
import { getPictures } from "@/_interface/backend/api/pictures";
import { getUsers } from "@/_interface/backend/api/user";
import { generateSitemapIndex } from "../utils";

const SPLIT_SIZE = 120;

export async function GET() {
  // Weird bug with local build. Fetch fails for some reason.
  if (process.env.VERCEL_ENV === "development")
    return new Response("Not Found", { status: 404 });

  const sitemaps = [{ url: "/main.xml" }];

  const pRes = await getPictures({});
  const pCount = Math.ceil(pRes.count / SPLIT_SIZE);
  sitemaps.push(
    ...Array.from({ length: pCount }, (_, i) => ({
      url: `/pictures_${i}.xml`,
    })),
  );

  const cRes = await getCharacters({});
  const cCount = Math.ceil(cRes.count / SPLIT_SIZE);
  sitemaps.push(
    ...Array.from({ length: cCount }, (_, i) => ({
      url: `/characters_${i}.xml`,
    })),
  );

  const uRes = await getUsers({});
  const uCount = Math.ceil(uRes.count / SPLIT_SIZE);
  sitemaps.push(
    ...Array.from({ length: uCount }, (_, i) => ({
      url: `/users_${i}.xml`,
    })),
  );

  return generateSitemapIndex(sitemaps);
}
