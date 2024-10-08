"use client";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { pictureWallOnLike } from "@/utils/like";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function CharacterPhotosContainer({
  id,
  page,
  perPage,
  queryKey,
  queryParams,
}: {
  id: string;
  page: number;
  perPage: number;
  queryKey: any[];
  queryParams: Parameters<typeof getPictures>[0];
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey,
    queryFn: () => getPictures(queryParams),
  });
  const onLike = pictureWallOnLike(queryKey, queryClient);

  return (
    <PictureWall
      page={page}
      perPage={perPage}
      href={`/characters/${id}/photos?`}
      data={data}
      onLike={onLike}
    />
  );
}
