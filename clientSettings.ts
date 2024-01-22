const clientSettings = {
  TWITTER_OAUTH_CLIENT_ID: process.env
    .NEXT_PUBLIC_TWITTER_OAUTH_CLIENT_ID as string,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
};

export default clientSettings;
