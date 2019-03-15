import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import EntityList from '../EntityList';

describe('<EntityList />', () => {
    let wrapper;
    let props;
    const getListItems = () => wrapper.find('WithStyles(List)');
    const shallow = createShallow({ dive: false });

    const entityList = [
        { id: 'one', description: 'The first item in the list', href: '/entity/1' },
        { id: 'two', description: 'The second item in the list', href: '/entity/2' },
        { id: 'three', description: 'The third item in the list', href: '/entity/3' }
    ];

    beforeEach(() => {
        props = {
            entityList,
            entityId: 'id',
            descriptionFieldName: null
        };
        wrapper = shallow(<EntityList {...props} />);
    });

    it('should render list items', () => {
        expect(getListItems().children()).toHaveLength(3);
    });
});
