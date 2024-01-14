import {
  PictureType,
  PrismaClient,
  Picture,
  Character,
  PictureCharacter,
  PictureAuthor,
  User,
} from "@prisma/client";
import { prisma } from "../prisma/client";

export type PrismaPictureWithConnections = Picture & {
  uploader: User | null;
  authors: (PictureAuthor & { user: User })[];
  characters: (PictureCharacter & {
    character: Character & { user: User | null };
  })[];
};

export type PictureOrderByInput =
  | Partial<Record<keyof Picture, "asc" | "desc">>
  | Partial<Record<keyof Picture, "asc" | "desc">>[];

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

  async getRecentPictures({
    limit,
  }: {
    limit: number;
  }): Promise<PrismaPictureWithConnections[]> {
    return await prisma.picture.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        uploader: true,
        authors: { include: { user: true } },
        characters: { include: { character: { include: { user: true } } } },
      },
    });
  }

  async getPictureById(
    id: string,
  ): Promise<PrismaPictureWithConnections | null> {
    return await prisma.picture.findUnique({
      where: { id },
      include: {
        uploader: true,
        authors: { include: { user: true } },
        characters: { include: { character: { include: { user: true } } } },
      },
    });
  }

  async getUserAuthored({
    userId,
    username,
    type,
    limit,
    orderBy = { createdAt: "desc" },
  }: {
    userId?: string;
    username?: string;
    type?: PictureType;
    limit: number;
    orderBy?: PictureOrderByInput;
  }): Promise<PrismaPictureWithConnections[]> {
    return await prisma.picture.findMany({
      where: {
        authors: { some: userId ? { userId: userId } : { user: { username } } },
        type,
      },
      take: limit,
      orderBy,
      include: {
        uploader: true,
        authors: { include: { user: true } },
        characters: { include: { character: { include: { user: true } } } },
      },
    });
  }

  async getCharacterPictures({
    characterId,
    type,
    limit,
    orderBy = { createdAt: "desc" },
  }: {
    characterId: string;
    type?: PictureType;
    limit: number;
    orderBy?: PictureOrderByInput;
  }): Promise<PrismaPictureWithConnections[]> {
    return await prisma.picture.findMany({
      where: {
        characters: { some: { characterId } },
        type,
      },
      take: limit,
      orderBy,
      include: {
        uploader: true,
        authors: { include: { user: true } },
        characters: { include: { character: { include: { user: true } } } },
      },
    });
  }
}

export const pictureRepository = new PictureRepository();
