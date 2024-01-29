"use client";

import { useRef, useState } from "react";
import {
  Box,
  Grid,
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
import { DragDropFileUpload } from "./DragDropFileUpload";
import { enqueueSnackbar } from "notistack";

export function ImageUpload({
  onFileUpload,
  onCropChange,
  sx,
  onBlur,
  onImagePreview,
  defaultImage,
  circleCrop = false,
}: {
  onFileUpload: (file: File) => void;
  onCropChange: (crop: PixelCrop) => void;
  sx?: SxProps;
  onBlur?: () => void;
  onImagePreview?: (imagePreview: string) => void;
  defaultImage?: { url: string; crop: PixelCrop };
  circleCrop?: boolean;
}) {
  console.log(defaultImage)
  const [imagePreview, setImagePreview] = useState<string | null>(defaultImage?.url ?? null);
  const isDirty = useRef(false);

  const previewImg = useRef<HTMLImageElement>(null);
  const croppedCanvas = useRef<HTMLCanvasElement>(null);

  const previewLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerAspectCrop(width, height);
    setCrop(crop);
    setCompletedCrop(convertToPixelCrop(crop, width, height), crop);
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

  const handleFileUpload = (file: File) => {
    isDirty.current = true;
    onFileUpload(file);
  };

  return (
    <Box sx={sx}>
      <DragDropFileUpload
        icon={<ImageIcon style={{ fontSize: 60 }} />}
        description="20MB, 8196x8196 이하 jpg, png, gif, webp, avif, tiff 이미지"
        check={(file) => {
          if (file.size > 20 * 1024 * 1024) {
            enqueueSnackbar("20MB 이하의 이미지를 업로드 해주세요", {
              variant: "error",
            });
            return false;
          }
          // jpg, png, gif, webp, avif, tiff
          if (!file.type.match(/image\/(jpeg|png|gif|webp|avif|tiff)/)) {
            enqueueSnackbar(
              "jpg, png, gif, webp, avif, tiff 이미지만 업로드 해주세요",
              {
                variant: "error",
              },
            );
            return false;
          }
          return true;
        }}
        onFileUpload={handleFileUpload}
        onImageURL={setImagePreview}
        onBlur={onBlur}
      />

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
}

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
