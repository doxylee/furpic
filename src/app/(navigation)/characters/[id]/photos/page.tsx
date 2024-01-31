"use server";

import { getPictures } from "@/_interface/backend/api/pictures";
import { PictureWall } from "@/components/PictureWall";

const PER_PAGE = 30;

export default async function UserDrawingsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const data = await getPictures({
    type: "photo",
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    characterId: params.id,
  });

  return (
    <PictureWall
      page={page}
      perPage={PER_PAGE}
      href={`/characters/${params.id}/photos?`}
      data={data}
    />
  );
}
