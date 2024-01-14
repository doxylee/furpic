import { CharacterWithUser } from "@/_interface/backend/entities/character";
import serverSettings from "serverSettings";
import { presentUser } from "./user";
import { PrismaCharacterWithUser } from "../repositories/character";

export function presentCharacterWithUser(
  character: PrismaCharacterWithUser,
): CharacterWithUser {
  return {
    id: character.id,
    userId: character.userId,
    nameKo: character.nameKo,
    nameEn: character.nameEn,
    species: character.species,
    imageURL:
      character.image && `${serverSettings.R2_ACCESS_URL}/${character.image}`,
    user: character.user ? presentUser(character.user) : null,
  };
}
