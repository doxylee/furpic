"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CharacterPhotosContainer } from "./container";

const PER_PAGE = 30;

export default async function CharacterPhotosPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const queryParam: Parameters<typeof getPictures>[0] = {
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    type: "photo",
    characterId: params.id,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pictures", params.id, "photos", page],
    queryFn: () => getPictures(queryParam),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterPhotosContainer
        id={params.id}
        page={page}
        perPage={PER_PAGE}
        queryParam={queryParam}
      />
    </HydrationBoundary>
  );
}
