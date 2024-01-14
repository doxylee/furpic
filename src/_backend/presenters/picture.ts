import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import { PrismaPictureWithConnections } from "../repositories/picture";
import { presentCharacterWithUser } from "./character";
import { presentUser } from "./user";

export function presentPictureWithConnections(
  picture: PrismaPictureWithConnections,
): PictureWithConnections {
  return {
    id: picture.id,
    type: picture.type,
    uploaderId: picture.uploaderId,
    uploader: picture.uploader ? presentUser(picture.uploader) : null,
    createdAt: picture.createdAt,
    updatedAt: picture.updatedAt,
    likeCount: picture.likeCount,
    viewCount: picture.viewCount,
    authors: picture.authors.map((pictureAuthor) =>
      presentUser(pictureAuthor.user),
    ),
    characters: picture.characters.map((pictureCharacter) =>
      presentCharacterWithUser(pictureCharacter.character),
    ),
  };
}
