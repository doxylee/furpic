import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getCharacters } from "@/_interface/backend/api/characters";
import { CharacterWall } from "@/components/CharacterWall";
import { Metadata } from "next";

const PER_PAGE = 60;

export const metadata: Metadata = {
  title: "FurPic - 캐릭터",
  description: "최근 등록된 캐릭터들이에요!",
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const data = await getCharacters({
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  });

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        캐릭터
      </Typography>
      <CharacterWall
        page={page}
        perPage={PER_PAGE}
        href={"/characters?"}
        data={data}
      />
      <PicturePostFab />
    </Container>
  );
}
