"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "@/utils/useUser";

export function PicturePostFab() {
  const { user } = useUser();
  if (user)
    return (
      <Fab
        LinkComponent={"a"}
        href="/post"
        color="primary"
        aria-label="post"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    );
  else return null;
}
