"use client";

import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";
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
        {(showAll ? characters : characters.slice(0, 6)).map((character) => {
          return (
            <Grid2 key={character.id} xs={6} sm={4} md={3} lg={2}>
              {/* TODO: Make a function for creating href if want to put character page under user page. */}
              <Link href={`/characters/${character.id}`}>
                <CharacterCard
                  character={character}
                  sx={{ cursor: "pointer" }}
                />
              </Link>
            </Grid2>
          );
        })}
      </Grid2>
      {characters.length > 6 && (
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "접기" : "더보기"}
        </Button>
      )}
    </>
  );
}
