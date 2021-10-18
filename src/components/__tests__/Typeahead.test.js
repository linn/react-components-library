import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import Typeahead from '../Typeahead';

afterEach(() => cleanup());

const items = [
    { id: 1, name: 'n1', description: 'desc', href: '/1' },
    { id: 2, name: 'n2', description: 'desc', href: '/2' },
    { id: 3, name: 'n3', description: 'desc', href: '/3' },
    { id: 4, name: 'n4', description: 'desc', href: '/4' },
    { id: 5, name: 'n5', description: 'desc', href: '/5' }
];

const sortableItems = [
    { id: 1, name: 'item 1', description: 'F', href: '/1' },
    { id: 2, name: 'item 2', description: 'A', href: '/2' },
    { id: 3, name: 'item 3', description: 'C', href: '/3' },
    { id: 4, name: 'item 4', description: 'B', href: '/4' },
    { id: 5, name: 'item 5', description: 'D', href: '/5' },
    { id: 6, name: 'item 6', description: 'E', href: '/6' }
];

let props;

describe('when modal', () => {
    beforeEach(() => {
        props = {
            title: 'Title Text',
            loading: false,
            modal: true,
            label: 'label',
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            items
        };
    });
    test('should not display Title', () => {
        const { queryByText } = render(<Typeahead {...props} modal />);
        expect(queryByText('Title Text')).not.toBeInTheDocument();
    });

    test('should display label', () => {
        const { getByText } = render(<Typeahead {...props} />);
        expect(getByText('label')).toBeInTheDocument();
    });

    test('should open modal onClick', () => {
        const { getByPlaceholderText, queryByTestId } = render(
            <Typeahead {...props} modal title="modal title" />
        );
        const item = getByPlaceholderText('Search by id or by description');
        fireEvent.click(item);
        expect(queryByTestId('modal')).toBeInTheDocument();
    });
});

describe('when result limit', () => {
    beforeEach(() => {
        props = {
            title: 'Title Text',
            loading: false,
            modal: true,
            label: 'label',
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            items,
            resultLimit: 3
        };
    });
    test('should limit results', () => {
        const { getAllByText, getByPlaceholderText } = render(<Typeahead {...props} />);
        const input = getByPlaceholderText('Search by id or by description');
        fireEvent.click(input);
        const results = getAllByText('desc');
        expect(results).toHaveLength(3);
    });
});

describe('when sort function', () => {
    beforeEach(() => {
        props = {
            title: 'Title Text',
            loading: false,
            modal: true,
            label: 'label',
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            items: sortableItems,
            sortFunction: () => (a, b) => {
                if (a.description < b.description) {
                    return -1;
                }
                if (a.description < b.description) {
                    return 1;
                }
                return 0;
            }
        };
    });
    test('should sort results', () => {
        const { getAllByRole, getByPlaceholderText } = render(<Typeahead {...props} />);
        const input = getByPlaceholderText('Search by id or by description');
        fireEvent.click(input);
        const results = getAllByRole('link');
        expect(results[0]).toContainHTML('A');
        expect(results[1]).toContainHTML('B');
        expect(results[2]).toContainHTML('C');
        expect(results[3]).toContainHTML('D');
        expect(results[4]).toContainHTML('E');
        expect(results[5]).toContainHTML('F');
    });
});

describe('when not links', () => {
    const onSelect = jest.fn();

    beforeEach(() => {
        props = {
            title: 'Title Text',
            loading: false,
            modal: true,
            label: 'label',
            onSelect,
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            links: false,
            items
        };
        onSelect.mockReset();
    });
    test('should call onSelect when item selected', () => {
        const { getByText, getByPlaceholderText } = render(<Typeahead {...props} />);
        const input = getByPlaceholderText('Search by id or by description');
        fireEvent.click(input);
        const item = getByText('n1');
        fireEvent.click(item);
        expect(onSelect).toHaveBeenCalled();
    });
});

describe('when links', () => {
    const onSelect = jest.fn();

    beforeEach(() => {
        props = {
            title: 'Title Text',
            loading: false,
            modal: true,
            label: 'label',
            onSelect,
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            links: true,
            items
        };
    });
    test('should not call onSelect when item selected', () => {
        const stuff = render(<Typeahead {...props} links />);
        const input = stuff.getByPlaceholderText('Search by id or by description');
        fireEvent.click(input);
        const item = stuff.getByText('n1');
        fireEvent.click(item);
        expect(onSelect).not.toHaveBeenCalled();
    });
});

describe('When not modal', () => {
    beforeEach(() => {
        props = {
            title: 'Title Text',
            loading: false,
            modal: false,
            label: 'label',
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            items
        };
    });
    test('should display Title', () => {
        const { getByText } = render(<Typeahead {...props} />);
        expect(getByText('Title Text')).toBeInTheDocument();
    });

    test('should not open modal onClick', () => {
        const { getByPlaceholderText, queryByTestId } = render(<Typeahead {...props} />);
        const item = getByPlaceholderText('Search by id or by description');
        fireEvent.click(item);
        expect(queryByTestId('modal')).not.toBeInTheDocument();
    });
});
