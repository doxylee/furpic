import { PictureType, PrismaClient } from "@prisma/client";

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
}

export const characterRepository = new CharacterRepository();
