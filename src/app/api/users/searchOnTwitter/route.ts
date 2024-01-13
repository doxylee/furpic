import { verifyJWT } from "@/_backend/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import serverSettings from "serverSettings";
import { TwitterApi } from "twitter-api-v2";


export async function GET(request: NextRequest) {
  return NextResponse.json({ error: "Not implemented due to paid API" }, { status: 501 });
  if (!await verifyJWT()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const username = request.nextUrl.searchParams.get("username");
  if(!username) return NextResponse.json({error: "No username provided"}, {status: 400});

  const client = new TwitterApi(serverSettings.TWITTER_BEARER_TOKEN);

  const userRes = await client.v2.userByUsername(username);

  return NextResponse.json(userRes.data);
}
