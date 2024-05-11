"use client";

import {
  SxProps,
  SelectChangeEvent,
  FormControl,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

const COLOR_LIST = [
  "red",
  "pink",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "brown",
  "black",
  "gray",
  "white",
] as const;

const COLOR_MAP: Record<string, { color: string; nameKo: string }> = {
  red: { color: "#f44336", nameKo: "빨강" },
  pink: { color: "#ff79a5", nameKo: "분홍" },
  orange: { color: "#ff9800", nameKo: "주황" },
  yellow: { color: "#ffeb3b", nameKo: "노랑" },
  green: { color: "#33dd39", nameKo: "초록" },
  cyan: { color: "#00bcd4", nameKo: "하늘" },
  blue: { color: "#232afe", nameKo: "파랑" },
  purple: { color: "#9c27b0", nameKo: "보라" },
  brown: { color: "#a87766", nameKo: "갈색" },
  black: { color: "#000000", nameKo: "검정" },
  gray: { color: "#808080", nameKo: "회색" },
  white: { color: "#e6e6e6", nameKo: "흰색" },
} as const;

export function SelectColor({
  onChange,
  value,
  sx,
  onBlur,
  label,
}: {
  onChange: (value: string[]) => void;
  value: string[];
  sx?: SxProps;
  onBlur?: () => void;
  label?: string;
}) {
  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) => {
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <FormControl sx={sx}>
      {label && <Typography color="gray">{label}</Typography>}
      <Stack direction="row" gap={1} flexWrap="wrap">
        {value
          .filter((color) => !!COLOR_MAP[color])
          .map((color) => (
            <Stack key={color} alignItems="center" gap={0.5}>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: COLOR_MAP[color].color,
                  "&:hover": {
                    backgroundColor: COLOR_MAP[color].color,
                    opacity: 0.5,
                  },
                }}
                onClick={() => onChange(value.filter((v) => v !== color))}
              >
                <FavoriteIcon />
              </IconButton>
              <Typography fontSize={14} color="gray">
                {COLOR_MAP[color].nameKo}
              </Typography>
            </Stack>
          ))}
        {COLOR_LIST.filter((color) => !value.includes(color)).map((color) => (
          <Stack key={color} alignItems="center" gap={0.5}>
            <IconButton
              sx={{ color: COLOR_MAP[color].color }}
              onClick={() => onChange([...value, color])}
            >
              <FavoriteIcon />
            </IconButton>
            <Typography fontSize={14} color="gray">
              {COLOR_MAP[color].nameKo}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </FormControl>
  );
}
