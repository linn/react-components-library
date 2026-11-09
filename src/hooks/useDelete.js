import { useCallback, useState } from 'react';
import useRequest from './useRequest.js';

const networkFailureMessage = () => 'An error occurred.';

const idle = {
    isLoading: false,
    errorMessage: null,
    deleteResult: null,
    status: null,
    apiMessage: null
};

// DELETEs url/id as the signed-in user when requiresAuth; see useDelete.mdx. With no url, send's
// argument is the whole URL.
function useDelete(url, requiresAuth = false) {
    const [state, setState] = useState(idle);
    const { request, hasToken } = useRequest('DELETE', requiresAuth, networkFailureMessage);

    const send = useCallback(
        async id => {
            const target = url == null ? id : `${url}/${id}`;
            setState(previous => ({
                ...previous,
                isLoading: true,
                deleteResult: null,
                errorMessage: null,
                apiMessage: null
            }));
            const outcome = await request(target);
            if (!outcome.superseded) {
                setState({
                    isLoading: false,
                    deleteResult: outcome.result,
                    errorMessage: outcome.errorMessage,
                    status: outcome.status,
                    apiMessage: outcome.apiMessage
                });
            }
            return outcome;
        },
        [url, request]
    );

    const clearData = useCallback(
        () => setState(previous => ({ ...previous, deleteResult: null })),
        []
    );

    return { send, ...state, clearData, hasToken };
}

export default useDelete;
