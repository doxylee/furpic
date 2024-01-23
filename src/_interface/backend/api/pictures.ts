import { PictureWithConnections } from "../entities/picture";
import { fetchAPI } from "@/utils/fetch";

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
  return (await fetchAPI({
    method: "POST",
    path: "pictures",
    body: formData,
  })) as PictureWithConnections;
}

export async function getRecentPictures() {
  return (await fetchAPI({
    method: "GET",
    path: "pictures/recent",
  })) as PictureWithConnections[];
}

export async function getPictureById(id: string) {
  return (await fetchAPI({
    method: "GET",
    path: `pictures/${id}`,
  })) as PictureWithConnections;
}

export async function getPictures({
  authorId,
  authorUsername,
  characterId,
  type,
  limit,
  offset,
}: {
  authorId?: string;
  authorUsername?: string;
  characterId?: string;
  type?: "drawing" | "photo";
  limit?: number;
  offset?: number;
}) {
  return (await fetchAPI({
    method: "GET",
    path: "pictures",
    query: { authorId, authorUsername, characterId, type, limit, offset },
  })) as PictureWithConnections[];
}
