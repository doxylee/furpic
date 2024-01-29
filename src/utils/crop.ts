import { Crop, PixelCrop, convertToPixelCrop } from "react-image-crop";

export function convertToPixelCropFloored(
  crop: Partial<Crop>,
  containerWidth: number,
  containerHeight: number,
): PixelCrop {
  const { unit, x, y, width, height } = convertToPixelCrop(
    crop,
    containerWidth,
    containerHeight,
  );
  return {
    unit,
    x: Math.floor(x),
    y: Math.floor(y),
    width: Math.floor(width),
    height: Math.floor(height),
  };
}
