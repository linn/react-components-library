import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Typography } from '@material-ui/core';
import Title from '../Title';

describe('<Title />', () => {
    let wrapper;
    let props;
    const getTypography = () => wrapper.find(Typography);
    const shallow = createShallow();

    beforeEach(() => {
        props = {
            text: 'Title Text'
        };
        wrapper = shallow(<Title {...props} />);
    });

    it('should render title', () => {
        expect(getTypography()).toHaveLength(1);
        expect(getTypography().props().children).toEqual('Title Text');
    });
});
