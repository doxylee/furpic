import { PictureType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PictureRepository {
  async createPicture({
    id,
    type,
    image,
    uploaderId,
    authors,
    characters,
  }: {
    id: string;
    type: PictureType;
    image: string;
    uploaderId: string;
    authors: string[];
    characters: string[];
  }) {
    return await prisma.picture.create({
      data: {
        id,
        type,
        image,
        uploaderId,
        authors: {
          create: authors.map((authorId) => ({
            userId: authorId,
          })),
        },
        characters: {
          create: characters.map((characterId) => ({
            characterId,
          })),
        },
      },
    });
  }
}

export const pictureRepository = new PictureRepository();
