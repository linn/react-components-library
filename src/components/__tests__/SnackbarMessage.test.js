import React from 'react';
import createMount from '@material-ui/core/test-utils/createMount';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import SnackbarMessage from '../SnackbarMessage';

describe('<SnackbarMessage />', () => {
    let wrapper;
    let props;
    const getSnackbar = () => wrapper.find('WithStyles(ForwardRef(Snackbar))');
    const mount = createMount({ dive: false });

    beforeEach(() => {
        props = {
            message: 'Snackbar message',
            onClose: jest.fn()
        };
    });

    it('should render snackbar', () => {
        wrapper = mount(
            <MuiThemeProvider theme={createTheme()}>
                <SnackbarMessage {...props} />{' '}
            </MuiThemeProvider>
        );
        expect(getSnackbar()).toHaveLength(1);
    });
});
