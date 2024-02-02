"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { UserLikedContainer } from "./container";
import { getAuthCookies } from "@/utils/authCookie";

const PER_PAGE = 30;

export default async function UserLikedPage({
  params,
  searchParams,
}: {
  params: { ident: string };
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const queryKey = ["pictures", params.ident, "liked", page];
  const userSearchQuery = params.ident.startsWith("%40")
    ? { likedByUsername: params.ident.slice(3) }
    : { likedById: params.ident };
  const queryParams: Parameters<typeof getPictures>[0] = {
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    ...userSearchQuery,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getPictures(queryParams, getAuthCookies()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserLikedContainer
        ident={params.ident}
        page={page}
        perPage={PER_PAGE}
        queryKey={queryKey}
        queryParams={queryParams}
      />
    </HydrationBoundary>
  );
}
