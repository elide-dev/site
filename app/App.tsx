import * as React from "react";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "./theme";
import { StaticRouter } from "react-router-dom/server";

export enum RenderMode {
  SSR = 'ssr',
  CSR = 'csr'
}

export default function App(props: {
  cache: any,
  router: any,
  renderMode: RenderMode | 'ssr' | 'csr',
  location: string,
}) {
  return (
    <React.StrictMode>
      <CacheProvider value={props.cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={props.router} />
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>
  );
}
