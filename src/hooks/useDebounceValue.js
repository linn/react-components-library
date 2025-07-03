import { useEffect, useState } from 'react';

// This hook returns debounced updates to a passed input value
// The first returned value is only updated when the input value has been changed and the specified delay time has elapsed
// The second returned value is a bool that tracks whether the value is currently being debounced
function useDebounceValue(value, delay = 1000) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(() => {
        setIsDebouncing(true);
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsDebouncing(false);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue, isDebouncing];
}

export default useDebounceValue;
