import * as React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export function ButtonUsage() {
  return <Button variant="contained">Hello world!</Button>;
}

export default function App(props: { cache: any }) {
    return (
        <CacheProvider value={props.cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <h1>Hello React SSR!</h1>
                <ButtonUsage />
            </ThemeProvider>
        </CacheProvider>
    );
}
