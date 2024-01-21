import { User as PrismaUser } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  username: string | null;
  twitterUsername: string | null;
  imageURL: string | null;
};