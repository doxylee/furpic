import { User } from "@/_interface/backend/entities/user";
import { User as PrismaUser } from "@prisma/client";
import serverSettings from "serverSettings";

export function presentUser(user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    twitterUsername: user.twitterUsername,
    pictureURL:
      user.pictureId && `${serverSettings.R2_ACCESS_URL}/${user.pictureId}`,
  };
}
