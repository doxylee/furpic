"use client";

import { CharacterWithUser } from "@/_interface/backend/entities/character";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  SxProps,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { MouseEventHandler } from "react";

export function CharacterCard({
  character,
  onClick,
  link = false,
  sx,
}: {
  character: CharacterWithUser;
  onClick?: MouseEventHandler<HTMLDivElement>;
  link?: boolean;
  sx?: SxProps;
}) {
  const nameComponent = (
    <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
      {character.nameKo || character.nameEn}
    </Typography>
  );

  return (
    <Card
      onClick={onClick}
      sx={{ cursor: link || onClick ? "pointer" : "auto", ...sx }}
    >
      <CardMedia
        component={link ? Link : "div"}
        href={link ? `/characters/${character.id}` : undefined}
        image={character.smImage ?? undefined}
        title={character.nameKo || character.nameEn || undefined}
        sx={{ paddingTop: "100%", position: "relative" }}
      >
        {!character.smImage && (
          <Avatar
            variant="square"
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
        {link ? (
          <Link href={`/characters/${character.id}`}>{nameComponent}</Link>
        ) : (
          nameComponent
        )}
        {character.user && (
          <Link href={`/users/@${character.user.username}`}>
            <Typography
              fontSize={12}
              color="gray"
              noWrap
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {character.user.name} @
              {character.user.username || character.user.twitterUsername}
            </Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
