"use server";

import { presentPictureWithConnections } from "@/_backend/presenters/picture";
import { pictureRepository } from "@/_backend/repositories/picture";
import { NotFoundComponent } from "@/components/404";
import { CharacterCard } from "@/components/CharacterCard";
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CharactersPart from "./CharactersPart";
import AuthorsPart from "./AuthorsPart";

export default async function PicturePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await pictureRepository.getPictureById(params.id);
  if (!data) return <NotFoundComponent />;

  const picture = presentPictureWithConnections(data);

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
