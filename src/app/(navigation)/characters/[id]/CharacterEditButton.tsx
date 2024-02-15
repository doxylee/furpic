"use client";

import { updateCharacter } from "@/_interface/backend/api/characters";
import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { ImageCrop, ImageUploadInput } from "@/components/ImageUploadInput";
import { SelectUsers, UserItem } from "@/components/SelectUsers";
import { useUser } from "@/utils/useUser";
import { CircularProgress, Paper, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormFields = {
  image?: ImageCrop;
  nameKo?: string;
  nameEn?: string;
  alias?: string;
  species?: string;
  bio?: string;
  designers?: UserItem[];
};

export function CharacterEditButton({
  character,
  sx,
}: {
  character: CharacterWithUser;
  sx?: SxProps;
}) {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
    getFieldState,
  } = useForm<FormFields>();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: updateCharacter,
    onError: (e) => {
      console.error(e);
      enqueueSnackbar(`캐릭터 수정에 실패했어요 (${e.message})`, {
        variant: "error",
      });
    },
    onSuccess: (user) => {
      enqueueSnackbar("캐릭터를 수정했어요", { variant: "success" });
      setModalOpen(false);
      router.refresh();
    },
  });

  const openModal = () => {
    reset({
      nameKo: character.nameKo ?? "",
      nameEn: character.nameEn ?? "",
      alias: character.alias,
      species: character.species ?? "",
      bio: character.bio,
      designers: character.designers.map((designer) => ({
        ...designer,
        create: false,
      })),
    });
    setModalOpen(true);
  };

  const onCancel = () => {
    if (isDirty) setCloseDialogOpen(true);
    else setModalOpen(false);
  };

  const onSubmit = (data: FormFields) => {
    mutation.mutate({
      id: character.id,
      ...data,
      designers: data.designers?.map(({ create, id, name, twitterUsername }) =>
        create ? { name, twitterUsername: twitterUsername || null } : { id },
      ),
    });
  };

  if (user && user.id === character.userId)
    return (
      <>
        <Button variant="outlined" onClick={openModal} sx={sx}>
          수정
        </Button>
        <Dialog open={modalOpen} onClose={() => onCancel()}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>캐릭터 수정하기</DialogTitle>
            <DialogContent>
              <ImageUploadInput
                control={control}
                name="image"
                rules={{ required: false }}
              />
              <Controller
                name="nameKo"
                control={control}
                rules={{
                  validate: {
                    required: (_, formValues) =>
                      !!(formValues.nameEn || formValues.nameKo),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="한글 이름 (최소 하나)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    {error?.type === "required" && (
                      <Typography color="red">
                        캐릭터의 이름을 입력해주세요
                      </Typography>
                    )}
                  </>
                )}
              />
              <Controller
                name="nameEn"
                control={control}
                rules={{
                  validate: {
                    required: (_, formValues) =>
                      !!(formValues.nameEn || formValues.nameKo),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="영어 이름 (최소 하나)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    {error?.type === "required" && (
                      <Typography color="red">
                        캐릭터의 이름을 입력해주세요
                      </Typography>
                    )}
                  </>
                )}
              />

              <Controller
                name="alias"
                control={control}
                rules={{
                  maxLength: {
                    value: 50,
                    message: "별칭은 50자 이내로 작성해주세요",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="별칭 (이 이름으로도 검색돼요)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    {error && (
                      <Typography color="red">{error.message}</Typography>
                    )}
                  </>
                )}
              />

              <Controller
                name="species"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="종족 (선택)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    {error && (
                      <Typography color="red">{error.message}</Typography>
                    )}
                  </>
                )}
              />

              <Controller
                name="bio"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 160,
                    message: "소개는 160자 이내로 입력해주세요",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="소개 (선택)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    {error && (
                      <Typography color="red">{error.message}</Typography>
                    )}
                  </>
                )}
              />

              <Typography variant="h6">디자이너</Typography>
              <Controller
                control={control}
                name="designers"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <SelectUsers
                    value={value}
                    onChange={onChange}
                    target="디자이너"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit">저장</Button>
              <Button onClick={() => onCancel()}>취소</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          open={closeDialogOpen}
          onClose={() => setCloseDialogOpen(false)}
        >
          <DialogContent>
            수정 중인 내용이 있어요. 정말 닫으실건가요?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setCloseDialogOpen(false);
                setModalOpen(false);
              }}
            >
              닫기
            </Button>
            <Button onClick={() => setCloseDialogOpen(false)}>취소</Button>
          </DialogActions>
        </Dialog>
        {/* Use Dialog instead of Backdrop due to z-index issue */}
        <Dialog open={mutation.isPending}>
          <Paper sx={{ p: 4, zIndex: 10 }}>
            <Stack alignItems="center" spacing={4}>
              <CircularProgress />
              <Stack alignItems="center" spacing={0.5}>
                <Typography>업데이트 중입니다...</Typography>
                <Typography>잠시만 기다려주세요</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Dialog>
      </>
    );
  else return null;
}
