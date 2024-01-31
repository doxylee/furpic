"use client";

import { CharacterWall } from "@/components/CharacterWall";
import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { useUser } from "@/utils/useUser";

export function UserCharacters({
  data,
  userSearchQuery,
  page,
  perPage,
}: {
  data: { count: number; results: CharacterWithUser[] };
  userSearchQuery: { userId: string } | { username: string };
  page: number;
  perPage: number;
}) {
  const { user } = useUser();

  const isMyPage =
    !!user &&
    ("userId" in userSearchQuery
      ? userSearchQuery.userId === user.id
      : userSearchQuery.username === user.username);

  return (
    <CharacterWall
      page={page}
      perPage={perPage}
      href={`/users/${"userId" in userSearchQuery ? userSearchQuery.userId : "@" + userSearchQuery.username}/characters?`}
      data={data}
      characterAddButton={isMyPage}
    />
  );
}
