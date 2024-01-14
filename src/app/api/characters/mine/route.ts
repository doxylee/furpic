import { presentCharacterWithUser } from "@/_backend/presenters/character";
import { characterRepository } from "@/_backend/repositories/character";
import { verifyJWT } from "@/_backend/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const jwt = await verifyJWT();
    if (!jwt)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { userId } = jwt;

  return NextResponse.json(
    (await characterRepository.getMyCharacters(userId, 12)).map(
      presentCharacterWithUser,
    ),
  );
}
