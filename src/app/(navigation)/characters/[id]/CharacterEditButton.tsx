"use client";

import { updateCharacter } from "@/_interface/backend/api/characters";
import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { ImageUpload } from "@/components/ImageUpload";
import { useUser } from "@/utils/useUser";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormFields = {
  image?: File;
  nameKo?: string;
  nameEn?: string;
  species?: string;
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
  } = useForm<FormFields>({
    defaultValues: {
      nameKo: character.nameKo ?? undefined,
      nameEn: character.nameEn ?? undefined,
      species: character.species ?? undefined,
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
    setModalOpen(false);
    await updateCharacter({
      id: character.id,
      image: data.image,
      nameKo: data.nameKo,
      nameEn: data.nameEn,
      species: data.species,
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
              <ImageUpload
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
                name="species"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="종족 (선택)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
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
      </>
    );
  else return null;
}
