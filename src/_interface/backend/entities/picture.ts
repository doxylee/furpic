import { CharacterWithUser } from "./character";
import { User } from "./user";

export type PictureType = "drawing" | "photo";

export type PictureWithConnections = {
  id: string;
  type: PictureType;
  smImage: string;
  mdImage: string;
  uploaderId: string | null;
  uploader: User | null;
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
  viewCount: number;
  authors: User[];
  characters: CharacterWithUser[];
};
