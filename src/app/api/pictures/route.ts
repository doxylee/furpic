import { characterRepository } from "@/_backend/repositories/character";
import { pictureRepository } from "@/_backend/repositories/picture";
import { userRepository } from "@/_backend/repositories/user";
import { verifyJWT } from "@/_backend/utils/auth";
import { uploadFileR2 } from "@/_backend/utils/r2";
import { uuid } from "@/_backend/utils/uuid";
import {
  TempCharacterData,
  TempUserData,
  UploadPictureData,
} from "@/_interface/backend/api/pictures";
import { NextRequest, NextResponse } from "next/server";

// Take formdata from request.body. There is a file named image and json named data.
export async function POST(request: NextRequest) {
  const jwt = await verifyJWT();
  if (!jwt)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { userId } = jwt;
  const formData = await request.formData();
  const image = formData.get("image") as File | null;
  const dataStr = formData.get("data");
  if (!image || !dataStr) return NextResponse.json({error: "Must have image and data in formdata"}, {status: 400})
  // TODO: type should be validated
  const { type, authors, characters } = JSON.parse(
    dataStr as string,
  ) as UploadPictureData; // TODO Validate
  if (!["drawing", "photo"].includes(type)) return NextResponse.json({error: "Type must be drawing or photo"}, {status: 400})
  const user = await userRepository.getUserById(userId);
  if (!user) throw new Error("User not found");

  const id = uuid();
  const fileExtension = image.name.split(".").pop()?.toLowerCase();
  if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension || ""))
    return NextResponse.json({error: "File extension must be jpg, jpeg, png, or gif"}, {status: 400})
  if (image.size > 1024 * 1024 * 10) return NextResponse.json({error: "File size must be less than 10MB"}, {status: 400})
  const key = `${id}.${fileExtension}`;

  // File uplaod
  await uploadFileR2({ file: image, key });

  // Character creation
  const charactersToCreate = characters
    .filter<TempCharacterData>(isTempCharacterData)
    .map(({ nameKo, nameEn, species, mine, setImage }) => ({
      id: uuid(),
      nameKo,
      nameEn,
      species,
      userId: mine ? userId : null,
      image: setImage ? key : null,
    }));
  await characterRepository.createTempCharacters(charactersToCreate);
  const characterIds = characters
    .filter((character) => "id" in character)
    .map((character) => (character as { id: string }).id);
  characterIds.push(...charactersToCreate.map((character) => character.id));

  // Author creation
  const usersToCreate = authors
    .filter((author) => "name" in author)
    .map((user) => ({ ...user, id: uuid() })) as (TempUserData & {
    id: string;
  })[];
  await userRepository.createTempUsers(usersToCreate);
  const userIds = authors
    .filter((author) => "id" in author)
    .map((author) => (author as { id: string }).id);
  userIds.push(...usersToCreate.map((user) => user.id));

  // Picture creation
  const picture = await pictureRepository.createPicture({
    id,
    type,
    image: key,
    uploaderId: userId,
    authors: userIds,
    characters: characterIds,
  });
  return NextResponse.json(picture);
}

function isTempCharacterData(
  character: TempCharacterData | { id: string },
): character is TempCharacterData {
  return !("id" in character);
}
