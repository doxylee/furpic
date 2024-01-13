import { presentCharacterWithUser } from "@/_backend/presenters/character";
import { characterRepository } from "@/_backend/repositories/character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query)
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  return NextResponse.json(
    (await characterRepository.searchCharactersAndInUsers(query)).map(
      presentCharacterWithUser,
    ),
  );
}
