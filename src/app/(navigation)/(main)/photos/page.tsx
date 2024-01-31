"use client";

import { Container, Fab, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PictureCard } from "@/components/PictureCard";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getPictures } from "@/_interface/backend/api/pictures";

export default function IndexPage() {
  const { data } = useQuery({
    queryKey: ["pictures", "recent"],
    queryFn: () => getPictures({ type: "photo", limit: 60 }),
  });

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
      <Typography variant="h2" mt={4}>
        최신 사진
      </Typography>
      <Grid2 container spacing={{ xs: 1, sm: 2 }} pt={2}>
        {data?.results.map((picture) => (
          <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
            <PictureCard picture={picture} sx={{ cursor: "pointer" }} link />
          </Grid2>
        ))}
      </Grid2>
      <PicturePostFab />
    </Container>
  );
}
