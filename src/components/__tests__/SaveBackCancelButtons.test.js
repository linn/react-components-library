import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
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
            <MuiThemeProvider theme={linnTheme}>
                <Router>
                    <SaveBackCancelButtons
                        cancelClick={cancelClick}
                        backClick={backClick}
                        saveClick={saveClick}
                    />
                </Router>
            </MuiThemeProvider>
        );

        render(<ComponentWithTheme />);
    });

    it('should render buttons without throwing an error', () => {
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
});
