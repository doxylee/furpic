"use client";

import { useSpecies } from "@/utils/useSpecies";
import {
  SxProps,
  Select,
  SelectChangeEvent,
  MenuItem,
  Box,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";

type ComputedSpecies = {
  id: string;
  nameKo: string;
  nameEn: string;
  parent: ComputedSpecies | null;
  children: ComputedSpecies[];
};

export function SelectSpecies({
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
  label: string;
}) {
  const { speciesList, speciesMap } = useSpecies();

  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) => {
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  console.log(speciesList);

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        label={label}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={speciesMap?.[value].nameKo}
                sx={{ height: 22 }}
              />
            ))}
          </Box>
        )}
      >
        {speciesList?.map((species) => (
          <MenuItem
            key={species.id}
            value={species.id}
            sx={{ pl: 2 + 2 * species.level }}
          >
            {species.nameKo}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
