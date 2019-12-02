import { render } from '@testing-library/react';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
    <MuiThemeProvider theme={createMuiTheme()}>
        <MemoryRouter>{children}</MemoryRouter>
    </MuiThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
