"use client";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";
import { pictureWallOnLike } from "@/utils/like";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function CharacterDrawingsContainer({
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
    <div>helloworld</div>
    // <PictureWall
    //   page={page}
    //   perPage={perPage}
    //   href={`/characters/${id}/drawings?`}
    //   data={data}
    //   onLike={onLike}
    // />
  );
}
