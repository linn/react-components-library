import { useState } from 'react';
import useGet from './useGet';

// performs a single GET request once, as soon as the calling component is first mounted
// the url is specified by the below parameters, where id and queryString are optional
function useInitialise(url, id, queryString, requiresAuth = false) {
    const [hasFetched, setHasFetched] = useState(false);
    const { send, isLoading, errorMessage, result } = useGet(url, requiresAuth);

    if (!hasFetched) {
        send(id, queryString);
        setHasFetched(true);
    }
    return { isLoading, errorMessage, result };
}

export default useInitialise;
