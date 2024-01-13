import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function SelectCharacters() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const onSearch = () => {
    console.log(search);
  };
  return (
    <Box>
      <Accordion expanded={expanded}>
        <AccordionSummary sx={{"& .MuiAccordionSummary-content.Mui-expanded":{margin:"12px 0"}}}>
          <Stack width={1}>
            asdf
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => setExpanded(!expanded)}>
                {expanded ? <ArrowDropUpIcon /> : <AddIcon />}
              </IconButton>
            </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack width={1}>
            <SearchBar
              value={search}
              onChange={(newValue) => setSearch(newValue)}
              onRequestSearch={onSearch}
              searchIcon={<SearchIcon />}
              placeholder="캐릭터/오너 검색"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
