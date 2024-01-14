"use server";

import { presentPictureWithConnections } from "@/_backend/presenters/picture";
import { pictureRepository } from "@/_backend/repositories/picture";
import { PictureCard } from "@/components/PictureCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";

export default async function UserPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const userSearchQuery = params.id.startsWith("%40")
    ? { username: params.id.slice(3) }
    : { userId: params.id };
  const data = await pictureRepository.getUserAuthored({
    ...userSearchQuery,
    type: "photo",
    limit: 36,
  });
  const photos = data.map(presentPictureWithConnections);

  return (
    <Grid2 container spacing={2}>
      {photos?.map((picture) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
          <Link href={`/pictures/${picture.id}`}>
            <PictureCard picture={picture} sx={{ cursor: "pointer" }} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
