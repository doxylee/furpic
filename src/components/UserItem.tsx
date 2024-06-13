"use client";

import { User } from "@/_interface/backend/entities/user";
import {
  Avatar,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";

export function UserItem({
  user,
  onClick,
  sx,
  link,
}: {
  user: User;
  onClick?: MouseEventHandler<HTMLDivElement>;
  sx?: SxProps;
  link?: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      onClick={onClick}
      sx={{
        cursor: onClick || link ? "pointer" : "auto",
        borderRadius: "50em 50em 32px 32px",
        ...sx,
      }}
      component={link? "a" : "div"}
      href={link? `/users/${user.id}` : undefined}
    >
      <Avatar src={user.smImage ?? undefined} sx={{ width: 64, height: 64 }} />
      <Stack>
        <Typography
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          fontSize={16}
          fontWeight="bold"
        >
          {user.name}
        </Typography>
        <Typography
          fontSize={12}
          color="gray"
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          @{user.username}
        </Typography>
      </Stack>
    </Stack>
  );
}
