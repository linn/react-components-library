import { useEffect, useState, useRef } from 'react';

function useSearch(fetchItems, searchTerm, queryString) {
    const [debounceTimer, setDebounceTimer] = useState(null);

    const savedFetchItems = useRef();
    const savedDebounceTimer = useRef();

    useEffect(() => {
        savedFetchItems.current = fetchItems;
    }, [fetchItems]);

    useEffect(() => {
        savedDebounceTimer.current = debounceTimer;
    }, [debounceTimer]);

    useEffect(() => {
        if (searchTerm) {
            if (savedDebounceTimer.current) {
                clearTimeout(savedDebounceTimer.current);
            }

            setDebounceTimer(
                setTimeout(() => savedFetchItems.current(queryString, searchTerm), 500)
            );
        } else if (savedDebounceTimer.current) {
            clearTimeout(savedDebounceTimer.current);
        }
    }, [searchTerm, queryString]);
}

export default useSearch;
