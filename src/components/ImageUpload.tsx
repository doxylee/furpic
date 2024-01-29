import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { DragDropFileUpload } from "./dragDropFileUpload";
import { Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { PixelCrop } from "react-image-crop";

export type ImageCrop = {
  image?: File;
  crop: PixelCrop;
}

export function ImageUpload<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  onImagePreviewUpdate,
}: {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, typeof name>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  onImagePreviewUpdate?: (imagePreview: string) => void;
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
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
            description="10MB, 8196x8196 이하 jpg, png, gif, webp, avif, tiff 이미지"
            onImagePreview={onImagePreviewUpdate}
            check={(file) => {
              if (file.size > 10 * 1024 * 1024) {
                enqueueSnackbar("10MB 이하의 이미지를 업로드 해주세요", {
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
          />
          {error?.type === "required" && (
            <Typography color="red">이미지를 업로드 해주세요</Typography>
          )}
        </div>
      )}
    />
  );
}
