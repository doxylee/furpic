import { ImageCrop } from "@/components/ImageUploadInput";
import { CharacterWithUser } from "../entities/character";
import { fetchAPI } from "@/utils/fetch";
import { UserLink } from "./pictures";

export async function updateCharacter({
  id,
  nameKo,
  nameEn,
  alias,
  species,
  speciesDetail,
  bio,
  image,
  designers,
}: {
  id: string;
  nameKo?: string | null;
  nameEn?: string | null;
  alias?: string;
  species?: string[];
  speciesDetail?: string | null;
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
      alias,
      species,
      speciesDetail,
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
  alias,
  species,
  speciesDetail,
  bio,
  image,
  designers,
}: {
  nameKo?: string | null;
  nameEn?: string | null;
  alias?: string;
  species?: string[];
  speciesDetail?: string | null;
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
      alias,
      species,
      speciesDetail,
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
  query,
  limit,
  offset,
}: {
  userId?: string;
  username?: string;
  query?: string;
  limit?: number;
  offset?: number;
}): Promise<{ count: number; results: CharacterWithUser[] }> {
  return await fetchAPI({
    method: "GET",
    path: "characters",
    query: { userId, username, query, limit, offset },
  });
}

export async function getCharacterById(id: string): Promise<CharacterWithUser> {
  return await fetchAPI({
    method: "GET",
    path: `characters/${id}`,
  });
}
