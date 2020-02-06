import { useEffect, useState, useRef } from 'react';

function useSearch(
    fetchItems,
    searchTerm,
    clearSearch,
    queryString = '',
    options = null,
    debounce = 500,
    searchOnNumberOfChars = 1
) {
    const [debounceTimer, setDebounceTimer] = useState(null);
    const savedFetchItems = useRef();
    const savedDebounceTimer = useRef();
    const savedClearSearch = useRef();

    useEffect(() => {
        savedFetchItems.current = fetchItems;
    }, [fetchItems]);

    useEffect(() => {
        savedDebounceTimer.current = debounceTimer;
    }, [debounceTimer]);

    useEffect(() => {
        if (clearSearch) {
            savedClearSearch.current = clearSearch;
        }
    }, [clearSearch]);

    useEffect(() => {
        if (
            searchTerm &&
            searchTerm?.toString().replace(/\s/g, '').length >= searchOnNumberOfChars
        ) {
            if (savedDebounceTimer.current) {
                clearTimeout(savedDebounceTimer.current);
            }

            if (queryString) {

                setDebounceTimer(
                    setTimeout(() => savedFetchItems.current(queryString, searchTerm), debounce)
                );
            } else if (options) {
                setDebounceTimer(
                    setTimeout(() => savedFetchItems.current(searchTerm, options), debounce)
                );
            } else {
                setDebounceTimer(setTimeout(() => savedFetchItems.current(searchTerm), debounce));
            }
        } else if (savedDebounceTimer.current) {
            clearTimeout(savedDebounceTimer.current);
        }

        if (savedClearSearch.current) {
            savedClearSearch.current();
        }
    }, [searchTerm, queryString]);
}

export default useSearch;
