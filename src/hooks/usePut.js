import { useCallback, useState } from 'react';
import useRequest from './useRequest.js';

const networkFailureMessage = () => 'An error occurred.';

const idle = {
    isLoading: false,
    errorMessage: null,
    putResult: null,
    status: null,
    apiMessage: null
};

// PUTs data to url (plus an id) as the signed-in user when requiresAuth; see usePut.mdx. With no
// url, send's first argument is the whole URL.
function usePut(url, requiresAuth = false) {
    const [state, setState] = useState(idle);
    const { request, hasToken } = useRequest('PUT', requiresAuth, networkFailureMessage);

    const send = useCallback(
        async (id, data) => {
            let target;
            if (url == null) {
                target = id;
            } else {
                target = id ? `${url}/${id}` : url;
            }
            setState(previous => ({
                ...previous,
                isLoading: true,
                putResult: null,
                errorMessage: null,
                apiMessage: null
            }));
            const outcome = await request(target, { body: data });
            if (!outcome.superseded) {
                setState({
                    isLoading: false,
                    putResult: outcome.result,
                    errorMessage: outcome.errorMessage,
                    status: outcome.status,
                    apiMessage: outcome.apiMessage
                });
            }
            return outcome;
        },
        [url, request]
    );

    const clearPutResult = useCallback(
        () => setState(previous => ({ ...previous, putResult: null })),
        []
    );

    return { send, ...state, clearPutResult, hasToken };
}

export default usePut;
