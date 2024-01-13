"use client";

import { uploadPicture } from "@/_interface/backend/api/pictures";
import { DragDropFileUpload } from "@/components/dragDropFileUpload";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

type FormFields = {
  image: File;
  type: "drawing" | "photo";
};

export default function PostPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit = async (data: FormFields) => {
    await uploadPicture(data).catch((e) => {
      console.log(e);
      enqueueSnackbar("업로드에 실패했습니다", { variant: "error" });
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 1,
      }}
    >
      <h1>Post Page</h1>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ width: 1, maxWidth: "800px", padding: 1 }}
        justifyContent="center"
      >
        <Controller
          control={control}
          name="image"
          rules={{ required: true }}
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
              />
              {error?.type === "required" && (
                <Typography color="red">이미지를 업로드 해주세요</Typography>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="type"
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <div>
              <ButtonGroup sx={{ width: 1 }}>
                <Button
                  variant={value === "drawing" ? "contained" : "outlined"}
                  sx={{ flex: 1 }}
                  onClick={() => onChange("drawing")}
                  onBlur={onBlur}
                  ref={ref}
                >
                  그림
                </Button>
                <Button
                  variant={value === "photo" ? "contained" : "outlined"}
                  sx={{ flex: 1 }}
                  onClick={() => onChange("photo")}
                  onBlur={onBlur}
                >
                  사진
                </Button>
              </ButtonGroup>
              {error?.type === "required" && (
                <Typography color="red">작품 종류를 선택해주세요</Typography>
              )}
            </div>
          )}
        />
        <Button type="submit" variant="contained">
          제출
        </Button>
      </Stack>
    </Box>
  );
}
