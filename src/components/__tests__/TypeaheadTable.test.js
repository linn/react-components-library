import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import TypeAheadTable from '../TypeaheadTable';

afterEach(cleanup);

const table = {
    rows: [],
    totalItemCount: 100
};

for (let i = 0; i < 100; i += 1) {
    const newItem = {
        id: `id${i}`,
        values: [
            { id: `0-${i}`, value: `0-${i}` },
            { id: `1-${i}`, value: `1-${i}` },
            { id: `2-${i}`, value: `2-${i}` },
            { id: `3-${i}`, value: `3-${i}` }
        ],
        links: [{ href: '#', rel: 'self' }]
    };
    table.rows.push(newItem);
}

const columnNames = ['0', '1', '2', '3'];

const fetchItemsMock = jest.fn();
const clearSearchMock = jest.fn();
const push = jest.fn();

const defaultProps = {
    table,
    columnNames,
    fetchItems: fetchItemsMock,
    clearSearch: clearSearchMock,
    loading: false,
    title: 'title',
    history: { push },
    placeholder: 'search'
};

test('should call clearSearch and fetchItems() on input', () => {
    const { getByDisplayValue } = render(<TypeAheadTable {...defaultProps} table={{ rows: [] }} />);
    const item = getByDisplayValue('');
    fireEvent.change(item, {
        target: { value: 'part' }
    });
    // wait for the debounce
    setTimeout(() => expect(fetchItemsMock).toHaveBeenCalledWith('part'), 1000);
    expect(clearSearchMock).toHaveBeenCalled();
});

describe('When loading', () => {
    test('Should display loading and not table', () => {
        const { queryByRole } = render(
            <TypeAheadTable {...defaultProps} table={{ rows: [] }} loading />
        );
        expect(queryByRole('progressbar')).toBeInTheDocument();
        expect(queryByRole('table')).not.toBeInTheDocument();
    });
});

describe('When loaded and matching items', () => {
    test('Should display table and not loading', () => {
        const { queryByRole } = render(<TypeAheadTable {...defaultProps} />);
        expect(queryByRole('table')).toBeInTheDocument();
        expect(queryByRole('progressbar')).not.toBeInTheDocument();
    });
});

describe('When loaded and no matching items', () => {
    test('Should display message. not loading, not table', () => {
        const { getByText } = render(<TypeAheadTable {...defaultProps} table={{ rows: [] }} />);
        expect(getByText('No matching items')).toBeInTheDocument();
    });
});
