"use client";

import { SelectColor } from "@/components/SelectColor";
import { SelectSpecies } from "@/components/SelectSpecies";
import { useSpecies } from "@/utils/useSpecies";
import {
  Box,
  Button,
  Paper,
  Stack,
  SxProps,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function CharacterSearchFilter({ sx }: { sx?: SxProps }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || undefined;

  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [species, setSpecies] = useState<string[]>(
    searchParams.get("species")?.split(",") || [],
  );
  const [color, setColor] = useState<string[]>(
    searchParams.get("color")?.split(",") || [],
  );
  const [colorMatch, setColorMatch] = useState<string>(
    searchParams.get("colorMatch") || "some",
  );

  const handleSearch = () => {
    let parts = [];
    if (query) parts.push(`query=${query}`);
    if (species.length) parts.push(`species=${species.join(",")}`);
    if (page) parts.push(`page=${page}`);
    if (color.length) parts.push(`color=${color.join(",")}`);
    if (colorMatch && colorMatch != "some")
      parts.push(`colorMatch=${colorMatch}`);
    router.push(`${pathname}?${parts.join("&")}`);
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.charCode === 13 || e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Paper sx={{ p: 2, ...sx }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <TextField
            label="검색어"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <SelectSpecies value={species} onChange={setSpecies} label="종족" />
        </Grid2>
      </Grid2>
      <Stack direction="row" flexWrap="wrap" mt={2} gap={1}>
        <SelectColor value={color} onChange={setColor} />
        <ToggleButtonGroup
          color="primary"
          value={colorMatch}
          exclusive
          size="small"
          onChange={(_, value) => setColorMatch(value)}
        >
          <ToggleButton value="some">일부 포함</ToggleButton>
          <ToggleButton value="every">전부 포함</ToggleButton>
          <ToggleButton value="exact">완전 일치</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box display="flex" justifyContent="right" mt={2}>
        <Button variant="contained" sx={{ ml: "auto" }} onClick={handleSearch}>
          검색
        </Button>
      </Box>
    </Paper>
  );
}
