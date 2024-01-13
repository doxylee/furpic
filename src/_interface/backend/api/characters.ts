import axios from "axios";
import { CharacterWithUser } from "../entities/character";

export async function fullSearchCharacters(query: string): Promise<CharacterWithUser[]> {
  try {
    const res = await axios.get(`/api/characters/fullSearch?query=${query}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
