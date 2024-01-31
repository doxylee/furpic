"use server";

import { UserCharacters } from "./UserCharacters";
import { getCharacters } from "@/_interface/backend/api/characters";

const PER_PAGE = 35;

export default async function UserCharactersPage({
  params,
  searchParams,
}: {
  params: { ident: string };
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const userSearchQuery = params.ident.startsWith("%40")
    ? { username: params.ident.slice(3) }
    : { userId: params.ident };

  const data = await getCharacters({
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    ...userSearchQuery,
  });

  return (
    <UserCharacters
      userSearchQuery={userSearchQuery}
      data={data}
      page={page}
      perPage={PER_PAGE}
    />
  );
}
