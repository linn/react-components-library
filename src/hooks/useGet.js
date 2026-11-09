import { useCallback, useState } from 'react';
import useRequest from './useRequest.js';

// a network failure's own message, as useGet has always given
const networkFailureMessage = error => error.message;

const idle = {
    isLoading: false,
    errorMessage: null,
    result: null,
    status: null,
    apiMessage: null,
    tokenRejected: false
};

// GETs from url (plus an id and query string) as the signed-in user when requiresAuth; see
// useGet.mdx. With no url, send's first argument is the whole URL.
function useGet(url, requiresAuth = false) {
    const [state, setState] = useState(idle);
    const { request, forgetEarlierRequests, hasToken, signInAgain } = useRequest(
        'GET',
        requiresAuth,
        networkFailureMessage
    );

    const send = useCallback(
        async (id, queryString) => {
            const query = queryString ?? '';
            let target;
            if (url == null) {
                target = `${id ?? ''}${query}`;
            } else {
                target = id ? `${url}/${id}${query}` : `${url}${query}`;
            }
            setState(previous => ({
                ...previous,
                isLoading: true,
                result: null,
                errorMessage: null,
                apiMessage: null,
                tokenRejected: false
            }));
            const outcome = await request(target);
            // only the latest request's answer is kept: a slow earlier one would otherwise
            // overwrite it
            if (!outcome.superseded) {
                setState({
                    isLoading: false,
                    result: outcome.result,
                    errorMessage: outcome.errorMessage,
                    status: outcome.status,
                    apiMessage: outcome.apiMessage,
                    tokenRejected: outcome.tokenRejected
                });
            }
            return outcome;
        },
        [url, request]
    );

    // an answer still on its way is no longer wanted either
    const clearData = useCallback(() => {
        forgetEarlierRequests();
        setState(previous => ({ ...previous, result: null, isLoading: false }));
    }, [forgetEarlierRequests]);

    return { send, ...state, clearData, hasToken, signInAgain };
}

export default useGet;
