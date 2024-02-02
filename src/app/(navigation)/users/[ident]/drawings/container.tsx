"use client";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { pictureWallOnLike } from "@/utils/like";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function UserDrawingsContainer({
  ident,
  page,
  perPage,
  queryParam,
}: {
  ident: string;
  page: number;
  perPage: number;
  queryParam: Parameters<typeof getPictures>[0];
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pictures", ident, "drawings", page],
    queryFn: () => getPictures(queryParam),
  });

  const onLike = pictureWallOnLike(
    ["pictures", ident, "drawings", page],
    queryClient,
  );

  return (
    <PictureWall
      page={page}
      perPage={perPage}
      href={`/users/${ident}/drawings?`}
      data={data}
      onLike={onLike}
    />
  );
}
