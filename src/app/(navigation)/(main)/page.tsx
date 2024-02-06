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
  title: "FurPic",
  description:
    "퍼픽(FurPic)은 퍼리 그림, 사진 작품들을 공유할 수 있는 플랫폼이에요. \n작품을 작가나 캐릭터별로 모아보고 캐릭터를 편하게 관리해보세요!",
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const queryKey = ["pictures", "recent", page];
  const queryParams: Parameters<typeof getPictures>[0] = {
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
