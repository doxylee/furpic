"use server";

import { NotFoundComponent } from "@/components/404";
import { Avatar, Box, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import React from "react";
import { UserTabs } from "./UserTabs";
import XIcon from "@mui/icons-material/X";
import Link from "next/link";
import { getUserById } from "@/_interface/backend/api/user";
import { FetchError } from "@/utils/fetch";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let user;
  try {
    user = await getUserById(params.id);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404)
      return <NotFoundComponent />;
    throw e;
  }

  const username = user.username || user.twitterUsername;

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
              src={user.imageURL ?? undefined}
              sx={{ width: 120, height: 120 }}
            />
            <Stack>
              <Typography fontSize={28}>{user.name}</Typography>
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
                  }}
                >
                  <XIcon />
                </Box>
              </Link>
            )}
          </Stack>
          <UserTabs />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
