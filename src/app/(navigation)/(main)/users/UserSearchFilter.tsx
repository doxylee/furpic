"use client";

import { Box, Button, Paper, SxProps, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function UserSearchFilter({ sx }: { sx?: SxProps }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || undefined;

  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState<string>(searchParams.get("query") || "");

  const handleSearch = () => {
    let parts = [];
    if (query) parts.push(`query=${query}`);
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
      <TextField
        label="검색어"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Box display="flex" justifyContent="right" mt={2}>
        <Button variant="contained" sx={{ ml: "auto" }} onClick={handleSearch}>
          검색
        </Button>
      </Box>
    </Paper>
  );
}
