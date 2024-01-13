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

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async searchUsers(search: string, limit: number = 12) {
    return await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            twitterUsername: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      take: limit,
    });
  }

  async createTempUsers(
    users: {
      id: string;
      name: string;
      twitterUsername: string | null;
    }[],
  ) {
    return await prisma.user.createMany({
      data: users,
    });
  }
}

export const userRepository = new UserRepository();
