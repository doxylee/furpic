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
import { MouseEventHandler } from "react";

export function PictureCard({
  picture,
  onClick,
  sx,
}: {
  picture: PictureWithConnections;
  onClick?: MouseEventHandler<HTMLDivElement>;
  sx?: SxProps;
}) {
  return (
    <Paper
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "auto",
        "& .hover": { opacity: 0, transition: "opacity 0.2s ease-in-out" },
        "&:hover .hover": { opacity: 1 },
        ...sx,
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "100%" }}>
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
              {picture.characters.slice(0, 3).map((character) => (
                <Avatar
                  key={character.id}
                  variant="square"
                  alt={character.nameKo || character.nameEn || undefined}
                  src={character.imageURL ?? undefined}
                  sx={{ width: 32, height: 32 }}
                />
              ))}
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
              {picture.authors.map((author) => (
                <Avatar
                  key={author.id}
                  alt={author.name}
                  src={author.pictureURL ?? undefined}
                  sx={{ width: 32, height: 32 }}
                />
              ))}
            </AvatarGroup>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}
