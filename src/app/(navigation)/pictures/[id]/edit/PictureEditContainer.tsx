"use client";

import {
  updatePicture,
  uploadPicture,
} from "@/_interface/backend/api/pictures";
import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import { ImageCrop, ImageUploadInput } from "@/components/ImageUploadInput";
import { NeedLoginModal } from "@/components/NeedLoginModal";
import { AuthorItem, SelectAuthors } from "@/components/SelectAuthors";
import { CharacterItem, SelectCharacters } from "@/components/selectCharacters";
import { useUser } from "@/utils/useUser";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DeleteInstructionButton } from "./DeleteInstructionButton";

type FormFields = {
  image: ImageCrop;
  type: "drawing" | "photo";
  characters?: CharacterItem[];
  authors?: AuthorItem[];
};

export function PictureEditContainer({
  picture,
}: {
  picture: PictureWithConnections;
}) {
  const prevCharacterIds = picture.characters.map((c) => c.id);
  const prevAuthorIds = picture.authors.map((a) => a.id);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormFields>();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: updatePicture,
    onError: (e) => {
      console.error(e);
      enqueueSnackbar("작품 수정에 실패했어요", { variant: "error" });
      throw e;
    },
    onSuccess: () => {
      enqueueSnackbar("작품이 수정되었어요", { variant: "success" });
      router.replace(`/pictures/${picture.id}`);
    },
  });

  const onSubmit = (data: FormFields) => {
    if (!user) return;
    const addCharacters = data.characters?.filter(
      (c) => !prevCharacterIds.includes(c.id),
    );
    const curCharacterIds = data.characters?.map((c) => c.id) || [];
    const removeCharacterIds = prevCharacterIds.filter(
      (id) => !curCharacterIds.includes(id),
    );

    const addAuthors = data.authors?.filter(
      (a) => !prevAuthorIds.includes(a.id),
    );
    const curAuthorIds = data.authors?.map((a) => a.id) || [];
    const removeSelf =
      prevAuthorIds.includes(user.id) && !curAuthorIds.includes(user.id);

    mutation.mutate({
      id: picture.id,
      image: data.image,
      type: data.type,
      addCharacters,
      removeCharacterIds,
      addAuthors,
      removeSelf,
    });
  };

  const [imagePreview, setImagePreview] = useState<string | null>(
    picture.smImage,
  );
  const onImagePreviewUpdate = (imagePreview: string) => {
    setImagePreview(imagePreview);
    const characters = getValues("characters")?.map((character) => ({
      ...character,
      smImage: character.smImage || (character.setImage ? imagePreview : null),
    }));
    setValue("characters", characters);
  };

  return (
    <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2, md: 4 } }}>
      <NeedLoginModal />
      <Typography
        variant="h3"
        mx={1}
        mb={{ xs: 1, sm: 2 }}
        mt={{ xs: 2, sm: 4 }}
      >
        작품 수정하기
      </Typography>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ width: 1, padding: 1 }}
        justifyContent="center"
      >
        <ImageUploadInput
          control={control}
          name="image"
          onImagePreviewUpdate={onImagePreviewUpdate}
          defaultImage={{
            url: picture.mdImage,
            crop: picture.crop ?? undefined,
          }}
        />
        <Typography variant="h6">작품 종류</Typography>

        <Controller
          control={control}
          name="type"
          rules={{ required: true }}
          defaultValue={picture.type}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <div>
              <ToggleButtonGroup
                color="primary"
                value={value}
                exclusive
                onChange={(e, value) => onChange(value)}
                onBlur={onBlur}
                ref={ref}
                sx={{ width: 1 }}
              >
                <ToggleButton value="drawing" fullWidth>
                  그림
                </ToggleButton>
                <ToggleButton value="photo" fullWidth>
                  사진
                </ToggleButton>
              </ToggleButtonGroup>
              {error?.type === "required" && (
                <Typography color="red">작품 종류를 선택해주세요</Typography>
              )}
            </div>
          )}
        />
        <Typography variant="h6">캐릭터</Typography>
        <Controller
          control={control}
          name="characters"
          defaultValue={picture.characters.map((c) => ({
            ...c,
            create: false,
            mine: false,
            setImage: false,
          }))}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <div>
              <SelectCharacters
                value={value}
                previousIds={prevCharacterIds}
                onChange={(characters) =>
                  onChange(
                    characters?.map((character) => ({
                      ...character,
                      smImage:
                        character.smImage ||
                        (character.setImage ? imagePreview : null),
                    })),
                  )
                }
              />
              {error?.type === "required" && (
                <Typography color="red">캐릭터를 선택해주세요</Typography>
              )}
            </div>
          )}
        />
        <Typography variant="h6">작가</Typography>
        <Controller
          control={control}
          name="authors"
          defaultValue={picture.authors.map((a) => ({ ...a, create: false }))}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <div>
              <SelectAuthors
                value={value}
                previousIds={prevAuthorIds}
                onChange={onChange}
              />
              {error?.type === "required" && (
                <Typography color="red">작가를 선택해주세요</Typography>
              )}
            </div>
          )}
        />
        <Grid2 container spacing={1}>
          <Grid2 xs={12} sm={8}>
            <Button type="submit" variant="contained" fullWidth>
              완료
            </Button>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <DeleteInstructionButton fullWidth />
          </Grid2>
        </Grid2>
      </Stack>
      <Backdrop open={mutation.isPending}>
        <Paper sx={{ p: 4 }}>
          <Stack alignItems="center" spacing={4}>
            <CircularProgress />
            <Stack alignItems="center" spacing={0.5}>
              <Typography>업로드 중입니다...</Typography>
              <Typography>잠시만 기다려주세요</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Backdrop>
    </Container>
  );
}
