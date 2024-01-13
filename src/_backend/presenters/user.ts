import { User } from "@prisma/client";

export function presentUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    twitterId: user.twitterId,
    twitterUsername: user.twitterUsername,
    pictureId: user.pictureId
  };
}