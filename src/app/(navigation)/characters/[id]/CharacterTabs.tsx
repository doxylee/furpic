"use client";

import { SxProps, Tab, Tabs } from "@mui/material";
import { usePathname } from "next/navigation";

const regex = /\/characters\/[^/]+\/([^/]+)$/;

export function CharacterTabs({ sx }: { sx?: SxProps }) {
  const pathname = usePathname();

  const value = regex.exec(pathname)?.[1];

  return (
    <Tabs value={value} sx={sx} centered>
      <Tab
        component="a"
        label="그림"
        value="drawings"
        href={`/characters/${pathname.split("/")[2]}/drawings`}
      />
      <Tab
        component="a"
        label="사진"
        value="photos"
        href={`/characters/${pathname.split("/")[2]}/photos`}
      />
    </Tabs>
  );
}
