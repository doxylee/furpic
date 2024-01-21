"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "@/utils/useUser";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { DragDropFileUpload } from "@/components/dragDropFileUpload";
import { enqueueSnackbar } from "notistack";
import { createCharacter } from "@/_interface/backend/api/characters";

type FormFields = {
  image?: File;
  nameKo?: string;
  nameEn?: string;
  species?: string;
};

export function CharacterAddButton({
  sx,
  userId,
}: {
  sx?: SxProps;
  userId: string;
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
    await createCharacter({
      image: data.image,
      nameKo: data.nameKo,
      nameEn: data.nameEn,
      species: data.species,
    });
  };

  if (user && user.id === userId)
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
              <Controller
                control={control}
                name="image"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <div>
                    <DragDropFileUpload
                      onFileUpload={onChange}
                      sx={{ width: 1 }}
                      onBlur={onBlur}
                      ref={ref}
                      description="10MB 이하, jpg, png, gif 이미지"
                      check={(file) => {
                        if (file.size > 10 * 1024 * 1024) {
                          enqueueSnackbar(
                            "10MB 이하의 이미지를 업로드 해주세요",
                            {
                              variant: "error",
                            },
                          );
                          return false;
                        }
                        // only jpg, png, gif
                        if (!file.type.match(/image\/(jpeg|png|gif)/)) {
                          enqueueSnackbar(
                            "jpg, png, gif 이미지만 업로드 해주세요",
                            {
                              variant: "error",
                            },
                          );
                          return false;
                        }
                        return true;
                      }}
                    />
                  </div>
                )}
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
