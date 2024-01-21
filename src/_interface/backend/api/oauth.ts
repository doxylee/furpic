import axios from "axios";
import { User } from "../entities/user";

export async function loginOAuth({
  code,
  codeVerifier,
  redirectUri,
}: {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}) {
  const res = await axios.post("/api/oauth2/token", {
    code,
    codeVerifier,
    redirectUri,
  });
  return res.data as User;
}
