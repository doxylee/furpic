"use client";

import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  SxProps,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { MouseEventHandler } from "react";

export function PictureCard({
  picture,
  onClick,
  link = false,
  sx,
}: {
  picture: PictureWithConnections;
  onClick?: MouseEventHandler<HTMLDivElement>;
  link?: boolean;
  sx?: SxProps;
}) {
  return (
    <Paper
      onClick={onClick}
      sx={{
        position: "relative",
        cursor: onClick ? "pointer" : "auto",
        "& .hover": { opacity: 0, transition: "opacity 0.2s ease-in-out" },
        "&:hover .hover": { opacity: 1 },
        ...sx,
      }}
    >
      <Box sx={{ paddingTop: "100%" }}>
        <Box
          component="img"
          src={picture.imageURL}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            objectFit: "cover",
          }}
        />

        <Box
          className="hover"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))",
          }}
        >
          {link ? (
            <Link href={`/pictures/${picture.id}`}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 1,
                }}
              />
            </Link>
          ) : null}
          <Tooltip
            title={picture.characters
              .map((a) => a.nameKo || a.nameEn)
              .join(", ")}
            placement="bottom"
          >
            <AvatarGroup
              sx={{ position: "absolute", left: 8, bottom: 8 }}
              total={picture.characters.length}
            >
              {picture.characters.slice(0, 3).map((character) =>
                link ? (
                  <Link href={`/characters/${character.id}`} key={character.id}>
                    <Avatar
                      key={character.id}
                      variant="square"
                      alt={character.nameKo || character.nameEn || undefined}
                      src={character.imageURL ?? undefined}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                ) : (
                  <Avatar
                    key={character.id}
                    variant="square"
                    alt={character.nameKo || character.nameEn || undefined}
                    src={character.imageURL ?? undefined}
                    sx={{ width: 32, height: 32 }}
                  />
                ),
              )}
            </AvatarGroup>
          </Tooltip>

          <Tooltip
            title={picture.authors.map((a) => a.name).join(", ")}
            placement="bottom"
          >
            <AvatarGroup
              sx={{ position: "absolute", right: 8, bottom: 8 }}
              total={picture.authors.length}
            >
              {picture.authors.map((author) =>
                link ? (
                  <Link href={`/users/${author.id}`} key={author.id}>
                    <Avatar
                      key={author.id}
                      alt={author.name}
                      src={author.pictureURL ?? undefined}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                ) : (
                  <Avatar
                    key={author.id}
                    alt={author.name}
                    src={author.pictureURL ?? undefined}
                    sx={{ width: 32, height: 32 }}
                  />
                ),
              )}
            </AvatarGroup>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}
