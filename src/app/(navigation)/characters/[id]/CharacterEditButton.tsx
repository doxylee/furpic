"use client";

import { updateCharacter } from "@/_interface/backend/api/characters";
import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { CharacterEditDialog } from "@/components/CharacterEditDialog";
import { ImageCrop } from "@/components/ImageUploadInput";
import { UserItem } from "@/components/SelectUsers";
import { useUser } from "@/utils/useUser";
import { CircularProgress, Paper, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormFields = {
  image?: ImageCrop;
  nameKo?: string;
  nameEn?: string;
  alias?: string;
  speciesDetail?: string;
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
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
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
      speciesDetail: character.speciesDetail ?? "",
      bio: character.bio,
      designers: character.designers.map((designer) => ({
        ...designer,
        create: false,
      })),
    });
    setModalOpen(true);
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

        <CharacterEditDialog
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          onSubmit={handleSubmit(onSubmit)}
          dialogTitle="캐릭터 수정"
          control={control}
          isDirty={isDirty}
        />

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
