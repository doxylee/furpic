"use client";

import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { UserCard } from "./UserCard";
import { User } from "@/_interface/backend/entities/user";

export function UserWall({
  page,
  perPage = 60,
  href,
  data,
}: {
  page: number;
  perPage?: number;
  href: string;
  data: { results: User[]; count: number } | undefined;
}) {
  return (
    <>
      <Grid2 container spacing={{ xs: 1, sm: 2 }} pt={2}>
        {data?.results.map((user) => (
          <Grid2 xs={6} sm={4} md={3} lg={2} key={user.id}>
            <UserCard user={user} link />
          </Grid2>
        ))}
      </Grid2>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          page={page}
          count={data ? Math.ceil(data.count / perPage) : 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={href + `page=${item.page}`}
              {...item}
            />
          )}
        />
      </Box>
    </>
  );
}
