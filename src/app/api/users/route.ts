// nextjs route handler for searching users with term

import { presentUser } from "@/_backend/presenters/user";
import { userRepository } from "@/_backend/repositories/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query)
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  return NextResponse.json(
    (await userRepository.searchUsers(query)).map(presentUser),
  );
}
