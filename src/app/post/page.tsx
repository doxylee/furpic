"use client";

import { DragDropFileUpload } from "@/components/dragDropFileUpload";
import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function PostPage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState<"drawing" | "photo" | undefined>(undefined);
  const onFileUpload = (file: File) => {
    console.log(file);
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
        onSubmit={handleSubmit((data) => console.log(data))}
        spacing={2}
        sx={{ width: 1, maxWidth: "800px", padding: 1 }}
        justifyContent="center"
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, onBlur, value, ref } }: any) => (
            <DragDropFileUpload
              onFileUpload={onChange}
              sx={{ width: 1 }}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, onBlur, value, ref } }: any) => (
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
          )}
        />
        <Button type="submit" variant="contained">
          제출
        </Button>
      </Stack>
    </Box>
  );
}
