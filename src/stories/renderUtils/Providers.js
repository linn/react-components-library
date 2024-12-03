import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

const providers = story => (
    <ThemeProvider theme={createTheme()}>
        <SnackbarProvider> {story()} </SnackbarProvider>
    </ThemeProvider>
);

export default providers;
