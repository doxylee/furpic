import { getCharacters } from "@/_interface/backend/api/characters";
import { generateSitemap } from "@/app/(sitemap)/utils";
import { NextRequest, NextResponse } from "next/server";

const SPLIT_SIZE = 120;

type PropsContext = {
  params: { file?: string };
};

export async function GET(request: NextRequest, { params }: PropsContext) {
  const match = params.file?.match(/^(\d+)\.xml$/);
  if (!match) return new NextResponse("Not Found", { status: 404 });

  const res = await getCharacters({
    limit: SPLIT_SIZE,
    offset: +match[1] * SPLIT_SIZE,
  });

  return generateSitemap(
    res.results.map((picture) => ({
      url: `/characters/${picture.id}`,
      lastModified: picture.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    })),
  );
}
