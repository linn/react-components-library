import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
    <MemoryRouter>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme()}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </MemoryRouter>
);

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
