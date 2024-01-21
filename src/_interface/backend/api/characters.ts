import axios from "axios";
import { CharacterWithUser } from "../entities/character";

export async function fullSearchCharacters(
  query: string,
): Promise<CharacterWithUser[]> {
  try {
    const res = await axios.get(`/api/characters/fullSearch?query=${query}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}

export async function getMyCharacters(): Promise<CharacterWithUser[]> {
  try {
    const res = await axios.get(`/api/characters/mine`);
    return res.data;
  } catch (e) {
    throw e;
  }
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
  try {
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("data", JSON.stringify({ id, nameKo, nameEn, species }));
    const res = await axios.post("/api/pictures", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}

export function createCharacter({
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
  return axios
    .post("/api/characters", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}