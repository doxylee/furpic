import jwt from "jsonwebtoken";
import serverSettings from "serverSettings";
import { Base64 } from "js-base64";

export function signJWT(userId: string, sessionId?: string) {
  if (!sessionId)
    sessionId = Base64.fromUint8Array(
      crypto.getRandomValues(new Uint8Array(16)),
    );
  const refreshExp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  return {
    access: jwt.sign(
      {
        userId,
        ses: sessionId,
      },
      serverSettings.SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1h",
        issuer: "https://furpic.net",
        audience: "https://furpic.net",
      },
    ),
    refresh: jwt.sign(
      {
        userId,
        ses: sessionId,
        exp: refreshExp,
      },
      serverSettings.SECRET,
      {
        algorithm: "HS256",
        issuer: "https://furpic.net",
        audience: "https://furpic.net",
      },
    ),
    sessionId,
    refreshExp: new Date(refreshExp * 1000),
  };
}
