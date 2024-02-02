"use client";

import {
  getPictureById,
  likePicture,
  unlikePicture,
} from "@/_interface/backend/api/pictures";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PictureEditButton } from "./PictureEditButton";
import CharactersPart from "./CharactersPart";
import AuthorsPart from "./AuthorsPart";
import { NotFoundComponent } from "@/components/404";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NeedLoginModal } from "@/components/NeedLoginModal";
import { useState } from "react";
import { useUser } from "@/utils/useUser";

export function PicturePageContainer({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { data: picture } = useQuery({
    queryKey: ["pictures", id],
    queryFn: () => getPictureById(id),
  });
  const { user } = useUser();
  const [needLogin, setNeedLogin] = useState(false);

  if (!picture) return <NotFoundComponent />;

  const onLike = () => {
    if (!user) {
      setNeedLogin(true);
      return;
    }
    (picture.liked ? unlikePicture(id) : likePicture(id)).then((res) => {
      queryClient.setQueryData(["pictures", id], res);
    });
  };

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 0, sm: 2, md: 4 } }}>
      <NeedLoginModal open={needLogin} message="로그인이 필요한 기능이에요" />
      <Stack spacing={2}>
        <Box
          component="img"
          alt={picture.id}
          src={picture.mdImage}
          sx={{ width: 1 }}
        />
        <Stack spacing={2} sx={{ px: { xs: 1, sm: 0 } }}>
          <Stack direction="row" spacing={1}>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={onLike}>
                {picture.liked ? (
                  <FavoriteIcon color="heart" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography fontSize={18}>{picture.likeCount}</Typography>
            </Stack>
            <Box sx={{ flex: "1" }} />
            <PictureEditButton picture={picture} size="small" />
          </Stack>
          <Typography variant="h5">캐릭터</Typography>
          <CharactersPart characters={picture.characters} />
          <Typography variant="h5">작가</Typography>
          <AuthorsPart authors={picture.authors} type={picture.type} />
        </Stack>
      </Stack>
    </Container>
  );
}
