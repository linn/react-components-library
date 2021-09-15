import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

const providers = story => (
    <MuiThemeProvider theme={createTheme()}>
        <SnackbarProvider> {story()} </SnackbarProvider>{' '}
    </MuiThemeProvider>
);

export default providers;
