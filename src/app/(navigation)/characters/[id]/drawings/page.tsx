"use server";

import { presentPictureWithConnections } from "@/_backend/presenters/picture";
import { pictureRepository } from "@/_backend/repositories/picture";
import { PictureCard } from "@/components/PictureCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";

export default async function UserDrawingsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await pictureRepository.getCharacterPictures({
    characterId: params.id,
    type: "drawing",
    limit: 36,
  });
  const drawings = data.map(presentPictureWithConnections);

  return (
    <Grid2 container spacing={2}>
      {drawings?.map((picture) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
          <Link href={`/pictures/${picture.id}`}>
            <PictureCard picture={picture} sx={{ cursor: "pointer" }} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
