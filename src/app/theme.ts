import { createTheme, responsiveFontSizes } from "@mui/material";

const baseTheme = createTheme();

export const theme = responsiveFontSizes(
  createTheme({
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
    typography: {
      h1: {
        fontSize: "3.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "3rem",
        fontWeight: 700,
      },
      h3: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h4: {
        fontSize: "2rem",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.5rem",
        fontWeight: 700,
      },
      h6: {
        fontSize: "1.25rem",
        fontWeight: 700,
      },
    },
    palette: {
      heart: baseTheme.palette.augmentColor({
        color: { main: "#ff2277" },
        name: "heart",
      }),
    },
  }),
  {},
);

// Check https://mui.com/material-ui/customization/typography/ for more info

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

  interface Palette {
    heart: Palette["primary"];
  }

  interface PaletteOptions {
    heart?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    heart: true;
  }
}