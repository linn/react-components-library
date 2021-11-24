import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

const providers = story => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme()}>
            <SnackbarProvider> {story()} </SnackbarProvider>
        </ThemeProvider>
    </StyledEngineProvider>
);

export default providers;
