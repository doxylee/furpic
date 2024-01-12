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

  async createUser(user: {
    twitterId: string;
    twitterUsername: string;
    name: string;
    username: string;
  }) {
    return await prisma.user.create({
      data: user,
    });
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}

export const userRepository = new UserRepository();
