"use client";

import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export default function CharactersPart({
  characters,
}: {
  characters: CharacterWithUser[];
}) {
  const [showAll, setShowAll] = useState<boolean>(false);
  return (
    <>
      <Grid2 container spacing={1}>
        {(showAll ? characters : characters.slice(0, 6)).map((character) => (
          <Grid2 key={character.id} xs={6} sm={4} md={3} lg={2}>
            <CharacterCard character={character} />
          </Grid2>
        ))}
      </Grid2>
      {characters.length > 6 && (
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "접기" : "더보기"}
        </Button>
      )}
    </>
  );
}
