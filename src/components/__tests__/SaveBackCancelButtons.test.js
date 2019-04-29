import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import SaveBackCancelButtons from '../SaveBackCancelButtons';

describe('SaveBackCancelButtons', () => {
    const cancelClick = jest.fn();
    const backClick = jest.fn();
    const saveClick = jest.fn();

    it('should render without throwing an error', () => {
        expect(
            shallow(
                <SaveBackCancelButtons
                    cancelClick={cancelClick}
                    backClick={backClick}
                    saveClick={saveClick}
                />
            )
                .dive()
                .find(Button).length
        ).toBe(2);
    });
});
