import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PicturePostFab } from "@/components/PicturePostFab";
import { getCharacters } from "@/_interface/backend/api/characters";
import { CharacterWall } from "@/components/CharacterWall";
import { Metadata } from "next";
import { Param, getCommaList, getFirst } from "@/utils/queryUtils";
import { CharacterSearchFilter } from "./CharacterSearchFilter";
import { Color, ColorMatch } from "@/_interface/backend/entities/character";

const PER_PAGE = 6;

export const metadata: Metadata = {
  title: "FurPic - 캐릭터",
  description: "최근 등록된 캐릭터들이에요!",
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: {
    page: Param;
    query: Param;
    species: Param;
    color: Param;
    colorMatch: Param;
  };
}) {
  const page = searchParams.page ? parseInt(getFirst(searchParams.page)) : 1;
  const query = getFirst(searchParams.query);
  const species = getCommaList(searchParams.species);
  const color = getCommaList<Color>(searchParams.color);
  const colorMatch = getFirst(searchParams.colorMatch) as
    | ColorMatch
    | undefined;

  const data = await getCharacters({
    query,
    species,
    color,
    colorMatch,
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  });

    let parts = [];
    if (query) parts.push(`query=${query}`);
    if (species?.length) parts.push(`species=${species.join(",")}`);
    if (color?.length) parts.push(`color=${color.join(",")}`);
    if (colorMatch && colorMatch != "some")
      parts.push(`colorMatch=${colorMatch}`);
    const href = `/characters?${parts.join("&")}&`;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        캐릭터
      </Typography>
      <CharacterSearchFilter sx={{ mt: 2 }} />
      <CharacterWall
        page={page}
        perPage={PER_PAGE}
        href={href}
        data={data}
      />
      <PicturePostFab />
    </Container>
  );
}
