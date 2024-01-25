import { User } from "./user";

export type Character = {
  id: string;
  userId: string | null;
  nameKo: string | null;
  nameEn: string | null;
  species: string | null;
  xsImage: string | null;
  smImage: string | null;
};

export type CharacterWithUser = Character & {
  user?: User | null;
};
