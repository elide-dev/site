import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const colorPrimary = 'rgba(90, 0, 255, 1)';
export const colorSecondary = 'rgba(155, 9, 171, 1)';
export const commonWhite = '#fefefe';
export const commonBlack = '#111';

export const systemFonts = [
  "-apple-system",
  "ui-sans-serif",
  "BlinkMacSystemFont",
  "'Helvetica Neue'",
  "'Arial'",
  "sans-serif",
  "'Apple Color Emoji'",
  "'Segoe UI Emoji'",
  "'Segoe UI Symbol'",
];

export const monospaceFonts = [
  "-apple-system",
  "ui-sans-serif",
  "BlinkMacSystemFont",
  "'Helvetica Neue'",
  "'Arial'",
  "sans-serif",
  "'Apple Color Emoji'",
  "'Segoe UI Emoji'",
  "'Segoe UI Symbol'",
];

export const systemFont = systemFonts.join(',');
export const monospaceFont = monospaceFonts.join(',');

export const baseline = {
  palette: {
    common: {
      black: commonBlack,
      white: commonWhite,
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
}

// Dark theme.
export const dark = createTheme({
  palette: {
    ...baseline.palette,
    primary: {
      main: colorSecondary,
      light: colorSecondary,
      dark: colorPrimary,
      contrastText: commonWhite,
    },
  },
})

// Light theme.
export const light = createTheme({
  palette: {
    ...baseline.palette,
    primary: {
      main: colorPrimary,
      light: colorSecondary,
      dark: colorPrimary,
      contrastText: commonWhite,
    },
  },
})

export default light;
