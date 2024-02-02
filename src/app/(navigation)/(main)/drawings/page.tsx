"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { DrawingsPageContainer } from "./container";

const PER_PAGE = 60;

export default async function DrawingsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pictures", "drawings", page],
    queryFn: () =>
      getPictures({
        type: "drawing",
        limit: PER_PAGE,
        offset: (page - 1) * PER_PAGE,
      }),
    staleTime: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DrawingsPageContainer page={page} />
    </HydrationBoundary>
  );
}
