import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import Typeahead from '../Typeahead';

afterEach(() => cleanup());

const items = [
    { id: 1, name: 'n1', description: 'd1', href: '/1' },
    { id: 2, name: 'n2', description: 'd2', href: '/2' }
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
