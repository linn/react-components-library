import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import render from '../../test-utils';
import Search from '../Search';

const onResultSelect = jest.fn();
const search = jest.fn();
const clearSearch = jest.fn();
const onTabPress = jest.fn();
const onAltPress = jest.fn();

const defaultProps = {
    propertyName: 'property',
    label: 'Label',
    handleValueChange: jest.fn(),
    onResultSelect,
    search,
    clearSearch
};
beforeEach(() => {
    jest.clearAllMocks();
});

describe('When searchOnEnter and enter key pressed', () => {
    beforeEach(() => {
        render(<Search {...defaultProps} value="searchTerm" />);
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13, charCode: 13 });
    });

    test('Should call search function and pass value as search term', () => {
        expect(search).toHaveBeenCalledWith('searchTerm');
    });
});

describe('When not searchOnEnter and enter key pressed', () => {
    beforeEach(() => {
        render(<Search {...defaultProps} value="searchTerm" searchOnEnter={false} />);
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    });

    test('Should not call search', () => {
        expect(search).not.toHaveBeenCalled();
    });
});

describe('When additional onKeyPressFunctions supplied', () => {
    beforeEach(() => {
        render(
            <Search
                {...defaultProps}
                value="searchTerm"
                searchOnEnter={false}
                onKeyPressFunctions={[
                    { keyCode: 9, action: onTabPress },
                    { keyCode: 18, action: onAltPress }
                ]}
            />
        );
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 9 });
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 18 });
    });

    test('Should call additional functions', () => {
        expect(onTabPress).toHaveBeenCalled();
        expect(onAltPress).toHaveBeenCalled();
    });
});

describe('When closestMatchesFirst priority Specified', () => {
    beforeEach(() => {
        render(
            <Search
                {...defaultProps}
                value="RESULT"
                priorityFunction="closestMatchesFirst"
                searchResults={[
                    { id: 'c', name: 'OUTLIER RESULT' },
                    { id: 'b', name: 'RESULT' },
                    { id: 'a', name: 'RE A RESULT' }
                ]}
            />
        );
    });

    test('should order by closest matches to search term', () => {
        expect(screen.getAllByRole('button')[0]).toHaveTextContent('RESULT'); // 6 matching chars
        expect(screen.getAllByRole('button')[1]).toHaveTextContent('RE A RESULT'); // 2 matching chars
        expect(screen.getAllByRole('button')[2]).toHaveTextContent('OUTLIER RESULT'); // 0 matching chars
    });
});

describe('When custom priorityFunction Specified', () => {
    beforeEach(() => {
        render(
            <Search
                {...defaultProps}
                value="RESULT A"
                priorityFunction={item => (item.expired ? 0 : 1)}
                searchResults={[
                    { id: 'c', name: 'RESULT C', expired: true },
                    { id: 'b', name: 'RESULT B', expired: true },
                    { id: 'a', name: 'RESULT A', expired: true },
                    { id: 'd', name: 'RESULT D', expired: false }
                ]}
            />
        );
    });

    test('should order by closest matches to search term', () => {
        expect(screen.getAllByRole('button')[0]).toHaveTextContent('RESULT D');
    });
});

describe('When chips', () => {
    beforeEach(() => {
        render(
            <Search
                {...defaultProps}
                value="RESULT A"
                displayChips
                searchResults={[
                    {
                        id: 'c',
                        name: 'RESULT C',
                        expired: true,
                        chips: [{ text: 'chip 1' }, { text: 'chip 2' }, { text: 'chip 3' }]
                    },
                    { id: 'b', name: 'RESULT B', expired: true },
                    { id: 'a', name: 'RESULT A', expired: true },
                    { id: 'd', name: 'RESULT D', expired: false }
                ]}
            />
        );
    });

    test('should render chips', () => {
        expect(screen.getByText('chip 1')).toBeInTheDocument();
        expect(screen.getByText('chip 2')).toBeInTheDocument();
        expect(screen.getByText('chip 3')).toBeInTheDocument();
    });
});
