"use server";

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

  const characters = picture?.characters
    .map((c) => c.nameKo || c.nameEn)
    .join(", ");
  const authors = picture?.authors.map((a) => a.name).join(", ");
  const description = `캐릭터: ${characters} \n작가: ${authors}`;
  const keywordsDuplicate = [
    ...(picture?.characters.flatMap((c) => [
      c.nameKo,
      c.nameEn,
      c.user?.name,
      c.user?.username,
      c.user?.twitterUsername,
    ]) || []),
    ...(picture?.authors.flatMap((a) => [
      a.name,
      a.username,
      a.twitterUsername,
    ]) || []),
  ].filter((k) => k) as string[];
  const keywords = Array.from(new Set(keywordsDuplicate));

  return {
    description,
    keywords,
    twitter: {
      card: "summary_large_image",
      site: "@AstyDragon",
      creator: picture?.authors?.[0].twitterUsername || undefined,
      title: description,
    },
    openGraph: {
      images: [picture!.mdImage],
      title: description,
    },
    metadataBase: (await parent).metadataBase,
  };
}

export default async function PicturePage({ params }: Props) {
  const queryClient = new QueryClient();
  const queryKey = ["pictures", params.id];

  await queryClient.prefetchQuery({
    queryKey: ["pictures", params.id],
    queryFn: () => getPictureById(params.id),
  });
  queryClient.invalidateQueries({ queryKey });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PicturePageContainer id={params.id} queryKey={queryKey} />
    </HydrationBoundary>
  );
}
