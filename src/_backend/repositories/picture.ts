import { PictureType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PictureRepository {
  async createPicture(picture: { id: string; type: PictureType; image: string, uploaderId: string }) {
    return await prisma.picture.create({
      data: picture,
    });
  }
}

export const pictureRepository = new PictureRepository();
