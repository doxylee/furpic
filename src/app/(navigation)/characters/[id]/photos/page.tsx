"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureCard } from "@/components/PictureCard";
import Grid2 from "@mui/material/Unstable_Grid2";

export default async function UserPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const photos = await getPictures({
    characterId: params.id,
    type: "photo",
    limit: 36,
  });

  return (
    <Grid2 container spacing={2}>
      {photos?.results.map((picture) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
          <PictureCard picture={picture} sx={{ cursor: "pointer" }} link />
        </Grid2>
      ))}
    </Grid2>
  );
}
