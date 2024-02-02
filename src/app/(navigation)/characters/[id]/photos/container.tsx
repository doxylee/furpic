"use client";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { pictureWallOnLike } from "@/utils/like";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function CharacterPhotosContainer({
  id,
  page,
  perPage,
  queryParam,
}: {
  id: string;
  page: number;
  perPage: number;
  queryParam: Parameters<typeof getPictures>[0];
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pictures", id, "photos", page],
    queryFn: () => getPictures(queryParam),
  });

  const onLike = pictureWallOnLike(
    ["pictures", id, "photos", page],
    queryClient,
  );

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
