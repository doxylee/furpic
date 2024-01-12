"use client";

import { useUser } from "@/utils/useUser";
import { Button } from "@mui/material";
import Link from "next/link";

export default function IndexPage() {
  const userController = useUser();
  return (
    <div>
      <h1>Index Page</h1>
      <p>
        <Link href="/about">About</Link>
        <Button variant="contained" onClick={() => userController.startOAuth()}>
          Hello World
        </Button>
      </p>
      <p>{userController.user?.name}</p>
    </div>
  );
}
