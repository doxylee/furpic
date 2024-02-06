import { PercentCrop } from "react-image-crop";
import { CharacterWithUser } from "./character";
import { User } from "./user";

export type PictureType = "drawing" | "photo";

export type PictureWithConnections = {
  id: string;
  type: PictureType;
  smImage: string;
  mdImage: string;
  crop: PercentCrop | null;
  uploaderId: string | null;
  uploader: User | null;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  viewCount: number;
  authors: User[];
  characters: CharacterWithUser[];
  liked?: boolean;
};

export type PictureWithConnectionsAndLiked = PictureWithConnections & {
  liked?: boolean;
};
