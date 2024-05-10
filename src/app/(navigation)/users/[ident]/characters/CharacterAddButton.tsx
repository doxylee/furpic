"use client";

import {
  CircularProgress,
  Dialog,
  Paper,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createCharacter } from "@/_interface/backend/api/characters";
import { useMutation } from "@tanstack/react-query";
import { ImageCrop } from "@/components/ImageUploadInput";
import { UserItem } from "@/components/SelectUsers";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { CharacterEditDialog } from "@/components/CharacterEditDialog";
import { Color } from "@/_interface/backend/entities/character";

type FormFields = {
  image?: ImageCrop;
  nameKo?: string;
  nameEn?: string;
  alias?: string;
  species?: string[];
  speciesDetail?: string;
  color?: Color[];
  bio: string;
  designers: UserItem[];
};

export function CharacterAddButton({ sx }: { sx?: SxProps }) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm<FormFields>();

  const openModal = () => {
    reset();
    setModalOpen(true);
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

      <CharacterEditDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        isDirty={isDirty}
        dialogTitle="캐릭터 추가하기"
      />

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
