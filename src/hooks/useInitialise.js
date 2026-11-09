import { useState } from 'react';
import { useRequestAuth } from './requestAuth.js';
import useGet from './useGet.js';

// performs a single GET request once, as soon as the calling component is first mounted
// the url is specified by the below parameters, where id and queryString are optional
// with requiresAuth, it waits until the signed-in user has a token that hasn't expired, rather
// than sending an empty or expired one and being refused
function useInitialise(url, id, queryString, requiresAuth = false) {
    const [hasFetched, setHasFetched] = useState(false);
    const { user } = useRequestAuth();
    const { send, isLoading, errorMessage, result } = useGet(url, requiresAuth);

    // an expired stored token is being renewed, so it waits for the new one too
    if (!hasFetched && (!requiresAuth || (user?.access_token && !user.expired))) {
        send(id, queryString);
        setHasFetched(true);
    }
    // waiting for the token counts as loading
    return { isLoading: isLoading || !hasFetched, errorMessage, result };
}

export default useInitialise;
