import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
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
        expect(screen.getAllByTestId('result')[0]).toHaveTextContent('RESULT'); // 6 matching chars
        expect(screen.getAllByTestId('result')[1]).toHaveTextContent('RE A RESULT'); // 2 matching chars
        expect(screen.getAllByTestId('result')[2]).toHaveTextContent('OUTLIER RESULT'); // 0 matching chars
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
        expect(screen.getAllByTestId('result')[0]).toHaveTextContent('RESULT D');
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

describe('Keyboard navigation of results', () => {
    const searchResults = [
        { id: 'a', name: 'RESULT A' },
        { id: 'b', name: 'RESULT B' }
    ];

    test('results are out of the tab order but selectable once focused', () => {
        render(<Search {...defaultProps} value="RESULT" searchResults={searchResults} />);
        const [firstResult] = screen.getAllByRole('button');
        expect(firstResult).toHaveAttribute('tabindex', '-1');
        firstResult.focus();
        expect(firstResult).toHaveFocus();
        fireEvent.click(firstResult);
        expect(onResultSelect).toHaveBeenCalledWith(searchResults[0]);
    });

    test('ArrowDown from the input moves focus into the results list', () => {
        render(<Search {...defaultProps} value="RESULT" searchResults={searchResults} />);
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        expect(screen.getAllByRole('button')[0]).toHaveFocus();
    });

    test('Escape hides the results list without changing the value', () => {
        render(<Search {...defaultProps} value="RESULT" searchResults={searchResults} />);
        expect(screen.getByText('RESULT A')).toBeInTheDocument();
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Escape' });
        expect(screen.queryByText('RESULT A')).not.toBeInTheDocument();
        expect(defaultProps.handleValueChange).not.toHaveBeenCalled();
    });

    test('searching again after Escape re-shows the results', () => {
        render(<Search {...defaultProps} value="RESULT" searchResults={searchResults} />);
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Escape' });
        expect(screen.queryByText('RESULT A')).not.toBeInTheDocument();
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
        expect(screen.getByText('RESULT A')).toBeInTheDocument();
    });
});

describe('Keyboard navigation when results are shown in a modal', () => {
    const searchResults = [
        { id: 'a', name: 'RESULT A' },
        { id: 'b', name: 'RESULT B' },
        { id: 'c', name: 'RESULT C' }
    ];

    const openModal = () => {
        render(
            <Search {...defaultProps} value="RESULT" resultsInModal searchResults={searchResults} />
        );
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
        return input;
    };

    // Fire from the currently focused result (a List descendant) so the event
    // bubbles exactly as it does in a real browser and can be handled twice if
    // wired up wrongly.
    test('arrow keys move focus one result at a time inside the modal', () => {
        openModal();
        const results = screen.getAllByRole('button', { name: /RESULT/ });
        results[0].focus();
        fireEvent.keyDown(results[0], { key: 'ArrowDown' });
        expect(results[1]).toHaveFocus();
        fireEvent.keyDown(results[1], { key: 'ArrowDown' });
        expect(results[2]).toHaveFocus();
        fireEvent.keyDown(results[2], { key: 'ArrowUp' });
        expect(results[1]).toHaveFocus();
    });

    test('Enter selects the focused result', () => {
        openModal();
        const results = screen.getAllByRole('button', { name: /RESULT/ });
        results[0].focus();
        fireEvent.keyDown(results[0], { key: 'Enter' });
        expect(onResultSelect).toHaveBeenCalledWith(searchResults[0]);
    });

    test('Escape closes the modal', async () => {
        openModal();
        const modal = screen.getByTestId('modal');
        fireEvent.keyDown(modal, { key: 'Escape' });
        await waitFor(() => expect(screen.queryByTestId('modal')).not.toBeInTheDocument());
    });
});

describe('When showResultsList is false', () => {
    beforeEach(() => {
        render(
            <Search
                {...defaultProps}
                value="RESULT"
                showResultsList={false}
                searchResults={[{ id: 'a', name: 'RESULT A' }]}
            />
        );
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    });

    test('does not render its own results list, for a consumer driving a different display', () => {
        expect(screen.queryByTestId('result')).not.toBeInTheDocument();
        expect(screen.queryByText('No matching items')).not.toBeInTheDocument();
    });

    test('still calls search as normal', () => {
        expect(search).toHaveBeenCalledWith('RESULT');
    });
});

describe('When showResultsList is false and resultsInModal is true', () => {
    beforeEach(() => {
        render(
            <Search
                {...defaultProps}
                value="RESULT"
                resultsInModal
                showResultsList={false}
                searchResults={[{ id: 'a', name: 'RESULT A' }]}
            />
        );
        const input = screen.getByLabelText('Label');
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    });

    test('does not open the modal either, so nothing hides other content on the page', () => {
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
});
