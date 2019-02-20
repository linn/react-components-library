import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import BackButton from '../BackButton';

describe('Back Button', () => {
    const backClick = jest.fn();

    it('should render without throwing an error', () => {
        expect(
            shallow(<BackButton backClick={backClick} />)
                .dive()
                .find(Button).length
        ).toBe(1);
    });
});
