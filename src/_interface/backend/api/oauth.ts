import axios from "axios";

export async function loginOAuth({
  code,
  codeVerifier,
  redirectUrl,
}: {
  code: string;
  codeVerifier: string;
  redirectUrl: string;
}) {
  return await axios.post("/api/oauth2/token", { code, codeVerifier, redirectUrl });
}
