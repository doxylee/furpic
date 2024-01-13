import { Character, CharacterWithUser } from "@/_interface/backend/entities/character";
import { Character as PrismaCharacter, User as PrismaUser } from "@prisma/client";
import serverSettings from "serverSettings";
import { presentUser } from "./user";

export function presentCharacterWithUser(
  character: PrismaCharacter & { user: PrismaUser | null },
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
