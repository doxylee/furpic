"use client";

import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PictureCard } from "./PictureCard";
import { Box, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

export function PictureWall({
  page,
  perPage = 60,
  href,
  data,
  onLike,
}: {
  page: number;
  perPage?: number;
  href: string;
  data: { results: PictureWithConnections[]; count: number } | undefined;
  onLike?: (id: string, liked: boolean) => void;
}) {
  return (
    <>
      <Grid2 container spacing={{ xs: 1, sm: 2 }} pt={2}>
        {data?.results.map((picture) => (
          <Grid2 xs={6} sm={4} md={3} lg={2} key={picture.id}>
            <PictureCard picture={picture} sx={{ cursor: "pointer" }} link onLike={onLike} />
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
