import axios from "axios";

export type UploadPictureParams = {
  image: File;
  type: "drawing" | "photo";
};
export async function uploadPicture({ image, type }: UploadPictureParams) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("data", JSON.stringify({ type }));
  const res = await axios.post("/api/pictures", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
