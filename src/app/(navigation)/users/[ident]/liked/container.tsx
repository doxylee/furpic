"use client";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { pictureWallOnLike } from "@/utils/like";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function UserLikedContainer({
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
    queryKey: ["pictures", ident, "liked", page],
    queryFn: () => getPictures(queryParam),
  });

  const onLike = pictureWallOnLike(
    ["pictures", ident, "liked", page],
    queryClient,
  );

  return (
    <PictureWall
      page={page}
      perPage={perPage}
      href={`/users/${ident}/liked?`}
      data={data}
      onLike={onLike}
    />
  );
}
