"use server";

import { getPictureById } from "@/_interface/backend/api/pictures";
import { NotFoundComponent } from "@/components/404";
import { FetchError } from "@/utils/fetch";
import { PictureEditContainer } from "./PictureEditContainer";


type Props = {
  params: { id: string };
};


export default async function PictureEditPage({ params }: Props) {
  let picture;
  try {
    picture = await getPictureById(params.id);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404)
      return <NotFoundComponent />; // TODO: Customized 404 page. There's more like this, find them
    throw e;
  }

  return <PictureEditContainer picture={picture} />;
}
