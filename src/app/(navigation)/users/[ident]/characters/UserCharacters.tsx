"use client";

import { CharacterCard } from "@/components/CharacterCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { CharacterAddButton } from "./CharacterAddButton";
import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/_interface/backend/api/characters";

export function UserCharacters({
  userSearchQuery,
}: {
  userSearchQuery: { userId: string } | { username: string };
}) {
  const { data: characters } = useQuery({
    queryKey: ["characters", "getCharactersOfUser", userSearchQuery],
    queryFn: () => getCharacters({ limit: 36, ...userSearchQuery }),
  });

  return (
    <Grid2 container spacing={2}>
      {characters?.map((character) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={character.id}>
          <Link href={`/characters/${character.id}`}>
            <CharacterCard character={character} sx={{ cursor: "pointer" }} />
          </Link>
        </Grid2>
      ))}
      <CharacterAddButton userSearchQuery={userSearchQuery} />
    </Grid2>
  );
}
