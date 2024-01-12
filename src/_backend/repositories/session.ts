import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SessionRepository {
  async createSession({
    id,
    userId,
    expires,
  }: {
    id: string;
    userId: string;
    expires: Date;
  }) {
    return await prisma.session.create({
      data: {
        id,
        userId,
        expires,
      },
    });
  }

  async validateSession(id: string, userId: string) {
    return !!(await prisma.session.findFirst({
      where: {
        id,
        userId,
      },
    }));
  }

  async updateSessionExpiration(id: string, userId: string, expires: Date) {
    await prisma.session.update({
      where: { id, userId },
      data: { expires },
    });
  }
}

export const sessionRepository = new SessionRepository();
