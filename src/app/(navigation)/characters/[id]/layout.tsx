"use server";

import { NotFoundComponent } from "@/components/404";
import { Avatar, Paper, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import React from "react";
import { CharacterTabs } from "./CharacterTabs";
import Link from "next/link";
import { CharacterEditButton } from "./CharacterEditButton";
import { getCharacterById } from "@/_interface/backend/api/characters";
import { FetchError } from "@/utils/fetch";
import { PicturePostFab } from "@/components/PicturePostFab";

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
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 100,
          backgroundColor: "white",
          my: 2,
          p: 2,
          pb: 0,
          borderRadius: 8,
        }}
      >
        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <Avatar
            src={character.xsImage ?? undefined}
            variant="square"
            sx={{
              width: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              m: { xs: 1, sm: 2 },
            }}
          />
          <Stack mx={{ xs: 1, sm: 2 }} my={1}>
            <Typography variant="h4">
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
            sx={{ ml: "auto", mr: { xs: 1, sm: 2 }, my: 1 }}
          />
        </Stack>
        <CharacterTabs />
      </Paper>
      {children}
      <PicturePostFab />
    </Container>
  );
}
