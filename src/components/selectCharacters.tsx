import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { CharacterWithUser } from "@/_interface/backend/entities/character";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CharacterCard } from "./CharacterCard";
import { AddCharacterDialog } from "./AddCharacterDialog";
import { useQuery } from "@tanstack/react-query";
import {
  fullSearchCharacters,
  getMyCharacters,
} from "@/_interface/backend/api/characters";

export type CharacterItem = CharacterWithUser & {
  create: boolean;
  mine: boolean;
  setImage: boolean;
};

export function SelectCharacters({
  value,
  onChange,
}: {
  value: CharacterItem[] | undefined;
  onChange: (characters: CharacterItem[] | undefined) => void;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isFetching } = useQuery({
    queryKey: ["characters", "fullSearch", searchQuery],
    enabled: !!searchQuery,
    queryFn: () => fullSearchCharacters(searchQuery),
  });

  const onCharacterClick = (character: CharacterWithUser) => {
    if (!value?.find((u) => u.id === character.id)) {
      onChange([
        ...(value || []),
        { ...character, create: false, mine: false, setImage: false },
      ]);
    }
  };

  const removeCharacter = (character: CharacterItem) => {
    onChange(value?.filter((u) => u !== character));
  };

  const createCharacter = (character: CharacterItem) => {
    onChange([...(value || []), character]);
  };

  const [addDialogueOpen, setAddDialogueOpen] = useState<boolean>(false);

  const { data: myCharacters } = useQuery({
    queryKey: ["characters", "mine"],
    queryFn: () => getMyCharacters(),
  });

  const characters = searchQuery ? data : myCharacters;

  return (
    <Box>
      <Accordion expanded={expanded}>
        <AccordionSummary
          sx={{
            "& .MuiAccordionSummary-content.Mui-expanded": { margin: "12px 0" },
          }}
        >
          <Stack width={1}>
            <Grid2 container spacing={1}>
              {value?.map((character) => (
                <Grid2
                  key={character.id}
                  xs={4}
                  sm={3}
                  sx={{ position: "relative" }}
                >
                  <CharacterCard character={character} />
                  <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <IconButton onClick={() => removeCharacter(character)}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                </Grid2>
              ))}
            </Grid2>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end" }}
              onClick={() => setExpanded(!expanded)}
            >
              <IconButton>
                {expanded ? <ArrowDropUpIcon /> : <AddIcon />}
              </IconButton>
            </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack width={1} spacing={1}>
            <SearchBar
              value={search}
              onChange={(newValue) => setSearch(newValue)}
              onRequestSearch={setSearchQuery}
              searchIcon={<SearchIcon />}
              placeholder="캐릭터/오너 검색"
              loading={isFetching}
            />
            <Grid2 container spacing={1}>
              {characters?.map((character) => (
                <Grid2 key={character.id} xs={4} sm={3}>
                  <CharacterCard
                    character={character}
                    onClick={() => onCharacterClick(character)}
                  />
                </Grid2>
              ))}
            </Grid2>
            {data && (
              <div>
                <Typography fontSize={14} textAlign="center">
                  캐릭터를 찾을 수 없나요? 오너님께 추가를 요청드리거나
                </Typography>
                <Button fullWidth onClick={() => setAddDialogueOpen(true)}>
                  캐릭터 직접 추가하기
                </Button>
              </div>
            )}
            <AddCharacterDialog
              openModal={addDialogueOpen}
              canSetImage
              onFinish={(author) => {
                if (author) createCharacter(author);
                setAddDialogueOpen(false);
              }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
