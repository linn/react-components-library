import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import SaveBackCancelButtons from '../SaveCancelButtons';

describe('SaveBackCancelButtons', () => {
    it('should render without throwing an error', () => {
        expect(
            shallow(<SaveBackCancelButtons />)
                .dive()
                .find(Button).length
        ).toBe(2);
    });
});
