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
  params: { id: string };
}) {
  const userSearchQuery = params.id.startsWith("%40")
    ? { username: params.id.slice(3) }
    : { userId: params.id };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["characters", "getCharactersOfUser", userSearchQuery],
    queryFn: () => getCharacters({ limit: 36, ...userSearchQuery }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserCharacters userSearchQuery={userSearchQuery} />
    </HydrationBoundary>
  );
}
