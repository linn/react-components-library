import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ErrorCard from '../ErrorCard';

describe('<ErrorCard />', () => {
    const getCard = () => wrapper.find('WithStyles(Card)');
    const getIcon = () => wrapper.find('pure(ErrorIcon)');
    const getTypography = () => wrapper.find('WithStyles(Typography)');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    beforeEach(() => {
        props = {
            errorMessage: 'there is an error'
        };
        wrapper = shallow(<ErrorCard {...props} />);
    });

    it('should render card container', () => {
        expect(getCard()).toHaveLength(1);
    })

    it('should render error icon', () => {
        expect(getIcon()).toHaveLength(1);
    });

    it('should render error message', () => {
        expect(getTypography()).toHaveLength(1);
        expect(getTypography().props().children).toEqual('there is an error');
    });
});