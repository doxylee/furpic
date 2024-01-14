import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      x2l: 1920,
    },
  },
});

declare module "@mui/system/createTheme/createBreakpoints" {
  interface BreakpointOverrides {
    x2l: true;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        x2l: number;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    breakpoints?: {
      values?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        x2l?: number;
      };
    };
  }
}
