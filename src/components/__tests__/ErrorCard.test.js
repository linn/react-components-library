/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ErrorCard from '../ErrorCard';

describe('<ErrorCard />', () => {
    let wrapper;
    let props;
    const getCard = () => wrapper.find('WithStyles(ForwardRef(Card))');
    const getIcon = () => wrapper.find('Memo(ForwardRef(ErrorIcon))');
    const getTypography = () => wrapper.find('WithStyles(ForwardRef(Typography))');
    const shallow = createShallow({ dive: true });

    beforeEach(() => {
        props = {
            errorMessage: 'there is an error'
        };
        wrapper = shallow(<ErrorCard {...props} />);
    });

    it('should render card container', () => {
        expect(getCard()).toHaveLength(1);
    });

    // TODO broken test
    it('should render error icon', () => {
        expect(getIcon()).toHaveLength(1);
    });

    it('should render error message', () => {
        expect(getTypography()).toHaveLength(1);
        expect(getTypography().props().children).toEqual('there is an error');
    });
});
