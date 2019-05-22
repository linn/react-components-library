import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { AutoComplete } from '../AutoComplete';

describe('<AutoComplete />', () => {
    let wrapper;
    let props;
    const getAutoComplete = () => wrapper.find('StateManager');
    const shallow = createShallow();

    describe('when items exist', () => {
        beforeEach(() => {
            props = {
                suggestions: [{ label: 'one' }, { label: 'two' }, { label: 'three' }],
                onChange: jest.fn(),
                propertyName: 'autoComplete',
                label: 'auto complete',
                classes: {},
                theme: {}
            };
            wrapper = shallow(<AutoComplete {...props} />);
        });

        it('should render label', () => {
            expect(getAutoComplete()).toHaveLength(1);
            expect(getAutoComplete().props().label).toEqual('auto complete');
        });

        it('should render suggestions', () => {
            expect(getAutoComplete().props().options).toHaveLength(3);
        });

        it('should render the select and there should be no value selected', () => {
            expect(getAutoComplete().props().value).toEqual(null);
        });

        it('should render no placeholder', () => {
            expect(getAutoComplete().props().placeholder).toEqual('');
        });
    });
});
