"use server";

import { NotFoundComponent } from "@/components/404";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import React from "react";
import { UserTabs } from "./UserTabs";
import XIcon from "@mui/icons-material/X";
import Link from "next/link";
import { getUserByIdent } from "@/_interface/backend/api/user";
import { FetchError } from "@/utils/fetch";
import { PicturePostFab } from "@/components/PicturePostFab";
import { UserEditButton } from "./UserEditButton";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { ident: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let user;
  try {
    user = await getUserByIdent(params.ident);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404) return {};
    throw e;
  }

  const title = user.name || user.username || user.twitterUsername;
  const keywordsDuplicate = [
    user.name,
    user.username,
    user.twitterUsername,
  ].filter((s) => s) as string[];
  const keywords = Array.from(new Set(keywordsDuplicate));

  return {
    title,
    description: user.bio,
    keywords,
    twitter: {
      card: "summary",
      site: "@AstyDragon",
      title: title || undefined,
      description: user.bio,
      creator: user.twitterUsername || undefined,
    },
    openGraph: {
      images: user.smImage ? [user.smImage] : undefined,
      title: title || undefined,
      description: user.bio,
    },
    metadataBase: (await parent).metadataBase,
  };
}

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { ident: string };
}) {
  let user;
  try {
    user = await getUserByIdent(params.ident);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404)
      return <NotFoundComponent />;
    throw e;
  }

  const username = user.username || user.twitterUsername;

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
            src={user.smImage ?? undefined}
            sx={{
              width: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              m: { xs: 1, sm: 2 },
            }}
          />
          <Stack mx={{ xs: 1, sm: 2 }} my={1}>
            <Typography variant="h4">{user.name}</Typography>
            {username && (
              <Typography fontSize={14} color="#aaa">
                @{username}
              </Typography>
            )}
          </Stack>
          {user.twitterUsername && (
            <Link
              href={`https://twitter.com/${user.twitterUsername}`}
              target="_blank"
            >
              <Box
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  p: "4px",
                  pb: "2px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  mx: { xs: 1, sm: 2 },
                  my: 1,
                }}
              >
                <XIcon />
              </Box>
            </Link>
          )}
          <UserEditButton
            pageUser={user}
            sx={{ ml: "auto", mr: { xs: 1, sm: 2 }, my: 1 }}
          />
        </Stack>
        <Typography variant="body1" my={{ xs: 1, sm: 2 }}>
          {user.bio}
        </Typography>
        <UserTabs />
      </Paper>
      {children}
      <PicturePostFab />
    </Container>
  );
}
