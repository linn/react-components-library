import { render } from '@testing-library/react';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
    <MuiThemeProvider theme={createMuiTheme()}>
        <MuiPickersUtilsProvider utils={MomentUtils}>{children}</MuiPickersUtilsProvider>
    </MuiThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
