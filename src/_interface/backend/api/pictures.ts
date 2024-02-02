import { ImageCrop } from "@/components/ImageUploadInput";
import {
  PictureWithConnections,
  PictureWithConnectionsAndLiked,
} from "../entities/picture";
import { fetchAPI } from "@/utils/fetch";

export type TempUserData = { name: string; twitterUsername: string | null };
export type UserLink = { id: string } | TempUserData;

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
  authors: UserLink[];
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
  })) as PictureWithConnectionsAndLiked;
}

export type UpdatePictureParams = {
  id: string;
  image?: ImageCrop;
  type?: "drawing" | "photo";
  addAuthors?: UserLink[];
  removeSelf?: boolean;
  addCharacters?: CharacterLink[];
  removeCharacterIds?: string[];
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

export async function getPictureById(id: string) {
  return (await fetchAPI({
    method: "GET",
    path: `pictures/${id}`,
  })) as PictureWithConnectionsAndLiked;
}

export async function getPictures(
  query: {
    authorId?: string;
    authorUsername?: string;
    characterId?: string;
    type?: "drawing" | "photo";
    limit?: number;
    offset?: number;
    order?: string;
  },
  cookie?: string,
) {
  return (await fetchAPI({
    method: "GET",
    path: "pictures",
    query,
    cookie,
  })) as { count: number; results: PictureWithConnectionsAndLiked[] };
}

export async function getLikedPictures(
  query: {
    likedById?: string;
    likedByUsername?: string;
    authorId?: string;
    authorUsername?: string;
    characterId?: string;
    type?: "drawing" | "photo";
    limit?: number;
    offset?: number;
    order?: string;
  },
  cookie?: string,
) {
  return (await fetchAPI({
    method: "GET",
    path: "pictures/liked",
    query,
    cookie,
  })) as { count: number; results: PictureWithConnectionsAndLiked[] };
}

export async function likePicture(id: string) {
  return (await fetchAPI({
    method: "POST",
    path: `pictures/${id}/like`,
  })) as PictureWithConnectionsAndLiked;
}

export async function unlikePicture(id: string) {
  return (await fetchAPI({
    method: "DELETE",
    path: `pictures/${id}/like`,
  })) as PictureWithConnectionsAndLiked;
}
