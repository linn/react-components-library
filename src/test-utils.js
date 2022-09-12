import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider';
/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line react/prop-types
function Providers({ children }) {
    return (
        <MemoryRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={createTheme()}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        {children}
                    </LocalizationProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </MemoryRouter>
    );
}

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
