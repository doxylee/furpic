import { Character, User } from "@prisma/client";
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

  async getCharacterById(id: string): Promise<PrismaCharacterWithUser | null> {
    return await prisma.character.findUnique({
      where: { id },
      include: {
        user: true,
      },
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

  async getCharactersOfUser({
    userId,
    username,
    limit,
  }: {
    userId?: string;
    username?: string;
    limit: number;
  }): Promise<PrismaCharacterWithUser[]> {
    return await prisma.character.findMany({
      where: userId ? { userId } : { user: { username } },
      take: limit,
      include: {
        user: true,
      },
    });
  }

  async updateCharacter({
    id,
    nameKo,
    nameEn,
    species,
    image,
    userId,
  }: {
    id: string;
    nameKo?: string | null;
    nameEn?: string | null;
    species?: string | null;
    image?: string | null;
    userId?: string;
  }): Promise<Character> {
    return await prisma.character.update({
      where: { id },
      data: {
        nameKo,
        nameEn,
        species,
        image,
        userId,
      },
    });
  }

  async createCharacter({
    userId,
    nameKo,
    nameEn,
    species,
    image,
  }: {
    userId: string;
    nameKo?: string | null;
    nameEn?: string | null;
    species?: string | null;
    image?: string | null;
  }) {
    return await prisma.character.create({
      data: {
        userId,
        nameKo,
        nameEn,
        species,
        image,
      },
    });
  }
}

export const characterRepository = new CharacterRepository();
