"use client";

import { ChangeEventHandler, DragEventHandler, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  SxProps,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PixelCrop,
  convertToPixelCrop,
  PercentCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "@/utils/canvasPreview";
import { convertToPixelCropFloored } from "@/utils/crop";

export const ImageUpload = React.forwardRef(
  (
    {
      onFileUpload,
      onCropChange,
      sx,
      onBlur,
      description,
      check,
      onImagePreview,
      circleCrop = false,
    }: {
      onFileUpload: (file: File) => void;
      onCropChange: (crop: PixelCrop) => void;
      sx?: SxProps;
      onBlur?: () => void;
      description?: string;
      check?: (file: File) => boolean;
      onImagePreview?: (imagePreview: string) => void;
      circleCrop?: boolean;
    },
    ref,
  ) => {
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const previewImg = useRef<HTMLImageElement>(null);
    const croppedCanvas = useRef<HTMLCanvasElement>(null);

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
      };
      reader.readAsDataURL(file);
    };

    const previewLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const crop = centerAspectCrop(width, height);
      setCrop(crop);
      setCompletedCrop(convertToPixelCrop(crop, width, height), crop);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    };

    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [crop, setCrop] = useState<PercentCrop>();

    const setCompletedCrop = (_: PixelCrop, percentCrop: PercentCrop) => {
      if (!previewImg.current || !croppedCanvas.current) return;
      const { width, height, naturalWidth, naturalHeight } = previewImg.current;
      const pixelCrop = convertToPixelCrop(percentCrop, width, height);
      canvasPreview(previewImg.current, croppedCanvas.current, pixelCrop);
      onImagePreview?.(croppedCanvas.current.toDataURL("image/jpeg"));
      const originalCrop = convertToPixelCropFloored(
        percentCrop,
        naturalWidth,
        naturalHeight,
      );
      onCropChange(originalCrop);
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
            <>
              <Grid item xs={12} sm={8} md={6}>
                <img
                  src={imagePreview}
                  ref={previewImg}
                  onLoad={previewLoaded}
                  alt="Image Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid>
              <Grid item xs={8} sm={4} md={3}>
                <Box style={{ position: "relative" }}>
                  <Box sx={{ paddingTop: "100%" }}>
                    <Box
                      component="canvas"
                      ref={croppedCanvas}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 1,
                        height: 1,
                        objectFit: "cover",
                        borderRadius: circleCrop ? "50%" : 0,
                      }}
                    />
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => setCropDialogOpen(true)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  썸네일 수정
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        <Dialog open={cropDialogOpen} onClose={() => setCropDialogOpen(false)}>
          <DialogTitle>썸네일 수정하기</DialogTitle>
          <DialogContent>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={setCompletedCrop}
              aspect={1}
              circularCrop={circleCrop}
            >
              <img src={imagePreview!} />
            </ReactCrop>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCropDialogOpen(false)}>확인</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  },
);

ImageUpload.displayName = "ImageUpload";

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      1,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
