"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { PhotosPageContainer } from "./container";

const PER_PAGE = 60;

export default async function PhotosPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pictures", "photos", page],
    queryFn: () =>
      getPictures({
        type: "photo",
        limit: PER_PAGE,
        offset: (page - 1) * PER_PAGE,
      }),
  });
    queryClient.invalidateQueries({ queryKey: ["pictures", "photos", page] });


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PhotosPageContainer page={page} />
    </HydrationBoundary>
  );
}
