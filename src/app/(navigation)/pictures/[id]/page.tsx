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
    <Container maxWidth="xl" sx={{ p: { xs: 0, sm: 2, md: 4 } }}>
      <Stack spacing={2}>
        <Box
          component="img"
          alt={picture.id}
          src={picture.mdImage}
          sx={{ width: 1 }}
        />
        <Stack spacing={2} sx={{ px: { xs: 1, sm: 0 } }}>
          <Typography variant="h5">캐릭터</Typography>
          <CharactersPart characters={picture.characters} />
          <Typography variant="h5">작가</Typography>
          <AuthorsPart authors={picture.authors} type={picture.type} />
        </Stack>
      </Stack>
    </Container>
  );
}
