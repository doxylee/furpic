import { ImageCrop } from "@/components/ImageUploadInput";
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
  image: ImageCrop;
} & UploadPictureData;
export async function uploadPicture({
  image,
  type,
  authors,
  characters,
}: UploadPictureParams) {
  const formData = new FormData();
  formData.append("image", image.image!);
  formData.append(
    "data",
    JSON.stringify({ type, authors, characters, crop: image.crop }),
  );
  return (await fetchAPI({
    method: "POST",
    path: "pictures",
    body: formData,
  })) as PictureWithConnections;
}

export type UpdatePictureParams = {
  id: string;
  image?: ImageCrop;
  type: "drawing" | "photo";
  addAuthors: AuthorLink[];
  removeSelf: boolean;
  addCharacters: CharacterLink[];
  removeCharacterIds: string[];
};

export async function updatePicture({
  id,
  image,
  type,
  addAuthors,
  removeSelf,
  addCharacters,
  removeCharacterIds,
}: UpdatePictureParams) {
  const formData = new FormData();
  if (image) formData.append("image", image.image!);
  formData.append(
    "data",
    JSON.stringify({
      type,
      crop: image?.crop,
      addAuthors,
      removeSelf,
      addCharacters,
      removeCharacterIds,
    }),
  );

  return (await fetchAPI({
    method: "PATCH",
    path: `pictures/${id}`,
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
