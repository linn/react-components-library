import { useEffect, useState, useRef } from 'react';

function useSearch(fetchItems, searchTerm, clearSearch, queryString = null) {
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
        if (searchTerm) {
            if (savedDebounceTimer.current) {
                clearTimeout(savedDebounceTimer.current);
            }

            if (queryString) {
                setDebounceTimer(
                    setTimeout(() => savedFetchItems.current(queryString, searchTerm), 500)
                );
            } else {
                setDebounceTimer(setTimeout(() => savedFetchItems.current(searchTerm), 500));
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
