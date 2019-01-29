import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { ListItem } from '@material-ui/core';
import Typeahead from '../Typeahead';

describe('<Typeahead />', () => {
    let wrapper;
    let props;
    const getListItem = () => wrapper.find(ListItem);
    const getTitle = () => wrapper.find('WithStyles(Title)');
    const shallow = createShallow({ dive: true });

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
        wrapper = shallow(<Typeahead {...props} />);
    });

    it('should render title', () => {
        expect(getTitle()).toHaveLength(1);
    });

    it('should render 3 typeahead items', () => {
        expect(getListItem()).toHaveLength(2);
    });
});