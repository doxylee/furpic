"use client";

import { Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import { getRecentPictures } from "@/_interface/backend/api/pictures";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PictureCard } from "@/components/PictureCard";

export default function IndexPage() {
  const { data } = useQuery({
    queryKey: ["pictures", "recent"],
    queryFn: () => getRecentPictures(),
  });

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
      <Typography variant="h2" mt={4}>
        최신 작품
      </Typography>
      <Grid2 container spacing={{xs:1, sm: 2}} pt={2}>
        {data?.map((picture) => (
          <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
            <PictureCard picture={picture} sx={{ cursor: "pointer" }} link />
          </Grid2>
        ))}
      </Grid2>
      <Fab
        LinkComponent={"a"}
        href="/post"
        color="primary"
        aria-label="post"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}
