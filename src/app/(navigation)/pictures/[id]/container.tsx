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
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Link from "next/link";
import LikedUsersModal from "./LikedUsersModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PicturePageContainer({
  id,
  queryKey,
}: {
  id: string;
  queryKey: any[];
}) {
  // data
  const queryClient = useQueryClient();
  const { data: picture } = useQuery({
    queryKey,
    queryFn: () => getPictureById(id),
  });

  // user states
  const { user } = useUser();
  const [needLogin, setNeedLogin] = useState(false);

  // liked users
  const searchParams = useSearchParams();
  const likedUsersOpen = searchParams.get("likes") === "true";
  const router = useRouter();
  const pathname = usePathname();
  const [showLikesClicked, setShowLikesClicked] = useState(false);
  const setLikedUsersOpen = (open: boolean) => {
    if (open) {
      router.push(`${pathname}?likes=${open}`, { scroll: false });
      setShowLikesClicked(true);
    } else {
      if (showLikesClicked) {
        setShowLikesClicked(false);
        router.back();
      } else {
        router.push(pathname, { scroll: false });
      }
    }
  };

  // add viewcount
  useEffect(() => {
    if (!picture) return;
    addViewCount(picture.id);
  }, []);

  // not found
  if (!picture) return <NotFoundComponent />;

  // like button
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
          <Stack direction="row" spacing={1} alignItems="center">
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
            <IconButton onClick={() => setLikedUsersOpen(true)} sx={{}}>
              <EqualizerIcon />
            </IconButton>
            {picture.ogKey && (
              <Link href={`/media/${picture.ogKey}`} target="_blank" download>
                <Button>원본 다운로드</Button>
              </Link>
            )}
            <PictureEditButton picture={picture} />
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
