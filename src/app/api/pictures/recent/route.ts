import { presentPictureWithConnections } from "@/_backend/presenters/picture";
import { pictureRepository } from "@/_backend/repositories/picture";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    (await pictureRepository.getRecentPictures({ limit: 36 })).map(
      presentPictureWithConnections,
    ),
  );
}
