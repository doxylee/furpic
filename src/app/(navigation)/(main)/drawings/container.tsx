"use client";

import { Container, Typography } from "@mui/material";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { pictureWallOnLike } from "@/utils/like";

const PER_PAGE = 60;

export function DrawingsPageContainer({ page }: { page: number }) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pictures", "drawings", page],
    queryFn: () =>
      getPictures({
        type: "drawing",
        limit: PER_PAGE,
        offset: (page - 1) * PER_PAGE,
      }),
  });

  const onLike = pictureWallOnLike(["pictures", "drawings", page], queryClient);

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        그림
      </Typography>
      <PictureWall
        page={page}
        perPage={PER_PAGE}
        href={"/drawings?"}
        data={data}
        onLike={onLike}
      />
      <PicturePostFab />
    </Container>
  );
}
