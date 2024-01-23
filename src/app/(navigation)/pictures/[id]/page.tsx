"use server";

import { NotFoundComponent } from "@/components/404";
import { Box, Container, Stack, Typography } from "@mui/material";
import CharactersPart from "./CharactersPart";
import AuthorsPart from "./AuthorsPart";
import { getPictureById } from "@/_interface/backend/api/pictures";
import { FetchError } from "@/utils/fetch";

export default async function PicturePage({
  params,
}: {
  params: { id: string };
}) {
  let picture;
  try {
    picture = await getPictureById(params.id);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404)
      return <NotFoundComponent />; // TODO: Customized 404 page. There's more like this, find them
    throw e;
  }

  return (
    <Container maxWidth="x2l" sx={{ p: 4 }}>
      <Stack spacing={2}>
        <Box
          component="img"
          alt={picture.id}
          src={picture.imageURL}
          sx={{ width: 1 }}
        />
        <Typography variant="h5">캐릭터</Typography>
        <CharactersPart characters={picture.characters} />
        <Typography variant="h5">작가</Typography>
        <AuthorsPart authors={picture.authors} type={picture.type} />
      </Stack>
    </Container>
  );
}
