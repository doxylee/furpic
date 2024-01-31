"use server";

import { Container, Typography } from "@mui/material";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";

const PER_PAGE = 60;

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const data = await getPictures({
    type: "photo",
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  });

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
      <Typography variant="h2" mt={4}>
        최신 사진
      </Typography>
      <PictureWall
        page={page}
        perPage={PER_PAGE}
        href={"/photos?"}
        data={data}
      />
      <PicturePostFab />
    </Container>
  );
}
