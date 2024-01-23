import { fetchAPI } from "@/utils/fetch";

export async function loginOAuth({
  code,
  codeVerifier,
  redirectUri,
}: {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}) {
  return await fetchAPI({
    method: "POST",
    path: "oauth/login",
    body: {
      code,
      codeVerifier,
      redirectUri,
    },
  });
}
