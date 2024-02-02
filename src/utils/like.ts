import {
  getPictures,
  likePicture,
  unlikePicture,
} from "@/_interface/backend/api/pictures";
import { QueryClient } from "@tanstack/react-query";
import { AwaitedReturnType } from "./types";

export const pictureWallOnLike =
  (queryKey: any, queryClient: QueryClient) =>
  async (id: string, liked: boolean) => {
    const res = await (liked ? likePicture(id) : unlikePicture(id));
    queryClient.setQueryData(
      queryKey,
      (oldData: AwaitedReturnType<typeof getPictures>) => {
        const idx = oldData.results.findIndex((p) => p.id === id);
        if (idx < 0) return oldData;
        const newResults = [...oldData.results];
        newResults[idx] = res;
        return { count: oldData.count, results: newResults };
      },
    );
  };
