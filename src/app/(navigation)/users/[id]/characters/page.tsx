"use server";

import { presentCharacterWithUser } from "@/_backend/presenters/character";
import { characterRepository } from "@/_backend/repositories/character";
import { CharacterCard } from "@/components/CharacterCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";

export default async function UserCharactersPage({
  params,
}: {
  params: { id: string };
}) {
  const userSearchQuery = params.id.startsWith("%40")
    ? { username: params.id.slice(3) }
    : { userId: params.id };
  const data = await characterRepository.getCharactersOfUser({
    ...userSearchQuery,
    limit: 36,
  });
  const characters = data.map(presentCharacterWithUser);

  return (
    <Grid2 container spacing={2}>
      {characters?.map((character) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={character.id}>
          <Link href={`/characters/${character.id}`}>
            <CharacterCard character={character} sx={{ cursor: "pointer" }} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
