"use server";

import { NotFoundComponent } from "@/components/404";
import { getPictureById } from "@/_interface/backend/api/pictures";
import { FetchError } from "@/utils/fetch";
import { Metadata, ResolvingMetadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { PicturePageContainer } from "./container";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let picture;
  try {
    picture = await getPictureById(params.id);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404) return {};
  }

  return {
    openGraph: {
      images: [picture!.mdImage],
    },
  };
}

export default async function PicturePage({ params }: Props) {
  const queryClient = new QueryClient();

  const picture = await getPictureById(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["pictures", params.id],
    queryFn: () => getPictureById(params.id),
  });

  if (!picture) return <NotFoundComponent />;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PicturePageContainer id={params.id} />
    </HydrationBoundary>
  );
}
