"use server";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { UserCharacters } from "./UserCharacters";
import { getCharacters } from "@/_interface/backend/api/characters";

export default async function UserCharactersPage({
  params,
}: {
  params: { ident: string };
}) {
  const userSearchQuery = params.ident.startsWith("%40")
    ? { username: params.ident.slice(3) }
    : { userId: params.ident };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["characters", "getCharactersOfUser", userSearchQuery],
    queryFn: () => getCharacters({ limit: 60, ...userSearchQuery }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserCharacters userSearchQuery={userSearchQuery} />
    </HydrationBoundary>
  );
}
