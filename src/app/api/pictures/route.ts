import { pictureRepository } from "@/_backend/repositories/picture";
import { userRepository } from "@/_backend/repositories/user";
import { verifyJWT } from "@/_backend/utils/auth";
import { uploadFileR2 } from "@/_backend/utils/r2";
import { uuid } from "@/_backend/utils/uuid";
import {
  TempUserData,
  UploadPictureData,
} from "@/_interface/backend/api/pictures";
import { NextRequest, NextResponse } from "next/server";

// Take formdata from request.body. There is a file named image and json named data.
export async function POST(request: NextRequest) {
  const jwt = await verifyJWT();
  if (!jwt) return { status: 401 };
  const { userId } = jwt;
  const formData = await request.formData();
  const image = formData.get("image") as File | null;
  const dataStr = formData.get("data");
  if (!image || !dataStr) return { status: 400 }; // TODO: Better error message
  // TODO: type should be validated
  const { type, authors } = JSON.parse(dataStr as string) as UploadPictureData; // TODO Validate
  if (!["drawing", "photo"].includes(type)) return { status: 400 }; // TODO: Better error message
  const user = await userRepository.getUserById(userId);
  if (!user) throw new Error("User not found");

  const id = uuid();
  const fileExtension = image.name.split(".").pop();
  if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension || ""))
    return { status: 400 }; // TODO: Better error message
  if (image.size > 1024 * 1024 * 10) return { status: 400 }; // TODO: Better error message
  const key = `${id}.${fileExtension}`;

  await uploadFileR2({ file: image, key });
  const usersToCreate = authors
    .filter((author) => "name" in author)
    .map((user) => ({ ...user, id: uuid() })) as (TempUserData & {
    id: string;
  })[];
  await userRepository.createTempUsers(usersToCreate);
  const userIds = authors
    .filter((author) => "id" in author)
    .map((author) => (author as { id: string }).id);
  userIds.concat(usersToCreate.map((user) => user.id));
  const picture = await pictureRepository.createPicture({
    id,
    type,
    image: key,
    uploaderId: userId,
    authors: userIds,
  });
  return NextResponse.json(picture);
}
