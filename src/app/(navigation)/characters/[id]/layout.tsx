"use server";

import { NotFoundComponent } from "@/components/404";
import { Container } from "@mui/system";
import React from "react";
import { getCharacterById } from "@/_interface/backend/api/characters";
import { FetchError } from "@/utils/fetch";
import { PicturePostFab } from "@/components/PicturePostFab";
import { Metadata, ResolvingMetadata } from "next";
import { CharacterPanel } from "./CharacterPanel";

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
      <CharacterPanel character={character} />
      {children}
      <PicturePostFab />
    </Container>
  );
}
