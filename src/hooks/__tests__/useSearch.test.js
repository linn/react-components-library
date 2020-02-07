import { renderHook } from '@testing-library/react-hooks';
import { wait, cleanup } from '@testing-library/react';
import useSearch from '../useSearch';

let fetchItems;
const clearSearch = jest.fn();

afterEach(cleanup);

describe('When no minimum set', () => {
    test('should fire off search', async () => {
        fetchItems = jest.fn();
        renderHook(() => useSearch(fetchItems, 'PCAS', clearSearch, '', '', 500, 0));
        await wait(() => expect(fetchItems).toHaveBeenCalled());
    });
});

describe('When minimum set and search term shorter than minimum', () => {
    test('should not fire off search', async () => {
        fetchItems = jest.fn();
        renderHook(() => useSearch(fetchItems, 'PCAS', clearSearch, '', '', 500, 5));
        await wait(() => expect(fetchItems));
        expect(fetchItems).not.toHaveBeenCalled();
    });
});

describe('When minimum set and search term longer than minimum', () => {
    test('should fire off search', async () => {
        fetchItems = jest.fn();
        renderHook(() => useSearch(fetchItems, 'PCAS 123', clearSearch, '', '', 500, 5));
        await wait(() => expect(fetchItems).toHaveBeenCalled());
    });

    test('should ignore space in character count', async () => {
        fetchItems = jest.fn();
        renderHook(() => useSearch(fetchItems, 'PCAS ', clearSearch, '', 500, 5));
        wait(() => expect(fetchItems));
        expect(fetchItems).not.toHaveBeenCalled();
    });
});
