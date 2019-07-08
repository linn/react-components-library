import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { linnTheme } from '../../themes';
import Dropdown from '../Dropdown';

describe('<Dropdown />', () => {
    let wrapper;
    let props;
    const getMenuItems = () => wrapper.find('option');
    const mount = createMount({ dive: true });

    describe('when items exist', () => {
        beforeEach(() => {
            props = {
                items: ['one', 'two', 'three'],
                value: 'two',
                label: 'dropdown label',
                onChange: jest.fn(),
                propertyName: 'dropdownProperty'
            };

            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <Dropdown {...props} />
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme {...props} />);
        });

        it('should render menu items', () => {
            expect(getMenuItems()).toHaveLength(3);
            expect(
                getMenuItems()
                    .at(0)
                    .props().children
            ).toEqual('one');
            expect(
                getMenuItems()
                    .at(1)
                    .props().children
            ).toEqual('two');
            expect(
                getMenuItems()
                    .at(2)
                    .props().children
            ).toEqual('three');
        });
    });

    describe('when item objects exist', () => {
        beforeEach(() => {
            props = {
                items: [
                    { id: 1, displayText: 'one' },
                    { id: 2, displayText: 'two' },
                    { id: 3, displayText: 'three' }
                ],
                value: 2,
                label: 'dropdown label',
                onChange: jest.fn(),
                propertyName: 'dropdownProperty'
            };

            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <Dropdown {...props} />
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme {...props} />);
        });

        it('should render menu items', () => {
            expect(getMenuItems()).toHaveLength(3);
            expect(
                getMenuItems()
                    .at(0)
                    .props().children
            ).toEqual('one');
            expect(
                getMenuItems()
                    .at(1)
                    .props().children
            ).toEqual('two');
            expect(
                getMenuItems()
                    .at(2)
                    .props().children
            ).toEqual('three');
        });
    });
});
