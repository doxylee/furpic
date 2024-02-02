"use client";

import { Container, Typography } from "@mui/material";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { pictureWallOnLike } from "@/utils/like";
import { useEffect } from "react";

const PER_PAGE = 60;

export function PhotosPageContainer({ page }: { page: number }) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pictures", "photos", page],
    queryFn: () =>
      getPictures({
        type: "photo",
        limit: PER_PAGE,
        offset: (page - 1) * PER_PAGE,
      }),
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["pictures", "photos", page] });
  }, []);

  const onLike = pictureWallOnLike(["pictures", "photos", page], queryClient);

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        사진
      </Typography>
      <PictureWall
        page={page}
        perPage={PER_PAGE}
        href={"/photos?"}
        data={data}
        onLike={onLike}
      />
      <PicturePostFab />
    </Container>
  );
}
