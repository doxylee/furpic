import { userRepository } from "@/_backend/repositories/user";
import { verifyJWT } from "@/_backend/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jwt = await verifyJWT();
  if (!jwt) return { status: 401 };
  const { userId } = jwt;
  return NextResponse.json(await userRepository.getUserById(userId));
}
