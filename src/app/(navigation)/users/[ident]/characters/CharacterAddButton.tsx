"use client";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { createCharacter } from "@/_interface/backend/api/characters";
import { useMutation } from "@tanstack/react-query";
import { ImageCrop, ImageUploadInput } from "@/components/ImageUploadInput";
import { SelectUsers, UserItem } from "@/components/SelectUsers";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

type FormFields = {
  image?: ImageCrop;
  nameKo?: string;
  nameEn?: string;
  alias?: string;
  species?: string;
  bio: string;
  designers: UserItem[];
};

export function CharacterAddButton({ sx }: { sx?: SxProps }) {
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

  const openModal = () => {
    reset();
    setModalOpen(true);
  };

  const onCancel = () => {
    if (isDirty) setCloseDialogOpen(true);
    else setModalOpen(false);
  };

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createCharacter,
    onError: (e) => {
      console.error(e);
      enqueueSnackbar(`캐릭터 생성에 실패했어요 (${e.message})`, {
        variant: "error",
      });
    },
    onSuccess: (user) => {
      enqueueSnackbar("캐릭터를 생성했어요", { variant: "success" });
      setModalOpen(false);
      router.refresh();
    },
  });

  const onSubmit = (data: FormFields) => {
    mutation.mutate({
      ...data,
      designers: data.designers.map(({ create, id, name, twitterUsername }) =>
        create ? { name, twitterUsername: twitterUsername || null } : { id },
      ),
    });
  };

  return (
    <>
      <Grid2 xs={6} sm={4} md={3} lg={2}>
        <Stack
          onClick={openModal}
          spacing={1}
          sx={{
            height: "100%",
            border: "#53b5ff dashed 2px",
            borderRadius: "16px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            ...sx,
          }}
        >
          <AddIcon fontSize="large" />
          <Typography>캐릭터 추가하기</Typography>
        </Stack>
      </Grid2>
      <Dialog open={modalOpen} onClose={onCancel}>
        <DialogTitle>캐릭터 추가하기</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ImageUploadInput control={control} name="image" />
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
              defaultValue=""
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
              defaultValue=""
              rules={{
                maxLength: {
                  value: 60,
                  message: "종족은 60자 이내로 입력해주세요",
                },
              }}
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
              rules={{ required: "디자이너를 선택해주세요" }}
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              추가하기
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>취소</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={closeDialogOpen} onClose={() => setCloseDialogOpen(false)}>
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
              <Typography>캐릭터 생성 중입니다...</Typography>
              <Typography>잠시만 기다려주세요</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Dialog>
    </>
  );
}
