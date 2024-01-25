"use client";

import { useUser } from "@/utils/useUser";
import { Button, Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import { getRecentPictures } from "@/_interface/backend/api/pictures";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PictureCard } from "@/components/PictureCard";

export default function IndexPage() {
  const userController = useUser();
  const { data } = useQuery({
    queryKey: ["pictures", "recent"],
    queryFn: () => getRecentPictures(),
  });

  return (
    <Container maxWidth="x2l">
      <Typography variant="h4" component="h1" sx={{ mt:4, ml:2 }}>
        최신 작품
      </Typography>
      <Grid2 container spacing={2} p={2}>
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
