import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async getUserByTwitterId(twitterId: string) {
    return await prisma.user.findUnique({
      where: {
        twitterId,
      },
    });
  }
}

export const userRepository = new UserRepository();
