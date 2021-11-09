import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { screen } from '@testing-library/react';
import SnackbarMessage from '../SnackbarMessage';
import render from '../../test-utils';


describe('<SnackbarMessage />', () => {
    // const getSnackbar = () => wrapper.find('WithStyles(ForwardRef(Snackbar))');

    beforeEach(() => {
        render(
            <MuiThemeProvider theme={createTheme()}>
                <SnackbarMessage  onClose={jest.fn()} message={'Snackbar message'} visible={true} />{' '}
            </MuiThemeProvider>
        );
    });

    it('should render snackbar', () => {

        expect(screen.getByText('Snackbar message')).toBeInTheDocument();
    });
});
