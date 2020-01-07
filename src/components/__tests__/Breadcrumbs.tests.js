import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { linnTheme } from '../../themes';
import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
    let wrapper;
    let props;
    const mount = createMount();

    const mockPush = jest.fn();

    const getLink = () => wrapper.find('ForwardRef(Link)');
    const getText = () => wrapper.find('ForwardRef(Typography)');
    const getSlash = () => wrapper.find('Slash');

    describe('when path does not end in report', () => {
        beforeEach(() => {
            props = {
                history: {
                    location: { pathname: '/a/test/path' },
                    push: mockPush
                }
            };

            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <Router>
                        <Breadcrumbs {...props} />
                    </Router>
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme {...props} />);
        });

        it('should render the correct number of breadcrumbs', () => {
            expect(getText()).toHaveLength(4);
        });

        it('should render the correct number of Links', () => {
            expect(getLink()).toHaveLength(3);
        });

        it('should render the correct number of slashes', () => {
            expect(getSlash()).toHaveLength(3);
        });

        it('renders link to correct url', () => {
            expect(
                getLink()
                    .at(2)
                    .props().to
            ).toEqual('/a/test');
        });
    });
});
