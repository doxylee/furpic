
import { getPictures } from "@/_interface/backend/api/pictures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { IndexPageContainer } from "./container";
import { getAuthCookies } from "@/utils/authCookie";
import { Metadata } from "next";

const PER_PAGE = 60;

export const metadata: Metadata = {
  title: "FurPic - 사진",
  description:
    "최신 사진 작품들을 모아봤어요!",
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const queryKey = ["pictures", "photos", page];
  const queryParams: Parameters<typeof getPictures>[0] = {
    type: "photo",
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getPictures(queryParams, getAuthCookies()),
  });
  queryClient.invalidateQueries({ queryKey });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IndexPageContainer
        page={page}
        perPage={PER_PAGE}
        queryKey={queryKey}
        queryParams={queryParams}
      />
    </HydrationBoundary>
  );
}
