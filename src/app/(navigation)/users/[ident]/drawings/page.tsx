"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureCard } from "@/components/PictureCard";
import Grid2 from "@mui/material/Unstable_Grid2";

export default async function UserDrawingsPage({
  params,
}: {
  params: { ident: string };
}) {
  const userSearchQuery = params.ident.startsWith("%40")
    ? { authorUsername: params.ident.slice(3) }
    : { authorId: params.ident };
  const drawings = await getPictures({
    limit: 36,
    type: "drawing",
    ...userSearchQuery,
  });

  return (
    <Grid2 container spacing={2}>
      {drawings?.results.map((picture) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
          <PictureCard picture={picture} sx={{ cursor: "pointer" }} link />
        </Grid2>
      ))}
    </Grid2>
  );
}
