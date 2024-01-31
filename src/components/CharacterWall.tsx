"use client";

import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { CharacterCard } from "./CharacterCard";
import { CharacterAddButton } from "@/app/(navigation)/users/[ident]/characters/CharacterAddButton";

export function CharacterWall({
  page,
  perPage = 60,
  href,
  data,
  characterAddButton = false,
}: {
  page: number;
  perPage?: number;
  href: string;
  data: { results: CharacterWithUser[]; count: number } | undefined;
  characterAddButton?: boolean;
}) {
  return (
    <>
      <Grid2 container spacing={{ xs: 1, sm: 2 }} pt={2}>
        {data?.results.map((character) => (
          <Grid2 xs={6} sm={4} md={3} lg={2} key={character.id}>
            <CharacterCard character={character} link />
          </Grid2>
        ))}
        {characterAddButton && <CharacterAddButton />}
      </Grid2>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          page={page}
          count={data ? Math.ceil(data.count / perPage) : 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={href + `page=${item.page}`}
              {...item}
            />
          )}
        />
      </Box>
    </>
  );
}
