import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Title from '../Title';

describe('<Title />', () => {
    const getTypography = () => wrapper.find('WithStyles(Typography)');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    beforeEach(() => {
        props = {
            text : 'Title Text'
        };
        wrapper = shallow(<Title{...props} />);
    });

    it('should render title', () => {
        expect(getTypography()).toHaveLength(1);
        expect(getTypography().props().children).toEqual('Title Text');
    });
});