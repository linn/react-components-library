import { useEffect, useRef, useState } from 'react';
import useGet from './useGet.js';

// performs a single GET request once, as soon as the calling component is first mounted
// the url is specified by the below parameters, where id and queryString are optional
// with requiresAuth, it waits until the signed-in user has a token that hasn't expired, rather
// than sending an empty or expired one and being refused
function useInitialise(url, id, queryString, requiresAuth = false) {
    const [hasFetched, setHasFetched] = useState(false);
    // a ref as well as state, so it sends once even when React runs the effect twice (StrictMode)
    const fetched = useRef(false);
    const { send, isLoading, errorMessage, result, hasToken } = useGet(url, requiresAuth);

    // in an effect, not during render, so the token is in place (useGet keeps it in a ref, set
    // after each render); an expired stored token is being renewed, so it waits for the new one too
    const ready = !requiresAuth || hasToken;
    useEffect(() => {
        if (!fetched.current && ready) {
            fetched.current = true;
            setHasFetched(true);
            send(id, queryString);
        }
    }, [ready, send, id, queryString]);

    // waiting for the token counts as loading
    return { isLoading: isLoading || !hasFetched, errorMessage, result };
}

export default useInitialise;
