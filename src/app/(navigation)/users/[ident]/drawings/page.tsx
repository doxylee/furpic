"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";

const PER_PAGE = 30;

export default async function UserDrawingsPage({
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
  const data = await getPictures({
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    type: "drawing",
    ...userSearchQuery,
  });

  return (
    <PictureWall
      page={page}
      perPage={PER_PAGE}
      href={`/characters/${params.ident}/photos?`}
      data={data}
    />
  );
}
