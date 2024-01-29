"use client";

import {
  updatePicture,
  uploadPicture,
} from "@/_interface/backend/api/pictures";
import { PictureWithConnections } from "@/_interface/backend/entities/picture";
import { ImageCrop, ImageUploadInput } from "@/components/ImageUploadInput";
import { NeedLoginModal } from "@/components/NeedLoginModal";
import { AuthorItem } from "@/components/SelectAuthors";
import { CharacterItem } from "@/components/selectCharacters";
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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormFields = {
  image: ImageCrop;
  type: "drawing" | "photo";
  // addCharacters: CharacterItem[];
  // addAuthors: AuthorItem[];
};

export function PictureEditContainer({
  picture,
}: {
  picture: PictureWithConnections;
}) {
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
    mutation.mutate({
      id: picture.id,
      image: data.image,
      type: data.type,
    });
  };

  const [imagePreview, setImagePreview] = useState<string | null>(
    picture.smImage,
  );
  const onImagePreviewUpdate = (imagePreview: string) => {
    setImagePreview(imagePreview);
    // const characters = getValues("addCharacters")?.map((character) => ({
    //   ...character,
    //   smImage: character.smImage || (character.setImage ? imagePreview : null),
    // }));
    // setValue("addCharacters", characters);
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
        {/* <Controller
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
        /> */}
        <Typography variant="h6">작가</Typography>
        {/* <Controller
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
        /> */}
        <Button type="submit" variant="contained">
          완료
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
