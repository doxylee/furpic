import { PercentCrop } from "react-image-crop";

export type User = {
  id: string;
  name: string;
  username: string | null;
  twitterUsername: string | null;
  alias: string;
  bio: string;
  xsImage: string | null;
  smImage: string | null;
  crop: PercentCrop | null;
  createdAt: string;
  updatedAt: string;
};
