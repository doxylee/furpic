"use client";

import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import { useUser } from "@/utils/useUser";
import { Box, Button, SxProps } from "@mui/material";
import Link from "next/link";

export function PictureEditButton({
  picture,
  sx,
  size,
}: {
  picture: PictureWithConnections;
  sx?: SxProps;
  size?: "small" | "medium" | "large";
}) {
  const { user } = useUser();
  const editable =
    picture.authors.some((author) => author.id === user?.id) ||
    picture.characters.some((character) => character.user?.id === user?.id);

  if (editable)
    return (
      <Box sx={sx}>
        <Link href={`/pictures/${picture.id}/edit`}>
          <Button variant="outlined" size={size} color="primary">
            수정
          </Button>
        </Link>
      </Box>
    );
  else return null;
}
