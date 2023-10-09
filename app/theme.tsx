import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

export const colorPrimary = 'rgba(90, 0, 255, 1)';
export const colorSecondary = 'rgba(155, 9, 171, 1)';
export const commonWhite = '#fefefe';
export const commonBlack = '#111';

export const themeFonts = [
  '"Inter"',
];

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

export const serifFonts = [
  'Merriweather',
  'serif',
];

export const fonts = themeFonts.concat(systemFonts)
export const themeFont = fonts.join(',')
export const systemFont = systemFonts.join(',')
export const monospaceFont = monospaceFonts.join(',')

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const baseline = {
  typography: {
    fontFamily: themeFont,
    monospace: {
      fontFamily: monospaceFonts,
    },
  },
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
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
}

// Dark theme.
export const dark = createTheme({
  typography: {
    ...baseline.typography,
  },
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
  typography: {
    ...baseline.typography,
  },
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
