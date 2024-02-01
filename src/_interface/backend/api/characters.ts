import { ImageCrop } from "@/components/ImageUploadInput";
import { CharacterWithUser } from "../entities/character";
import { fetchAPI } from "@/utils/fetch";
import { UserItem } from "@/components/SelectUsers";
import { UserLink } from "./pictures";

export async function fullSearchCharacters(
  query: string,
): Promise<CharacterWithUser[]> {
  return await fetchAPI({
    method: "GET",
    path: "characters/fullSearch",
    query: { query },
  });
}

export async function updateCharacter({
  id,
  nameKo,
  nameEn,
  species,
  bio,
  image,
  designers,
}: {
  id: string;
  nameKo?: string | null;
  nameEn?: string | null;
  species?: string | null;
  bio?: string;
  image?: ImageCrop;
  designers?: UserLink[];
}): Promise<CharacterWithUser> {
  const formData = new FormData();
  if (image?.image) formData.append("image", image.image);
  formData.append(
    "data",
    JSON.stringify({
      nameKo,
      nameEn,
      species,
      crop: image?.crop,
      bio,
      designers,
    }),
  );
  return await fetchAPI({
    method: "PATCH",
    path: `characters/${id}`,
    body: formData,
  });
}

export async function createCharacter({
  nameKo,
  nameEn,
  species,
  bio,
  image,
  designers,
}: {
  nameKo?: string | null;
  nameEn?: string | null;
  species?: string | null;
  bio?: string;
  image?: ImageCrop;
  designers?: UserLink[];
}): Promise<CharacterWithUser> {
  const formData = new FormData();
  if (image?.image) formData.append("image", image.image);
  formData.append(
    "data",
    JSON.stringify({
      nameKo,
      nameEn,
      species,
      crop: image?.crop,
      bio,
      designers,
    }),
  );
  return await fetchAPI({
    method: "POST",
    path: "characters",
    body: formData,
  });
}

export async function getCharacters({
  userId,
  username,
  limit,
  offset,
}: {
  userId?: string;
  username?: string;
  limit?: number;
  offset?: number;
}): Promise<{ count: number; results: CharacterWithUser[] }> {
  return await fetchAPI({
    method: "GET",
    path: "characters",
    query: { userId, username, limit, offset },
  });
}

export async function getCharacterById(id: string): Promise<CharacterWithUser> {
  return await fetchAPI({
    method: "GET",
    path: `characters/${id}`,
  });
}
