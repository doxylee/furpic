import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ImageUpload } from "./ImageUpload";
import { Typography } from "@mui/material";
import { PercentCrop } from "react-image-crop";

export type ImageCrop = {
  image?: File;
  crop: PercentCrop;
};

export function ImageUploadInput<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  onImagePreviewUpdate,
  defaultImage,
  circleCrop = false,
}: {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, typeof name>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  onImagePreviewUpdate?: (imagePreview: string) => void;
  defaultImage?: { url: string; crop: PercentCrop };
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
            defaultImage={defaultImage}
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
