import { CharacterWithUser } from "../entities/character";
import { fetchAPI } from "@/utils/fetch";

export async function fullSearchCharacters(
  query: string,
): Promise<CharacterWithUser[]> {
  return await fetchAPI({
    method: "GET",
    path: "characters/fullSearch",
    query: { query },
  });
}

export async function getMyCharacters(): Promise<CharacterWithUser[]> {
  return await fetchAPI({ method: "GET", path: "characters/mine" });
}

export async function updateCharacter({
  id,
  nameKo,
  nameEn,
  species,
  image,
}: {
  id: string;
  nameKo?: string | null;
  nameEn?: string | null;
  species?: string | null;
  image?: File;
}): Promise<CharacterWithUser> {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("data", JSON.stringify({ nameKo, nameEn, species }));
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
  image,
}: {
  nameKo?: string | null;
  nameEn?: string | null;
  species?: string | null;
  image?: File;
}): Promise<CharacterWithUser> {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("data", JSON.stringify({ nameKo, nameEn, species }));
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
}): Promise<CharacterWithUser[]> {
  return await fetchAPI({
    method: "GET",
    path: "characters",
    query: { userId, username, limit, offset },
  });
}