import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { linnTheme } from '../../themes';
import Breadcrumbs from '../Breadcrumbs';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';


describe('<Breadcrumbs />', () => {
    const mockPush = jest.fn();

    const getLink = () => wrapper.find('ForwardRef(Link)');
    const getText = () => wrapper.find('ForwardRef(Typography)');
    const getSlash = () => wrapper.find('Slash');

    describe('when path does not end in report', () => {
        beforeEach(() => {
            const history = {
                location: { pathname: '/a/test/path' },
                push: mockPush,
            };

            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <Router>
                        <Breadcrumbs history={history} />
                    </Router>
                </MuiThemeProvider>
            );

            render(<ComponentWithTheme />);
        });

        it('should render the correct number of breadcrumbs with correct text', () => {
            expect(screen.getByText('HOME')).toBeInTheDocument();
            expect(screen.getByText('a')).toBeInTheDocument();
            expect(screen.getByText('test')).toBeInTheDocument();
            expect(screen.getByText('path')).toBeInTheDocument();
        });

        // it('should render the correct number of slashes', () => {
        //     console.log(screen.getAllByText(/\//));
        //     expect(screen.getAllByText(/ \/ /)).toHaveLength(3);
        // });

        // it('renders link to correct url', () => {
        //     expect(
        //         getLink()
        //             .at(2)
        //             .props().to
        //     ).toEqual('/a/test');
        // });
    });
});
