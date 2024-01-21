"use server";

import { characterRepository } from "@/_backend/repositories/character";
import { dehydrate, useQueryClient, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { UserCharacters } from "./UserCharacters";

export default async function UserCharactersPage({
  params,
}: {
  params: { id: string };
}) {
  const userSearchQuery = params.id.startsWith("%40")
    ? { username: params.id.slice(3) }
    : { userId: params.id };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["characters", "getCharactersOfUser", userSearchQuery],
    queryFn: () =>
      characterRepository.getCharactersOfUser({
        ...userSearchQuery,
        limit: 36,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserCharacters userSearchQuery={userSearchQuery} />
    </HydrationBoundary>
  );
}
