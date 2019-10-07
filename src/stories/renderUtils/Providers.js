import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

const providers = story => (
    <MuiThemeProvider theme={createMuiTheme()}>
        <SnackbarProvider> {story()} </SnackbarProvider>{' '}
    </MuiThemeProvider>
);

export default providers;
