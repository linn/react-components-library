import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { linnTheme } from '../../themes';
import SaveBackCancelButtons from '../SaveBackCancelButtons';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';


describe('<SaveBackCancelButtons />', () => {
    const cancelClick = jest.fn();
    const backClick = jest.fn();
    const saveClick = jest.fn();

    beforeEach(() => {
        const ComponentWithTheme = () => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                    <Router>
                        <SaveBackCancelButtons
                            cancelClick={cancelClick}
                            backClick={backClick}
                            saveClick={saveClick}
                        />
                    </Router>
                </ThemeProvider>
            </StyledEngineProvider>
        );

        render(<ComponentWithTheme />);
    });

    it('should render buttons without throwing an error', () => {
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
});
