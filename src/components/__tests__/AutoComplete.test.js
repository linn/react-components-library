import React from 'react';
import { shallow, mount } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';

import { TextField, MuiThemeProvider } from '@material-ui/core';
import Select from 'react-select';
import AutoComplete from '../AutoComplete';

describe('<AutoComplete />', () => {
    let wrapper;
    let props;
    const getInputLabel = () => wrapper.find(TextField);
    const getSelect = () => wrapper.find(Select);

    const AutoCompleteNaked = unwrap(AutoComplete);
    describe('when items exist', () => {
        beforeEach(() => {
            wrapper = shallow(<AutoCompleteNaked classes={{}} />);

            props = {
                suggestions: [{ label: 'one' }, { label: 'two' }, { label: 'three' }],
                onChange: jest.fn(),
                propertyName: 'autoComplete',
                label: 'auto complete'
            };
            wrapper = mount(
                <MuiThemeProvider theme={{ palette: { text: {} }, spacing: {} }}>
                    <AutoComplete {...props} />
                </MuiThemeProvider>
            );
            wrapper.debug();
        });

        afterEach(() => {
            wrapper.unmount();
        });

        it('should render label', () => {
            expect(getInputLabel()).toHaveLength(1);
            expect(getInputLabel().props().label).toEqual('auto complete');
        });

        it('should render suggestions', () => {
            expect(getSelect().props().options).toHaveLength(3);
        });

        it('should render the select and there should be no value selected', () => {
            expect(getSelect()).toHaveLength(1);
            expect(getSelect().props().value).toEqual(null);
        });
    });
});
