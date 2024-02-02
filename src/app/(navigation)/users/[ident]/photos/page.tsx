"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { UserPhotosContainer } from "./container";

const PER_PAGE = 30;

export default async function UserPhotosPage({
  params,
  searchParams,
}: {
  params: { ident: string };
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const userSearchQuery = params.ident.startsWith("%40")
    ? { authorUsername: params.ident.slice(3) }
    : { authorId: params.ident };

  const queryParam: Parameters<typeof getPictures>[0] = {
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    type: "photo",
    ...userSearchQuery,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pictures", params.ident, "photos", page],
    queryFn: () => getPictures(queryParam),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserPhotosContainer
        ident={params.ident}
        page={page}
        perPage={PER_PAGE}
        queryParam={queryParam}
      />
    </HydrationBoundary>
  );
}
