import axios from "axios";

export type TempUserData = { name: string; twitterUsername: string | null };
export type AuthorLink = { id: string } | TempUserData;

export type UploadPictureData = {
  type: "drawing" | "photo";
  authors: AuthorLink[];
};

export type UploadPictureParams = {
  image: File;
} & UploadPictureData;
export async function uploadPicture({
  image,
  type,
  authors,
}: UploadPictureParams) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("data", JSON.stringify({ type, authors }));
  const res = await axios.post("/api/pictures", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
