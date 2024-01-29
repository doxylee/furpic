import { PercentCrop } from "react-image-crop";
import { User } from "./user";

export type Character = {
  id: string;
  userId: string | null;
  nameKo: string | null;
  nameEn: string | null;
  species: string | null;
  xsImage: string | null;
  smImage: string | null;
  crop: PercentCrop | null;
};

export type CharacterWithUser = Character & {
  user?: User | null;
};
