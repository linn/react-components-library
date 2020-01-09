import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { displayComponentFactory, inputComponentFactory } from '../editableTable/componentFactory';
import { linnTheme } from '../../themes';

describe('displayComponentFactory', () => {
    describe('when type is not a date', () => {
        it('should return row value', () => {
            const row = {
                test: 'value'
            };

            const column = {
                id: 'test'
            };

            expect(displayComponentFactory(row, column)).toBe('value');
        });
    });

    describe('when type is a date', () => {
        it('should return a formatted date', () => {
            const row = {
                test: moment('20-12-2019', 'DD-MM-YYYY').toISOString()
            };

            const column = {
                id: 'test',
                type: 'date'
            };

            expect(displayComponentFactory(row, column)).toBe('20 Dec 2019');
        });
    });
});

describe('inputComponentFactory', () => {
    let wrapper;
    const getInputField = () => wrapper.find('InputField');
    const getDateField = () => wrapper.find('DatePicker');
    const getLinnWeekField = () => wrapper.find('LinnWeekPicker');
    const getTypeahead = () => wrapper.find('Typeahead');
    const getComponent = () => wrapper.find('CustomComponent');
    const mount = createMount({ dive: true });

    describe('when type is text', () => {
        const column = {
            id: 'test',
            editable: true,
            type: 'text'
        };

        const row = {
            test: 'value'
        };

        beforeEach(() => {
            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    {inputComponentFactory(row, column, jest.fn())}
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme />);
        });

        it('should return an inputField', () => {
            expect(getInputField()).toHaveLength(1);
        });
    });

    describe('when type is number', () => {
        const column = {
            id: 'test',
            editable: true,
            type: 'number'
        };

        const row = {
            test: 123456
        };

        beforeEach(() => {
            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    {inputComponentFactory(row, column, jest.fn())}
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme />);
        });

        it('should return an inputField', () => {
            expect(getInputField()).toHaveLength(1);
        });
    });

    describe('when type is date', () => {
        const column = {
            id: 'test',
            editable: true,
            type: 'date'
        };

        const row = {
            test: moment('20-12-2019', 'DD-MM-YYYY').toISOString()
        };

        beforeEach(() => {
            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        {inputComponentFactory(row, column, jest.fn())}
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme />);
        });

        it('should return a date picker', () => {
            expect(getDateField()).toHaveLength(1);
        });
    });

    describe('when type is linn week', () => {
        const column = {
            id: 'test',
            editable: true,
            type: 'linnWeek'
        };

        const row = {
            test: moment('20-12-2019', 'DD-MM-YYYY').toISOString()
        };

        beforeEach(() => {
            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        {inputComponentFactory(row, column, jest.fn())}
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme />);
        });

        it('should return a linn week picker', () => {
            expect(getLinnWeekField()).toHaveLength(1);
        });
    });

    describe('when type is typeahead', () => {
        const column = {
            id: 'test',
            editable: true,
            type: 'search',
            clearSearch: jest.fn(),
            search: jest.fn(),
            searchResults: [{ id: 'item' }]
        };

        const row = {
            test: 'value'
        };

        beforeEach(() => {
            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        {inputComponentFactory(row, column, jest.fn())}
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme />);
        });

        it('should return a typeahead', () => {
            expect(getTypeahead()).toHaveLength(1);
        });
    });

    describe('when type is component', () => {
        // eslint-disable-next-line react/prop-types
        const CustomComponent = ({ value }) => <div>{value}</div>;

        const column = {
            id: 'test',
            editable: true,
            type: 'component',
            component: CustomComponent
        };

        const row = {
            test: 'value'
        };

        beforeEach(() => {
            const ComponentWithTheme = () => (
                <MuiThemeProvider theme={linnTheme}>
                    {inputComponentFactory(row, column, jest.fn())}
                </MuiThemeProvider>
            );

            wrapper = mount(<ComponentWithTheme />);
        });

        it('should return custom component', () => {
            wrapper.debug();
            expect(getComponent()).toHaveLength(1);
        });
    });
});
