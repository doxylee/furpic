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

const COLOR_MAP: Record<string, { color: string }> = {
  red: { color: "#f44336" },
  pink: { color: "#ff79a5" },
  orange: { color: "#ff9800" },
  yellow: { color: "#ffeb3b" },
  green: { color: "#33dd39" },
  cyan: { color: "#00bcd4" },
  blue: { color: "#232afe" },
  purple: { color: "#9c27b0" },
  brown: { color: "#a87766" },
  black: { color: "#000000" },
  gray: { color: "#808080" },
  white: { color: "#e6e6e6" },
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
            <IconButton
              key={color}
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
          ))}
        {COLOR_LIST.filter((color) => !value.includes(color)).map((color) => (
          <IconButton
            key={color}
            sx={{ color: COLOR_MAP[color].color }}
            onClick={() => onChange([...value, color])}
          >
            <FavoriteIcon />
          </IconButton>
        ))}
      </Stack>
    </FormControl>
  );
}
