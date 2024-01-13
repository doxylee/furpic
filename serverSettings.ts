const serverSettings = {
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN!,
  TWITTER_OAUTH_CLIENT_SECRET: process.env.TWITTER_OAUTH_CLIENT_SECRET!,
  SECRET: process.env.SECRET!,
  R2_URL: process.env.R2_URL!,
  R2_ACCESS_KEY: process.env.R2_ACCESS_KEY!,
  R2_SECRET_KEY: process.env.R2_SECRET_KEY!,
  R2_BUCKET: process.env.R2_BUCKET!,
  R2_ACCESS_URL: process.env.R2_ACCESS_URL!,
};

export default serverSettings;
