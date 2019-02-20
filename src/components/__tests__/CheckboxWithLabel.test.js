import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { FormControlLabel } from '@material-ui/core';
import CheckboxWithLabel from '../CheckboxWithLabel';

describe('<CheckboxWithLabel />', () => {
    let wrapper;
    let props;
    const getFormControlLabel = () => wrapper.find(FormControlLabel);
    const shallow = createShallow({ dive: true });

    beforeEach(() => {
        props = {
            label: 'checkbox label'
        };
        wrapper = shallow(<CheckboxWithLabel {...props} />);
    });

    it('should render label', () => {
        expect(getFormControlLabel()).toHaveLength(1);
        expect(getFormControlLabel().props().label).toEqual('checkbox label');
    });
});
