import { PercentCrop } from "react-image-crop";
import { User } from "./user";

export type Character = {
  id: string;
  userId: string | null;
  nameKo: string | null;
  nameEn: string | null;
  alias: string;
  species: string | null;
  bio: string;
  xsImage: string | null;
  smImage: string | null;
  crop: PercentCrop | null;
};

export type CharacterWithUser = Character & {
  user?: User | null;
  designers: User[];
};
