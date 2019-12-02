import { render } from '@testing-library/react';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
<<<<<<< HEAD
import { MemoryRouter } from 'react-router-dom';
=======
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
>>>>>>> master

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
    <MuiThemeProvider theme={createMuiTheme()}>
<<<<<<< HEAD
        <MemoryRouter>{children}</MemoryRouter>
=======
        <MuiPickersUtilsProvider utils={MomentUtils}>{children}</MuiPickersUtilsProvider>
>>>>>>> master
    </MuiThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export default customRender;
