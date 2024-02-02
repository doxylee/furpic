"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { IndexPageContainer } from "./container";

const PER_PAGE = 60;

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pictures", "recent", page],
    queryFn: () =>
      getPictures({ limit: PER_PAGE, offset: (page - 1) * PER_PAGE }),
    staleTime: 0
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IndexPageContainer page={page} />
    </HydrationBoundary>
  );
}
