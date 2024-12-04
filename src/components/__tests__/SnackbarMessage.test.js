import React from 'react';
import '@testing-library/jest-dom';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { screen } from '@testing-library/react';
import SnackbarMessage from '../SnackbarMessage';
import render from '../../test-utils';

describe('<SnackbarMessage />', () => {
    beforeEach(() => {
        render(
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={createTheme()}>
                    <SnackbarMessage onClose={jest.fn()} message="Snackbar message" visible />
                </ThemeProvider>
            </StyledEngineProvider>
        );
    });

    it('should render snackbar', () => {
        expect(screen.getByText('Snackbar message')).toBeInTheDocument();
    });
});
