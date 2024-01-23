"use server";

import { NotFoundComponent } from "@/components/404";
import { Avatar, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import React from "react";
import { CharacterTabs } from "./CharacterTabs";
import Link from "next/link";
import { CharacterEditButton } from "./CharacterEditButton";
import { getCharacterById } from "@/_interface/backend/api/characters";
import { FetchError } from "@/utils/fetch";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let character;
  try {
    character = await getCharacterById(params.id);
  } catch (e: any) {
    if (e instanceof FetchError && e.status === 404)
      return <NotFoundComponent />; // TODO: Customized 404 page
    throw e;
  }

  return (
    <Container maxWidth="x2l">
      <Stack spacing={2}>
        <Stack
          spacing={2}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backgroundColor: "white",
            pt: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={4}>
            <Avatar
              src={character.imageURL ?? undefined}
              variant="square"
              sx={{ width: 120, height: 120 }}
            />
            <Stack>
              <Typography fontSize={28}>
                {character.nameKo || character.nameEn}
              </Typography>
              {character.user && (
                <Link href={`/users/@${character.user.username}`}>
                  <Typography
                    fontSize={14}
                    color="#aaa"
                    sx={{ cursor: "pointer" }}
                  >
                    {character.user.name} @{character.user.username}
                  </Typography>
                </Link>
              )}
            </Stack>
            <CharacterEditButton
              character={character}
              sx={{ justifySelf: "flex-end" }}
            />
          </Stack>
          <CharacterTabs />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
