import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import { Box, Paper } from "@mui/material";
import { MouseEventHandler } from "react";

export function PictureCard({
  picture,
  onClick,
}: {
  picture: PictureWithConnections;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Paper onClick={onClick} sx={{ cursor: onClick ? "pointer" : "auto" }}>
      <Box
        component="img"
        sx={{ position: "relative", paddingTop: "100%" }}
      ></Box>
    </Paper>
  );
}
