import axios from "axios";
import { User } from "../entities/user";
import clientSettings from "clientSettings";

export async function loginOAuth({
  code,
  codeVerifier,
  redirectUri,
}: {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}) {
  const res = await axios.post(
    clientSettings.BACKEND_URL + "/oauth2/token",
    {
      code,
      codeVerifier,
      redirectUri,
    },
  );
  return res.data as User;
}
