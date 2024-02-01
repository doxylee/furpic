"use client";

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
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/_interface/backend/api/user";
import Grid2 from "@mui/material/Unstable_Grid2";
import { UserCard } from "./UserCard";
import { User } from "@/_interface/backend/entities/user";
import { AddUserDialog } from "./AddAuthorDialog";
import { useUser } from "@/utils/useUser";

export type UserItem = User & { create: boolean };

export function SelectUsers({
  value,
  onChange,
  previousIds = [],
  target = "작가",
}: {
  value: UserItem[] | undefined;
  onChange: (users: UserItem[] | undefined) => void;
  previousIds?: string[];
  target?: string;
}) {
  const { user } = useUser();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const removeAuthor = (author: UserItem) => {
    onChange(value?.filter((u) => u !== author));
  };

  const createAuthor = (author: UserItem) => {
    onChange([...(value || []), author]);
  };

  const [addDialogueOpen, setAddDialogueOpen] = useState<boolean>(false);

  const authors = searchQuery ? data : user ? [user] : [];

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
              {value?.map((userItem) => {
                const removable =
                  userItem.create ||
                  userItem.id === user?.id ||
                  !previousIds.includes(userItem.id);
                return (
                  <Grid2
                    key={userItem.id}
                    xs={4}
                    sm={3}
                    sx={{ position: "relative" }}
                  >
                    <UserCard user={userItem} />
                    {removable && (
                      <div style={{ position: "absolute", top: 8, right: 8 }}>
                        <IconButton onClick={() => removeAuthor(userItem)}>
                          <ClearIcon />
                        </IconButton>
                      </div>
                    )}
                  </Grid2>
                );
              })}
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
              <div>
                <Typography fontSize={14} textAlign="center">
                  {target}를 찾을 수 없나요? {target}님께 가입을 요청드리거나
                </Typography>
                <Button fullWidth onClick={() => setAddDialogueOpen(true)}>
                  {target} 직접 추가하기
                </Button>
              </div>
            )}
            <AddUserDialog
              openModal={addDialogueOpen}
              onFinish={(author) => {
                if (author) createAuthor(author);
                setAddDialogueOpen(false);
              }}
              target={target}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
