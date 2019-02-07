import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import BackButton from '../BackButton';

describe('Back Button', () => {
    it('should render without throwing an error', () => {
        expect(
            shallow(<BackButton />)
                .dive()
                .find(Button).length
        ).toBe(1);
    });
});
