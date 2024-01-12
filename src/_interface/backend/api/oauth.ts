import axios from "axios";
import { User } from "../entities/user";

export async function loginOAuth({
  code,
  codeVerifier,
  redirectUrl,
}: {
  code: string;
  codeVerifier: string;
  redirectUrl: string;
}) {
  const res = await axios.post("/api/oauth2/token", {
    code,
    codeVerifier,
    redirectUrl,
  });
  return res.data as User;
}
