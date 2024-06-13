"use client";

import {
  addViewCount,
  getPictureById,
  likePicture,
  unlikePicture,
} from "@/_interface/backend/api/pictures";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PictureEditButton } from "./PictureEditButton";
import CharactersPart from "./CharactersPart";
import AuthorsPart from "./AuthorsPart";
import { NotFoundComponent } from "@/components/404";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NeedLoginModal } from "@/components/NeedLoginModal";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/useUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import LikedUsersModal from "./LikedUsersModal";

export function PicturePageContainer({
  id,
  queryKey,
}: {
  id: string;
  queryKey: any[];
}) {
  const queryClient = useQueryClient();
  const { data: picture } = useQuery({
    queryKey,
    queryFn: () => getPictureById(id),
  });
  const { user } = useUser();
  const [needLogin, setNeedLogin] = useState(false);
  const [likedUsersOpen, setLikedUsersOpen] = useState(false);

  useEffect(() => {
    if (!picture) return;
    addViewCount(picture.id);
  }, []);

  if (!picture) return <NotFoundComponent />;

  const onLike = () => {
    if (!user) {
      setNeedLogin(true);
      return;
    }
    (picture.liked ? unlikePicture(id) : likePicture(id)).then((res) => {
      queryClient.setQueryData(queryKey, res);
    });
  };

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 0, sm: 2, md: 4 } }}>
      <NeedLoginModal open={needLogin} message="로그인이 필요한 기능이에요" />
      <LikedUsersModal
        pictureId={id}
        open={likedUsersOpen}
        onClose={() => setLikedUsersOpen(false)}
      />
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
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  fontSize={18}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setLikedUsersOpen(true)}
                >
                  {picture.likeCount}
                </Typography>
                <VisibilityIcon />
                <Typography fontSize={18}>{picture.viewCount}</Typography>
              </Stack>
            </Stack>
            <Box sx={{ flex: "1" }} />
            {picture.ogKey && (
              <Link href={`/media/${picture.ogKey}`} target="_blank" download>
                <Button size="small">원본 다운로드</Button>
              </Link>
            )}
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
