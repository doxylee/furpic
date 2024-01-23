"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureCard } from "@/components/PictureCard";
import Grid2 from "@mui/material/Unstable_Grid2";

export default async function UserDrawingsPage({
  params,
}: {
  params: { id: string };
}) {
  const userSearchQuery = params.id.startsWith("%40")
    ? { username: params.id.slice(3) }
    : { userId: params.id };
  const drawings = await getPictures({
    limit: 36,
    type: "drawing",
    ...userSearchQuery,
  });

  return (
    <Grid2 container spacing={2}>
      {drawings?.map((picture) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
          <PictureCard picture={picture} sx={{ cursor: "pointer" }} link />
        </Grid2>
      ))}
    </Grid2>
  );
}
