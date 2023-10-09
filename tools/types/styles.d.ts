declare module '@mui/material/styles' {
  function createTheme(overrides: any) {

  }
  const ThemeProvider: any;

  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    monospace: true;
  }
}
