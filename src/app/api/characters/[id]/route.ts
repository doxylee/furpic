import { characterRepository } from "@/_backend/repositories/character";
import { verifyJWT } from "@/_backend/utils/auth";
import { uploadFileR2 } from "@/_backend/utils/r2";
import { uuid } from "@/_backend/utils/uuid";
import { NextRequest, NextResponse } from "next/server";

// TODO: validate request body
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const jwt = await verifyJWT();
  if (!jwt)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { userId } = jwt;

  const id = params.id;
  const character = await characterRepository.getCharacterById(id);
  if (!character)
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  if (character.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await request.formData();
  const image = formData.get("image") as File | null;

  let imageKey;

  if (image) {
    const id = uuid();
    const fileExtension = image.name.split(".").pop()?.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(fileExtension || ""))
      return NextResponse.json(
        { error: "File extension must be jpg, jpeg, png, or gif" },
        { status: 400 },
      );
    if (image.size > 1024 * 1024 * 10)
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 },
      );
    imageKey = `${id}.${fileExtension}`;

    // File uplaod
    await uploadFileR2({ file: image, key: imageKey });
  }

  const dataStr = formData.get("data") as string;
  const { nameKo, nameEn, species } = dataStr
    ? JSON.parse(dataStr)
    : ({} as Record<string, undefined>);
  return NextResponse.json(
    await characterRepository.updateCharacter({
      id,
      nameKo,
      nameEn,
      species,
      image: imageKey,
    }),
  );
}
