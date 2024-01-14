import { pictureRepository } from "@/_backend/repositories/picture";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const picture = await pictureRepository.getPictureById(id);
  if (!picture)
    return NextResponse.json({ error: "Picture not found" }, { status: 404 });
  return NextResponse.json(picture);
}
