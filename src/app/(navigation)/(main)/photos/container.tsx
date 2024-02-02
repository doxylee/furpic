"use client";

import { Container, Typography } from "@mui/material";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { pictureWallOnLike } from "@/utils/like";

export function IndexPageContainer({
  page,
  perPage,
  queryParams,
  queryKey,
}: {
  page: number;
  perPage: number;
  queryParams: Parameters<typeof getPictures>[0];
  queryKey: any[];
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      getPictures(queryParams),
  });
  const onLike = pictureWallOnLike(queryKey, queryClient);

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        사진
      </Typography>
      <PictureWall
        page={page}
        perPage={perPage}
        href={"/photos?"}
        data={data}
        onLike={onLike}
      />
      <PicturePostFab />
    </Container>
  );
}
