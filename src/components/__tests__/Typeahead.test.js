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

const prioritisableItems = [
    { id: 2, name: 'item that matches kinda', description: 'A', href: '/A' },
    { id: 3, name: 'item that matc', description: 'C', href: '/C' },
    { id: 4, name: 'item no matchy', description: 'B', href: '/B' },
    { id: 5, name: 'item that hardly matches', description: 'D', href: '/D' },
    { id: 1, name: 'item that matches perfectly', description: 'F', href: '/F' }
];

let props;

describe('when modal', () => {
    beforeEach(() => {
        props = {
            title: 'Title Text',
            proertyName: 'searchThing',
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

describe('when modal but not openModalOnClick', () => {
    beforeEach(() => {
        props = {
            title: 'Title Text',
            proertyName: 'searchThing',
            loading: false,
            modal: true,
            label: 'label',
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            items,
            openModalOnClick: false
        };
        cleanup();
    });
    test('should not display Title', () => {
        const { queryByText } = render(<Typeahead {...props} />);
        expect(queryByText('Title Text')).not.toBeInTheDocument();
    });

    test('should not open modal onClick', () => {
        const { getByPlaceholderText, queryByTestId } = render(<Typeahead {...props} />);
        const item = getByPlaceholderText('Search by id or by description');
        fireEvent.click(item);
        expect(queryByTestId('modal')).not.toBeInTheDocument();
    });

    test('should open modal on icon button click', () => {
        const { getByRole, queryByTestId } = render(<Typeahead {...props} />);
        const item = getByRole('button');
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

describe('when priorityFunction', () => {
    beforeEach(() => {
        const fakeSearchTerm = 'item that matches perfectly';
        props = {
            title: 'Title Text',
            loading: false,
            modal: true,
            label: 'label',
            fetchItems: jest.fn(),
            clearSearch: jest.fn(),
            items: prioritisableItems,
            // function that prioritises based on closeness of match to the searchTerm
            priorityFunction: (item, _) => {
                let count = 0;
                for (let i = 0; i < fakeSearchTerm.length; i += 1) {
                    if (i === item.name.length) {
                        break;
                    }
                    if (item.name.toUpperCase()[i] === fakeSearchTerm.toUpperCase()[i]) {
                        count += 1;
                    }
                }
                return count;
            }
        };
    });
    test('should sort by priority function', () => {
        const { getAllByRole, getByPlaceholderText } = render(<Typeahead {...props} />);
        const input = getByPlaceholderText('Search by id or by description');
        fireEvent.click(input);
        const results = getAllByRole('link');
        expect(results[0]).toHaveAttribute('href', '/F');
        expect(results[1]).toHaveAttribute('href', '/A');
        expect(results[2]).toHaveAttribute('href', '/C');
        expect(results[3]).toHaveAttribute('href', '/D');
        expect(results[4]).toHaveAttribute('href', '/B');
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
