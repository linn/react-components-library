import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line react/prop-types
function Providers({ children }) {
    return (
        <MemoryRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={createTheme()}>
                    <LocalizationProvider dateAdapter={AdapterDateMoment}>
                        {children}
                    </LocalizationProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </MemoryRouter>
    );
}

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
