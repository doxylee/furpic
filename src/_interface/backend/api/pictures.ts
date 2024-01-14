import axios from "axios";
import { PictureWithConnections } from "../entities/picture";

export type TempUserData = { name: string; twitterUsername: string | null };
export type AuthorLink = { id: string } | TempUserData;

export type TempCharacterData = {
  nameKo: string | null;
  nameEn: string | null;
  species: string | null;
  mine: boolean;
  setImage: boolean;
};

export type CharacterLink = { id: string } | TempCharacterData;

export type UploadPictureData = {
  type: "drawing" | "photo";
  authors: AuthorLink[];
  characters: CharacterLink[];
};

export type UploadPictureParams = {
  image: File;
} & UploadPictureData;
export async function uploadPicture({
  image,
  type,
  authors,
  characters,
}: UploadPictureParams) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("data", JSON.stringify({ type, authors, characters }));
  const res = await axios.post("/api/pictures", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function getRecentPictures(): Promise<PictureWithConnections[]> {
  try {
    const res = await axios.get(`/api/pictures/recent`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
