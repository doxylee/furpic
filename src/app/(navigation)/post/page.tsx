"use client";

import { uploadPicture } from "@/_interface/backend/api/pictures";
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
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { CharacterItem, SelectCharacters } from "@/components/selectCharacters";
import { AuthorItem, SelectAuthors } from "@/components/SelectAuthors";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ImageCrop, ImageUploadInput } from "@/components/ImageUpload";
import { NeedLoginModal } from "@/components/NeedLoginModal";

type FormFields = {
  image: ImageCrop;
  type: "drawing" | "photo";
  characters: CharacterItem[];
  authors: AuthorItem[];
};

export default function PostPage() {
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
    mutationFn: uploadPicture,
    onError: (e) => {
      console.error(e);
      enqueueSnackbar("업로드에 실패했습니다", { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("업로드에 성공했습니다", { variant: "success" });
      router.push("/"); // TODO: Check if this should be replace
    },
  });

  const onSubmit = async ({ image, type, authors, characters }: FormFields) => {
    mutation.mutate({
      image,
      type,
      authors: authors.map(({ create, id, name, twitterUsername }) =>
        create ? { name, twitterUsername: twitterUsername || null } : { id },
      ),
      characters: characters.map(
        ({ create, id, nameKo, nameEn, species, mine, setImage }) =>
          create ? { nameKo, nameEn, species, mine, setImage } : { id },
      ),
    });
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
        작품 올리기
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
          rules={{ required: true }}
          onImagePreviewUpdate={onImagePreviewUpdate}
        />
        <Typography variant="h6">작품 종류</Typography>

        <Controller
          control={control}
          name="type"
          rules={{ required: true }}
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
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <div>
              <SelectCharacters
                value={value}
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
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <div>
              <SelectAuthors value={value} onChange={onChange} />
              {error?.type === "required" && (
                <Typography color="red">작가를 선택해주세요</Typography>
              )}
            </div>
          )}
        />
        <Button type="submit" variant="contained">
          업로드
        </Button>
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
