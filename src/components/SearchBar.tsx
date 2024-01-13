import React, { ReactNode } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, IconButton, Paper, TextField } from "@mui/material";

export const SearchBar = React.forwardRef(
  (
    {
      cancelOnEscape,
      closeIcon = <CancelIcon fontSize="small" color="disabled" />,
      disabled,
      onCancelSearch,
      onChange,
      onRequestSearch,
      placeholder = "",
      searchIcon = <SearchIcon />,
      value = "",
      loading = false,
    }: {
      /** Whether to clear search on escape */
      cancelOnEscape?: boolean;
      /** Override the close icon. */
      closeIcon?: ReactNode;
      /** Disables text field. */
      disabled?: boolean;
      /** Fired when the search is cancelled. */
      onCancelSearch?: () => void;
      /** Fired when the text value changes. */
      onChange: (newValue: string) => void;
      /** Fired when the search icon is clicked. */
      onRequestSearch?: (value: string) => void;
      /** Sets placeholder text for the embedded text field. */
      placeholder?: string;
      /** Override the search icon. */
      searchIcon?: ReactNode;
      /** The value of the text field. */
      value?: string;
      /** Whether to show loading animation */
      loading?: boolean;
    },
    ref,
  ) => {
    const handleKeyDown: React.KeyboardEventHandler = (e) => {
      if (e.charCode === 13 || e.key === "Enter") {
        e.preventDefault();
        onRequestSearch?.(value);
      } else if (cancelOnEscape && (e.charCode === 27 || e.key === "Escape")) {
        onCancelSearch?.();
      }
    };

    return (
      <Paper sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          inputRef={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          size="small"
          sx={{
            flex: "1 1",
            "& fieldset": { border: "none", outline: "none" },
            "& input": { pr: 0 },
          }}
          placeholder={placeholder}
        />
        <IconButton
          onClick={onCancelSearch ? () => onCancelSearch() : () => onChange("")}
          disabled={disabled}
          sx={{
            opacity: value ? 1 : 0,
            transform: `scale(${value ? 1 : 0})`,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {closeIcon}
        </IconButton>
        <IconButton
          onClick={() => onRequestSearch?.(value)}
          disabled={disabled}
          sx={{
            opacity: loading ? 0 : 1,
            transform: `scale(${loading ? 0 : 1})`,
            width: loading ? 0 : 40,
            height: loading ? 0 : 40,
            transition:
              "opacity 0.3s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease",
          }}
        >
          {searchIcon}
        </IconButton>
        <CircularProgress
          size={loading ? 40 : 0}
          sx={{
            p:1,
            ml:-2,
            opacity: loading ? 1 : 0,
            transition: "opacity 0.3s ease, width 0.3s ease, height 0.3s ease",
          }}
        />
      </Paper>
    );
  },
);

SearchBar.displayName = "SearchBar";
