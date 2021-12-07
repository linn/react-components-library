import React from 'react';
import moment from 'moment';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { displayComponentFactory, inputComponentFactory } from '../editableTable/componentFactory';

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
            render(inputComponentFactory(row, column, jest.fn()));
        });

        it('should return an inputField', () => {
            expect(screen.getAllByRole('textbox')).toHaveLength(1);
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
            render(inputComponentFactory(row, column, jest.fn()));
        });

        it('should return an inputField', () => {
            expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
            expect(screen.getByDisplayValue('123456').type).toBe('number');
        });
    });

    describe('when type is date', () => {
        const column = {
            id: 'test',
            editable: true,
            type: 'date'
        };

        const row = {
            test: moment('20-11-2019', 'DD-MM-YYYY').toISOString()
        };

        beforeEach(() => {
            render(inputComponentFactory(row, column, jest.fn()));
        });

        it('should return a date picker', () => {
            expect(screen.getAllByRole('textbox')).toHaveLength(1);
            expect(screen.getByRole('textbox')).toHaveDisplayValue(['11/20/2019']);
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
            render(inputComponentFactory(row, column, jest.fn()));
        });

        it('should return a linn week picker', () => {
            expect(screen.getAllByRole('textbox')).toHaveLength(1);
            expect(screen.getByRole('textbox')).toHaveDisplayValue(['12/20/2019']);
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
            render(inputComponentFactory(row, column, jest.fn()));
        });

        it('should return a typeahead', () => {
            expect(screen.getAllByRole('textbox')).toHaveLength(1);
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
            test: 'custom component test value'
        };

        beforeEach(() => {
            render(inputComponentFactory(row, column, jest.fn()));
        });

        it('should return custom component', () => {
            expect(screen.getByText('custom component test value')).toBeInTheDocument();
        });
    });
});
