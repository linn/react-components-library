import React from 'react';
import createMount from '@material-ui/core/test-utils/createMount';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { linnTheme } from '../../themes';
import Typeahead from '../Typeahead';

describe('<Typeahead />', () => {
    let wrapper;
    let props;
    const getListItem = () => wrapper.find('ForwardRef(ListItem)');
    const getTitle = () => wrapper.find('Title');
    const mount = createMount();

    beforeEach(() => {
        props = {
            text: 'Title Text',
            loading: false,
            fetchItems: () => {},
            clearSearch: () => {},
            items: [
                { id: 1, name: 'n1', description: 'd1', href: '/1' },
                { id: 2, name: 'n2', description: 'd2', href: '/2' }
            ]
        };

        const ComponentWithTheme = () => (
            <MuiThemeProvider theme={linnTheme}>
                <Router>
                    <Typeahead {...props} />
                </Router>
            </MuiThemeProvider>
        );

        wrapper = mount(<ComponentWithTheme {...props} />);
    });

    it('should render title', () => {
        expect(getTitle()).toHaveLength(1);
    });

    it('should render 3 typeahead items', () => {
        expect(getListItem()).toHaveLength(2);
    });
});
