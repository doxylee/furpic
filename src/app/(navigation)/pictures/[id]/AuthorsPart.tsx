"use client";

import { User } from "@/_interface/backend/entities/user";
import { UserCard } from "@/components/UserCard";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export default function AuthorsPart({ authors }: { authors: User[] }) {
  const [showAll, setShowAll] = useState<boolean>(false);
  return (
    <>
      <Grid2 container spacing={1}>
        {(showAll ? authors : authors.slice(0, 6)).map((author) => (
          <Grid2 key={author.id} xs={6} sm={4} md={3} lg={2}>
            <UserCard user={author} />
          </Grid2>
        ))}
      </Grid2>
      {authors.length > 6 && (
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "접기" : "더보기"}
        </Button>
      )}
    </>
  );
}
