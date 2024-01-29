import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ImageUpload } from "./ImageUpload";
import { Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { PixelCrop } from "react-image-crop";

export type ImageCrop = {
  image?: File;
  crop: PixelCrop;
};

export function ImageUploadInput<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  onImagePreviewUpdate,
  defaultValue,
  circleCrop = false,
}: {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, typeof name>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  onImagePreviewUpdate?: (imagePreview: string) => void;
  defaultValue?: ImageCrop;
  circleCrop?: boolean;
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
        <div ref={ref}>
          <ImageUpload
            onFileUpload={(file) => {
              onChange({ image: file, crop: value?.crop });
            }}
            onCropChange={(crop) => {
              onChange({ image: value?.image, crop });
            }}
            sx={{ width: 1 }}
            onBlur={onBlur}
            onImagePreview={onImagePreviewUpdate}
            circleCrop={circleCrop}
            
          />
          {error?.type === "required" && (
            <Typography color="red">이미지를 업로드 해주세요</Typography>
          )}
        </div>
      )}
    />
  );
}
