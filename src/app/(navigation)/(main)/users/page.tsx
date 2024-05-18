import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PicturePostFab } from "@/components/PicturePostFab";
import { Metadata } from "next";
import { Param, getFirst } from "@/utils/queryUtils";
import { UserSearchFilter } from "./UserSearchFilter";
import { UserWall } from "@/components/UserWall";
import { getUsers } from "@/_interface/backend/api/user";

const PER_PAGE = 60;

export const metadata: Metadata = {
  title: "FurPic - 캐릭터",
  description: "최근 등록된 캐릭터들이에요!",
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page: Param; query: Param; species: Param };
}) {
  const page = searchParams.page ? parseInt(getFirst(searchParams.page)) : 1;
  const query = getFirst(searchParams.query);

  const data = await getUsers({
    query,
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  });

  let href = `/users?`;
  if (query) href += `query=${query}&`;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 }, pb: 2 }}>
      <Typography variant="h2" mt={4}>
        유저
      </Typography>
      <UserSearchFilter sx={{ mt: 2 }} />
      <UserWall page={page} perPage={PER_PAGE} href={href} data={data} />
      <PicturePostFab />
    </Container>
  );
}
