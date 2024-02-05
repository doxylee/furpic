"use server";

import { NotFoundComponent } from "@/components/404";
import { Avatar, AvatarGroup, Paper, Tooltip, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import React from "react";
import { CharacterTabs } from "./CharacterTabs";
import Link from "next/link";
import { CharacterEditButton } from "./CharacterEditButton";
import { getCharacterById } from "@/_interface/backend/api/characters";
import { FetchError } from "@/utils/fetch";
import { PicturePostFab } from "@/components/PicturePostFab";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let character;
  try {
    character = await getCharacterById(params.id);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404) return {};
    throw e;
  }

  const title = character.nameKo || character.nameEn;
  const keywordsDuplicate = [
    character.nameKo,
    character.nameEn,
    character.user?.name,
    character.user?.username,
    character.user?.twitterUsername,
  ].filter((s) => s) as string[];
  const keywords = Array.from(new Set(keywordsDuplicate));

  return {
    title,
    description: character.bio,
    keywords,
    twitter: {
      card: "summary",
      site: "@AstyDragon",
      title: title || undefined,
      description: character.bio,
      creator: character.user?.twitterUsername || undefined,
    },
    openGraph: {
      images: character.smImage ? [character.smImage] : undefined,
      title: title || undefined,
      description: character.bio,
    },
    metadataBase: (await parent).metadataBase,
  };
}

export default async function CharacterLayout({
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
    <Container maxWidth="x2l" sx={{ pb: 2 }}>
      <Paper
        elevation={3}
        sx={{
          position: { xs: "static", sm: "sticky" },
          top: 64,
          zIndex: 100,
          backgroundColor: "white",
          mb: 2,
          mx: -1,
          p: 2,
          pb: 0,
          borderRadius: "0 0 32px 32px",
        }}
      >
        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <Avatar
            src={character.smImage ?? undefined}
            variant="square"
            sx={{
              width: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              m: { xs: 1, sm: 2 },
            }}
          />
          <Stack mx={{ xs: 1, sm: 2 }} my={1} spacing={0.5}>
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
        <Stack direction="row" flexWrap="wrap" alignItems="center">
          {character.species && (
            <Typography fontSize={14} color="#aaa" mr={2}>
              종족: {character.species}
            </Typography>
          )}
          {character.designers.length > 0 && (
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* <Typography fontSize={14} color="#aaa">
                디자이너:
              </Typography>
              <Tooltip
                title={character.designers.map((a) => a.name).join(", ")}
                placement="bottom"
              >
                <AvatarGroup max={4}>
                  {character.designers.map((designer) => (
                    <Link
                      href={`/users/@${designer.username}`}
                      key={designer.id}
                    >
                      <Avatar
                        src={designer.xsImage ?? undefined}
                        sx={{ cursor: "pointer", height: 20, width: 20 }}
                      />
                    </Link>
                  ))}
                </AvatarGroup>
              </Tooltip> */}
            </Stack>
          )}
        </Stack>
        <Typography variant="body1" my={{ xs: 1, sm: 2 }}>
          {character.bio}
        </Typography>
        <CharacterTabs />
      </Paper>
      {children}
      <PicturePostFab />
    </Container>
  );
}
