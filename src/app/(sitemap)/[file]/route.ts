import { getCharacters } from "@/_interface/backend/api/characters";
import { getPictures } from "@/_interface/backend/api/pictures";
import { getUsers } from "@/_interface/backend/api/user";
import { generateSitemap } from "@/app/(sitemap)/utils";
import { NextRequest, NextResponse } from "next/server";

const SPLIT_SIZE = 120;

type PropsContext = {
  params: { file?: string };
};

export async function GET(request: NextRequest, { params }: PropsContext) {
  if (params.file === "main.xml")
    return generateSitemap([
      { url: "/" },
      { url: "/drawings" },
      { url: "/photos" },
      { url: "/characters" },
    ]);

  const match = params.file?.match(/^(\w+?)_(\d+)\.xml$/);
  if (!match) return new NextResponse("Not Found", { status: 404 });
  if (!["characters", "pictures", "users"].includes(match[1]))
    return new NextResponse("Not Found", { status: 404 });

  switch (match[1]) {
    case "characters":
      return await getCharactersSitemap(+match[2]);
    case "pictures":
      return await getPicturesSitemap(+match[2]);
    case "users":
      return await getUsersSitemap(+match[2]);
    default:
      return new NextResponse("Not Found", { status: 404 });
  }
}

async function getCharactersSitemap(idx: number) {
  const res = await getCharacters({
    limit: SPLIT_SIZE,
    offset: idx * SPLIT_SIZE,
  });

  return generateSitemap(
    res.results.map((character) => ({
      url: `/characters/${character.id}`,
      lastModified: character.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    })),
  );
}

async function getPicturesSitemap(idx: number) {
  const res = await getPictures({
    limit: SPLIT_SIZE,
    offset: idx * SPLIT_SIZE,
  });

  return generateSitemap(
    res.results.map((picture) => ({
      url: `/pictures/${picture.id}`,
      lastModified: picture.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    })),
  );
}

async function getUsersSitemap(idx: number) {
  const res = await getUsers({
    limit: SPLIT_SIZE,
    offset: idx * SPLIT_SIZE,
  });

  return generateSitemap(
    res.results.map((user) => ({
      url: `/users/${user.id}`,
      lastModified: user.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    })),
  );
}
