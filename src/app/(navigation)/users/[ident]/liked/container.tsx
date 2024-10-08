"use client";

import {
  getLikedPictures,
} from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { pictureWallOnLike } from "@/utils/like";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function UserLikedContainer({
  ident,
  page,
  perPage,
  queryKey,
  queryParams,
}: {
  ident: string;
  page: number;
  perPage: number;
  queryKey: any[];
  queryParams: Parameters<typeof getLikedPictures>[0];
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey,
    queryFn: () => getLikedPictures(queryParams),
  });
  const onLike = pictureWallOnLike(queryKey, queryClient);

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
