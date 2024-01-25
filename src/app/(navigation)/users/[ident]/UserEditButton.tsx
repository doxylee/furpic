"use client";

import { updateMyUser } from "@/_interface/backend/api/user";
import { User } from "@/_interface/backend/entities/user";
import { ImageUpload } from "@/components/ImageUpload";
import { usernameRegex } from "@/utils/constants";
import { FetchError } from "@/utils/fetch";
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
  image?: File;
  name?: string;
  username?: string;
  bio?: string;
};

export function UserEditButton({
  pageUser,
  sx,
}: {
  pageUser: User;
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
  } = useForm<FormFields>({
    defaultValues: {
      name: pageUser?.name ?? "",
      username: pageUser?.username ?? "",
      bio: pageUser?.bio ?? "",
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: updateMyUser,
    onError: (e) => {
      if (e instanceof FetchError && e.error === "USERNAME_TAKEN") {
        enqueueSnackbar("이미 사용중인 유저네임이에요", { variant: "error" });
      } else {
        console.error(e);
        enqueueSnackbar(`프로필 변경에 실패했어요 (${e.message})`, {
          variant: "error",
        });
      }
    },
    onSuccess: (user) => {
      enqueueSnackbar("프로필을 변경했어요", { variant: "success" });
      setModalOpen(false);
      router.replace(`/users/@${user.username}`);
    },
  });

  const openModal = () => {
    reset();
    setModalOpen(true);
  };

  const onCancel = () => {
    if (isDirty) setCloseDialogOpen(true);
    else setModalOpen(false);
  };

  const onSubmit = async (data: FormFields) => {
    mutation.mutate({
      name: data.name,
      username: data.username,
      bio: data.bio,
      image: data.image,
    });
  };

  if (user && pageUser.id === user.id)
    return (
      <>
        <Button variant="outlined" onClick={openModal} sx={sx}>
          수정
        </Button>
        <Dialog open={modalOpen} onClose={() => onCancel()}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>프로필 수정하기</DialogTitle>
            <DialogContent>
              <ImageUpload control={control} name="image" />
              <Controller
                name="name"
                control={control}
                rules={{
                  required: { value: true, message: "닉네임을 입력해주세요" },
                  minLength: {
                    value: 1,
                    message: "닉네임은 1~50자만 가능해요",
                  },
                  maxLength: {
                    value: 50,
                    message: "닉네임은 1~50자만 가능해요",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="닉네임"
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
                name="username"
                control={control}
                rules={{
                  required: { value: true, message: "유저네임을 입력해주세요" },
                  pattern: {
                    value: usernameRegex,
                    message: "유저네임은 영어, 숫자, _로 4~15자만 가능해요",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="유저네임"
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
                rules={{
                  maxLength: {
                    value: 160,
                    message: "소개는 160자 이내로 작성해주세요",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      label="소개"
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
