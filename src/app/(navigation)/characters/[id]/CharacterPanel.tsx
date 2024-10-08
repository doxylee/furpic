"use client";

import { CharacterWithUser } from "@/_interface/backend/entities/character";
import {
  Avatar,
  AvatarGroup,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { CharacterEditButton } from "./CharacterEditButton";
import { CharacterTabs } from "./CharacterTabs";
import { useSpecies } from "@/utils/useSpecies";

const COLOR_EMOJI = {
  red: "❤️",
  pink: "🩷",
  orange: "🧡",
  yellow: "💛",
  green: "💚",
  cyan: "🩵",
  blue: "💙",
  purple: "💜",
  brown: "🤎",
  black: "🖤",
  gray: "🩶",
  white: "🤍",
} as const;

export function CharacterPanel({
  character,
}: {
  character: CharacterWithUser;
}) {
  const { speciesMap } = useSpecies();

  return (
    <Paper
      elevation={3}
      sx={{
        position: { xs: "static", sm: "sticky" },
        top: 64,
        zIndex: 100,
        backgroundColor: "white",
        mb: 2,
        mx: -1,
        p: 2,
        pb: 0,
        borderRadius: "0 0 32px 32px",
      }}
    >
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        <Avatar
          src={character.smImage ?? undefined}
          variant="square"
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
            m: { xs: 1, sm: 2 },
          }}
        />
        <Stack mx={{ xs: 1, sm: 2 }} my={1} spacing={0.5}>
          <Typography variant="h4">
            {character.nameKo || character.nameEn}
          </Typography>
          {character.user && (
            <Link href={`/users/@${character.user.username}`}>
              <Typography fontSize={14} color="#aaa" sx={{ cursor: "pointer" }}>
                {character.user.name} @{character.user.username}
              </Typography>
            </Link>
          )}
        </Stack>
        <CharacterEditButton
          character={character}
          sx={{ ml: "auto", mr: { xs: 1, sm: 2 }, my: 1 }}
        />
      </Stack>
      <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
        {(character.species.length || character.speciesDetail) && (
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography fontSize={14} color="#aaa">
              종족:
            </Typography>
            {character.species.map((species) => (
              <Chip
                key={species}
                label={speciesMap?.[species].nameKo}
                sx={{ height: 18 }}
              />
            ))}
            <Typography fontSize={14} color="#aaa" mr={2}>
              {character.speciesDetail}
            </Typography>
          </Stack>
        )}
        {character.color.length > 0 && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontSize={14} color="#aaa">
              색상: {character.color.map((color) => COLOR_EMOJI[color])}
            </Typography>
          </Stack>
        )}
        {character.designers.length > 0 && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontSize={14} color="#aaa">
              디자이너:
            </Typography>
            <Tooltip
              title={character.designers.map((a) => a.name).join(", ")}
              placement="bottom"
            >
              <AvatarGroup max={4}>
                {character.designers.map((designer) => (
                  <Avatar
                    component={Link}
                    href={
                      designer.username
                        ? `/users/@${designer.username}`
                        : `/users/${designer.id}`
                    }
                    key={designer.id}
                    src={designer.xsImage ?? undefined}
                    sx={{ cursor: "pointer", height: 20, width: 20 }}
                  />
                ))}
              </AvatarGroup>
            </Tooltip>
          </Stack>
        )}
      </Stack>
      <Typography variant="body1" my={{ xs: 1, sm: 2 }}>
        {character.bio}
      </Typography>
      <CharacterTabs />
    </Paper>
  );
}
