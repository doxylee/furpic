import { Character,  User } from "@prisma/client";
import { prisma } from "../prisma/client";

export type PrismaCharacterWithUser = Character & { user: User | null };

export class CharacterRepository {
  async createTempCharacters(
    characters: {
      id: string;
      nameKo: string | null;
      nameEn: string | null;
      species: string | null;
      userId: string | null;
      image: string | null;
    }[],
  ) {
    return await prisma.character.createMany({
      data: characters,
    });
  }

  async searchCharactersAndInUsers(
    search: string,
    limit: number = 12,
  ): Promise<PrismaCharacterWithUser[]> {
    return await prisma.character.findMany({
      where: {
        OR: [
          {
            nameKo: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            nameEn: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            user: {
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
          },
        ],
      },
      take: limit,
      include: {
        user: true,
      },
    });
  }

  async getMyCharacters(userId: string, limit:number): Promise<PrismaCharacterWithUser[]> {
    return await prisma.character.findMany({
      where: {
        userId,
      },
      take: limit,
      include: {
        user: true,
      },
    });
  }
}

export const characterRepository = new CharacterRepository();
