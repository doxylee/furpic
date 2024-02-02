"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CharacterPhotosContainer } from "./container";
import { getAuthCookies } from "@/utils/authCookie";

const PER_PAGE = 30;

export default async function CharacterPhotosPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const queryKey = ["pictures", params.id, "photos", page];
  const queryParams: Parameters<typeof getPictures>[0] = {
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    type: "photo",
    characterId: params.id,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getPictures(queryParams, getAuthCookies()),
  });
  queryClient.invalidateQueries({ queryKey });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterPhotosContainer
        id={params.id}
        page={page}
        perPage={PER_PAGE}
        queryKey={queryKey}
        queryParams={queryParams}
      />
    </HydrationBoundary>
  );
}
