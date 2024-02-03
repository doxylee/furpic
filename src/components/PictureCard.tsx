"use client";

import {
  PictureWithConnections,
  PictureWithConnectionsAndLiked,
} from "@/_interface/backend/entities/picture";
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { MouseEventHandler } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export function PictureCard({
  picture,
  onClick,
  onLike,
  link = false,
  sx,
}: {
  picture: PictureWithConnectionsAndLiked;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onLike?: (id: string, liked: boolean) => void;
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
          src={picture.smImage}
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
            background: "rgba(0, 0, 0, 0.4)",
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
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              color: "white",
              p: 1,
            }}
          >
            {picture.liked ? (
              <FavoriteIcon
                onClick={() =>
                  picture.liked !== undefined && onLike?.(picture.id, false)
                }
                color="heart"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() =>
                  picture.liked !== undefined && onLike?.(picture.id, true)
                }
              />
            )}
            <Typography fontSize={18}>{picture.likeCount}</Typography>
          </Stack>

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
                      src={character.xsImage ?? undefined}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                ) : (
                  <Avatar
                    key={character.id}
                    variant="square"
                    alt={character.nameKo || character.nameEn || undefined}
                    src={character.xsImage ?? undefined}
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
                      src={author.xsImage ?? undefined}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                ) : (
                  <Avatar
                    key={author.id}
                    alt={author.name}
                    src={author.xsImage ?? undefined}
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
