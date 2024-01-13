import { Character, PictureType, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

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
  ): Promise<(Character & { user: User | null })[]> {
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
}

export const characterRepository = new CharacterRepository();
