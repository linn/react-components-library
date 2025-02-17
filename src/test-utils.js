import { render } from '@testing-library/react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MemoryRouter } from 'react-router-dom';
import 'moment/locale/uk';

// eslint-disable-next-line react/prop-types
function Providers({ children }) {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    return (
        <ThemeProvider theme={createTheme()}>
            <MemoryRouter initialEntries={['/']}>
                <SnackbarProvider dense maxSnack={5}>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="uk">
                        {children}
                    </LocalizationProvider>
                </SnackbarProvider>
            </MemoryRouter>
        </ThemeProvider>
    );
}

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
