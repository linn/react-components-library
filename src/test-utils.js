import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import configureMockStore from 'redux-mock-store';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { apiMiddleware as api } from 'redux-api-middleware';
import { MemoryRouter } from 'react-router-dom';
import 'moment/locale/uk';

const middleware = [api];

// eslint-disable-next-line react/prop-types
function Providers({ children }) {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({})
        })
    );
    const mockStore = configureMockStore(middleware);
    const store = mockStore({ oidc: { user: { profile: {} } }, historyStore: { push: jest.fn() } });
    return (
        <Provider store={store}>
            <ThemeProvider theme={createTheme()}>
                <MemoryRouter initialEntries={['/']}>
                    <SnackbarProvider dense maxSnack={5}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="uk">
                            {children}
                        </LocalizationProvider>
                    </SnackbarProvider>
                </MemoryRouter>
            </ThemeProvider>
        </Provider>
    );
}

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
