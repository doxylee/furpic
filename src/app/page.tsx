"use client";

import { useUser } from "@/utils/useUser";
import { Button, Fab } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function IndexPage() {
  const userController = useUser();
  return (
    <div>
      <h1>Index Page</h1>
      <p>
        <Button variant="contained" onClick={() => userController.startOAuth()}>
          Hello World
        </Button>
      </p>
      <p>{userController.user?.name}</p>
      <Fab
        LinkComponent={"a"}
        href="/post"
        color="primary"
        aria-label="post"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
