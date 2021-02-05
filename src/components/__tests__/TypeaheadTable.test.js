import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
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
    label: 'label',
    history: { push },
    placeholder: 'Search by id or by description'
};

test('should call clearSearch and fetchItems() on input', async () => {
    const { getByDisplayValue } = render(<TypeAheadTable {...defaultProps} table={{ rows: [] }} />);
    const item = getByDisplayValue('');
    fireEvent.change(item, {
        target: { value: 'part' }
    });
    // wait for the debounce
    await waitFor(() => expect(fetchItemsMock).toHaveBeenCalledWith('part'));
    await waitFor(() => expect(clearSearchMock).toHaveBeenCalled());
});

describe('when searchOptions', () => {
    test('should call fetch items with searchOptions', async () => {
        const { getByDisplayValue } = render(
            <TypeAheadTable {...defaultProps} table={{ rows: [] }} searchOptions="thing=a" />
        );
        const item = getByDisplayValue('');
        fireEvent.change(item, {
            target: { value: 'part' }
        });
        // wait for the debounce
        await waitFor(() => expect(fetchItemsMock).toHaveBeenCalledWith('part', 'thing=a'));
        await waitFor(() => expect(clearSearchMock).toHaveBeenCalled());
    });
});

describe('When loading', () => {
    test('Should display loading and not table', () => {
        const { queryByRole } = render(
            <TypeAheadTable {...defaultProps} table={{ rows: [] }} loading queryString={null} />
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
        const { getByText } = render(<TypeAheadTable {...defaultProps} table={undefined} />);
        expect(getByText('No matching items')).toBeInTheDocument();
    });
});

describe('when modal', () => {
    test('should not display Title', () => {
        const { queryByText } = render(<TypeAheadTable {...defaultProps} modal />);
        expect(queryByText('Title Text')).not.toBeInTheDocument();
    });

    test('should display label', () => {
        const { getByText } = render(<TypeAheadTable {...defaultProps} modal />);
        expect(getByText('label')).toBeInTheDocument();
    });

    test('should open modal onClick', () => {
        const { getByPlaceholderText, queryByTestId } = render(
            <TypeAheadTable {...defaultProps} modal title="modal title" />
        );
        const item = getByPlaceholderText('Search by id or by description');
        fireEvent.click(item);
        expect(queryByTestId('modal')).toBeInTheDocument();
    });
});

describe('when not links', () => {
    const onSelect = jest.fn();

    test('should call onSelect when item selected', () => {
        const { getByText, getByPlaceholderText } = render(
            <TypeAheadTable {...defaultProps} links={false} onSelect={onSelect} />
        );
        const input = getByPlaceholderText('Search by id or by description');
        fireEvent.click(input);
        const item = getByText('0-0');
        fireEvent.click(item);
        expect(onSelect).toHaveBeenCalled();
    });
});
