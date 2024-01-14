"use server";

import { NotFoundComponent } from "@/components/404";
import { Avatar, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import React from "react";
import { CharacterTabs } from "./CharacterTabs";
import { characterRepository } from "@/_backend/repositories/character";
import { presentCharacterWithUser } from "@/_backend/presenters/character";
import Link from "next/link";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  console.log("use server", params);
  const prismaCharacter = await characterRepository.getCharacterById(params.id);
  if (!prismaCharacter) return <NotFoundComponent />;
  const character = presentCharacterWithUser(prismaCharacter);

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
          </Stack>
          <CharacterTabs />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
