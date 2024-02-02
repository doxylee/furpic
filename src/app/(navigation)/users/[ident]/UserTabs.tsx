"use client";

import { SxProps, Tab, Tabs } from "@mui/material";
import { usePathname } from "next/navigation";

const regex = /\/users\/[^/]+\/([^/]+)$/;

export function UserTabs({ sx }: { sx?: SxProps }) {
  const pathname = usePathname();

  const value = regex.exec(pathname)?.[1];

  return (
    <Tabs value={value || false} sx={sx} centered>
      <Tab
        component="a"
        label="그림"
        value="drawings"
        href={`/users/${pathname.split("/")[2]}/drawings`}
      />
      <Tab
        component="a"
        label="사진"
        value="photos"
        href={`/users/${pathname.split("/")[2]}/photos`}
      />
      <Tab
        component="a"
        label="캐릭터"
        value="characters"
        href={`/users/${pathname.split("/")[2]}/characters`}
      />
      <Tab
        component="a"
        label="좋아요"
        value="liked"
        href={`/users/${pathname.split("/")[2]}/liked`}
      />
    </Tabs>
  );
}
