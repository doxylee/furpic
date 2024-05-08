import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getCharacters } from "@/_interface/backend/api/characters";
import { CharacterWall } from "@/components/CharacterWall";
import { Metadata } from "next";
import { Param, getCommaList, getFirst } from "@/utils/queryUtils";
import { CharacterSearchFilter } from "./CharacterSearchFilter";

const PER_PAGE = 60;

export const metadata: Metadata = {
  title: "FurPic - 캐릭터",
  description: "최근 등록된 캐릭터들이에요!",
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: Param, query: Param, species: Param};
}) {
  const page = searchParams.page ? parseInt(getFirst(searchParams.page)) : 1;
  const species = getCommaList(searchParams.species);
  const query = getFirst(searchParams.query);

  const data = await getCharacters({
    query,
    species,
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  });

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        캐릭터
      </Typography>
      <CharacterSearchFilter sx={{mt:2}}/>
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
