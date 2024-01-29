"use client";

import { ChangeEventHandler, DragEventHandler, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  SxProps,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";

export const DragDropFileUpload = React.forwardRef(
  (
    {
      onFileUpload,
      sx,
      onBlur,
      description,
      check,
      onImagePreview,
    }: {
      onFileUpload: (file: File) => void;
      sx?: SxProps;
      onBlur?: () => void;
      description?: string;
      check?: (file: File) => boolean;
      onImagePreview?: (imagePreview: string) => void;
    },
    ref,
  ) => {
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [cropPreview, setCropPreview] = useState<string | null>(null);

    const handleDragOver: DragEventHandler = (event) => {
      event.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave: DragEventHandler = (event) => {
      event.preventDefault();
      setDragOver(false);
    };

    const handleDrop: DragEventHandler = (event) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    };

    const handleFileChange = (file: File) => {
      if (check && !check(file)) return;
      setLoading(true);
      onFileUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
        setImagePreview(reader.result as string);
        setCropPreview(reader.result as string);
        onImagePreview?.(reader.result as string);
      };
      reader.readAsDataURL(file);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    };

    return (
      <Box sx={sx} ref={ref}>
        <Paper
          variant="outlined"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
            padding: 5,
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "#eee" : "#fafafa",
            position: "relative",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleChange}
            onBlur={onBlur}
          />
          <label htmlFor="raised-button-file">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                cursor: "pointer",
              }}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <ImageIcon style={{ fontSize: 60 }} />
              </IconButton>
              <Typography>업로드할 파일을 끌어다 놓거나 클릭하세요</Typography>
              {description && (
                <Typography fontSize={12} color="gray">
                  {description}
                </Typography>
              )}
            </Box>
          </label>
          {loading && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Paper>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ marginTop: 16 }}
        >
          {imagePreview && (
            <Grid item xs={12} sm={6} md={4}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          )}
          {cropPreview && (
            <Grid item xs={12} sm={6} md={4}>
              <Box style={{ position: "relative" }}>
                <Box sx={{ paddingTop: "100%" }}>
                  <Box
                    component="img"
                    src={cropPreview}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 1,
                      height: 1,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                썸네일 수정
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  },
);

DragDropFileUpload.displayName = "DragDropFileUpload";
