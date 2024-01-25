"use client";

import { User } from "@/_interface/backend/entities/user";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  SxProps,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";

export function UserCard({
  user,
  onClick,
  sx,
}: {
  user: User;
  onClick?: MouseEventHandler<HTMLDivElement>;
  sx?: SxProps;
}) {
  console.log(user)
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "auto",
        borderRadius: "50em 50em 32px 32px",
        ...sx,
      }}
    >
      <CardMedia
        image={user.smImage ?? undefined}
        title={user.name}
        sx={{ paddingTop: "100%", borderRadius: "50%", position: "relative"}}
      >
        {!user.smImage && (
          <Avatar
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
            }}
          />
        )}
        </CardMedia>
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {user.name}
        </Typography>
        {(user.username || user.twitterUsername) && (
          <Typography
            fontSize={12}
            color="gray"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            @{user.username || user.twitterUsername}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
