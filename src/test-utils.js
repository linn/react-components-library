import { render } from '@testing-library/react';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
    return (
    <MuiThemeProvider theme={createMuiTheme()}>
        {children}
        </MuiThemeProvider>
);
};

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;