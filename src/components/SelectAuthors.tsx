import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/_interface/backend/api/user";
import Grid2 from "@mui/material/Unstable_Grid2";
import { UserCard } from "./UserCard";
import { User } from "@/_interface/backend/entities/user";
import { AddAuthorDialog } from "./AddAuthorDialog";
import { useUser } from "@/utils/useUser";

export type AuthorItem = User & { create: boolean };

export function SelectAuthors({
  value,
  onChange,
}: {
  value: AuthorItem[] | undefined;
  onChange: (users: AuthorItem[] | undefined) => void;
}) {
  const { user } = useUser();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const onSearch = (term: string) => {
    if (!term) return;
    setSearchQuery(term);
  };
  const { data, isFetching } = useQuery({
    queryKey: ["users", "search", searchQuery],
    enabled: !!searchQuery,
    queryFn: () => searchUsers(searchQuery),
  });

  const onAuthorClick = (user: User) => {
    if (!value?.find((u) => u.id === user.id)) {
      onChange([...(value || []), { ...user, create: false }]);
    }
  };

  const removeAuthor = (author: AuthorItem) => {
    onChange(value?.filter((u) => u !== author));
  };

  const createAuthor = (author: AuthorItem) => {
    onChange([...(value || []), author]);
  };

  const [addDialogueOpen, setAddDialogueOpen] = useState<boolean>(false);

  const authors = data?.length ? data : user?[user]:[];

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
              {value?.map((user) => (
                <Grid2
                  key={user.id}
                  xs={4}
                  sm={3}
                  sx={{ position: "relative" }}
                >
                  <UserCard user={user} />
                  <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <IconButton onClick={() => removeAuthor(user)}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                </Grid2>
              ))}
            </Grid2>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => setExpanded(!expanded)}>
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
              onRequestSearch={onSearch}
              searchIcon={<SearchIcon />}
              placeholder="작가 검색"
              loading={isFetching}
            />
            <Grid2 container spacing={1}>
              {authors?.map((user) => (
                <Grid2 key={user.id} xs={4} sm={3}>
                  <UserCard user={user} onClick={() => onAuthorClick(user)} />
                </Grid2>
              ))}
            </Grid2>
            {data && (
              <Button onClick={() => setAddDialogueOpen(true)}>
                작가를 찾을 수 없나요? 작가 직접 추가하기
              </Button>
            )}
            <AddAuthorDialog
              openModal={addDialogueOpen}
              onFinish={(author) => {
                if (author) createAuthor(author);
                setAddDialogueOpen(false);
              }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
