import axios from "axios";
import clientSettings from "clientSettings";
import { NextRequest, NextResponse } from "next/server";
import serverSettings from "serverSettings";
import { TwitterApi } from "twitter-api-v2";

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
  const user = await client.currentUserV2();

  

  console.log(user.data);
  return NextResponse.json(user.data);
}
