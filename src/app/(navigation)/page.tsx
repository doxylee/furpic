"use client";

import { useUser } from "@/utils/useUser";
import { Button, Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import { getRecentPictures } from "@/_interface/backend/api/pictures";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PictureCard } from "@/components/PictureCard";
import Link from "next/link";

export default function IndexPage() {
  const userController = useUser();
  const { data } = useQuery({
    queryKey: ["pictures", "recent"],
    queryFn: () => getRecentPictures(),
  });

  return (
    <Container maxWidth="x2l">
      <p>
        <Button variant="contained" onClick={() => userController.startOAuth()}>
          트위터 로그인
        </Button>
      </p>
      <p>{userController.user?.name}</p>
      <Grid2 container spacing={2} p={2}>
        {data?.map((picture) => (
          <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
            <Link href={`/pictures/${picture.id}`}>
              <PictureCard picture={picture} sx={{ cursor: "pointer" }} />
            </Link>
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
