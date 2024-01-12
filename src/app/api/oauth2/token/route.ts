import { userRepository } from "@/_backend/repositories/user";
import { signJWT } from "@/_backend/utils/jwt";
import axios from "axios";
import clientSettings from "clientSettings";
import { NextRequest, NextResponse } from "next/server";
import serverSettings from "serverSettings";
import { TwitterApi } from "twitter-api-v2";

import { cookies } from "next/headers";
import { sessionRepository } from "@/_backend/repositories/session";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const res = await axios.post(
    "https://api.twitter.com/2/oauth2/token",
    {
      grant_type: "authorization_code",
      code: body.code,
      code_verifier: body.codeVerifier,
      redirect_uri: body.redirectUrl,
    },
    {
      auth: {
        username: clientSettings.TWITTER_OAUTH_CLIENT_ID,
        password: serverSettings.TWITTER_OAUTH_CLIENT_SECRET,
      },
    },
  );
  console.log(res.status, res.statusText);
  console.log(res.data);

  const client = new TwitterApi(res.data.access_token);
  const userRes = await client.currentUserV2();

  let user = await userRepository.getUserByTwitterId(userRes.data.id);

  // TODO: Profile image
  if (!user) {
    let username = userRes.data.username;
    while (await userRepository.getUserByUsername(username)) {
      username = `${userRes.data.username}${Math.floor(Math.random() * 999)}`;
    }
    user = await userRepository.createUser({
      twitterId: userRes.data.id,
      name: userRes.data.name,
      username: username,
    });
  }

  const { access, refresh, sessionId, refreshExp } = signJWT(user.id);
  await sessionRepository.createSession({
    id: sessionId,
    userId: user.id,
    expires: refreshExp,
  });
  cookies().set("access", access, { secure: true, httpOnly: true, path: "/" });
  cookies().set("refresh", refresh, {
    secure: true,
    httpOnly: true,
    path: "/",
  });

  console.log(userRes.data);
  return NextResponse.json(userRes.data);
}
