import { presentUser } from "@/_backend/presenters/user";
import { userRepository } from "@/_backend/repositories/user";
import { verifyJWT } from "@/_backend/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jwt = await verifyJWT();
  if (!jwt) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { userId } = jwt;
  const user = await userRepository.getUserById(userId);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(presentUser(user));
}
