import jwt, { JwtPayload } from "jsonwebtoken";
import serverSettings from "serverSettings";
import { cookies } from "next/headers";
import { sessionRepository } from "../repositories/session";
import { signJWT } from "./jwt";

export function setJWT(userId: string, sessionId_?: string) {
  const { access, refresh, sessionId, refreshExp } = signJWT(
    userId,
    sessionId_,
  );
  if (sessionId_)
    sessionRepository.updateSessionExpiration(sessionId, userId, refreshExp);
  else
    sessionRepository.createSession({
      id: sessionId,
      userId,
      expires: refreshExp,
    });
  cookies().set("access", access, {
    secure: true,
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 15),
  });
  cookies().set("refresh", refresh, {
    secure: true,
    httpOnly: true,
    path: "/",
    expires: refreshExp,
  });
  return { sessionId, userId, refreshExp };
}

export async function verifyJWT() {
  const access = cookies().get("access");
  if (access) {
    try {
      const payload = jwt.verify(access.value, serverSettings.SECRET, {
        issuer: "https://furpic.net",
        audience: "https://furpic.net",
      }) as JwtPayload;
      return { userId: payload.userId, ses: payload.ses };
    } catch (e) {
      //
    }
  }

  const refresh = cookies().get("refresh");
  if (refresh) {
    try {
      const payload = jwt.verify(refresh.value, serverSettings.SECRET, {
        issuer: "https://furpic.net",
        audience: "https://furpic.net",
      }) as JwtPayload;

      if (!sessionRepository.validateSession(payload.ses, payload.userId))
        return null;

      await setJWT(payload.userId, payload.ses);

      return { userId: payload.userId, ses: payload.ses };
    } catch (e) {
      return null;
    }
  }
  return null;
}
