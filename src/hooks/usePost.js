import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utilities from '../utilities/index.js';
import useRequest from './useRequest.js';

const networkFailureMessage = () => 'An error occurred.';

const idle = {
    isLoading: false,
    errorMessage: null,
    postResult: null,
    status: null,
    apiMessage: null,
    tokenRejected: false
};

// POSTs data to url (plus an id) as the signed-in user when requiresAuth, and with
// redirectOnSuccess goes to the created thing's self link; see usePost.mdx. With no url, send's
// first argument is the whole URL.
function usePost(url, requiresAuth = false, redirectOnSuccess = false) {
    const [state, setState] = useState(idle);
    const navigate = useNavigate();
    const abortControllerRef = useRef(null);
    const { request, forgetEarlierRequests, hasToken, signInAgain } = useRequest(
        'POST',
        requiresAuth,
        networkFailureMessage
    );

    const send = useCallback(
        async (id, data) => {
            // a new post cancels one still on its way
            abortControllerRef.current?.abort();
            const controller = new AbortController();
            abortControllerRef.current = controller;

            let target;
            if (url == null) {
                target = id;
            } else {
                target = id ? `${url}/${id}` : url;
            }
            setState(previous => ({
                ...previous,
                isLoading: true,
                postResult: null,
                errorMessage: null,
                apiMessage: null,
                tokenRejected: false
            }));
            const outcome = await request(target, { body: data, signal: controller.signal });
            if (!outcome.superseded) {
                setState({
                    isLoading: false,
                    postResult: outcome.result,
                    errorMessage: outcome.errorMessage,
                    status: outcome.status,
                    apiMessage: outcome.apiMessage,
                    tokenRejected: outcome.tokenRejected
                });
                // a 204 or an empty body is a success with nowhere to redirect to
                if (outcome.ok && redirectOnSuccess && outcome.result) {
                    setState(previous => ({ ...previous, postResult: null }));
                    navigate(utilities.getSelfHref(outcome.result));
                }
            }
            return outcome;
        },
        [url, request, redirectOnSuccess, navigate]
    );

    // stops the post still on its way: its answer, or its failure, is ignored
    const cancelRequest = useCallback(() => {
        abortControllerRef.current?.abort();
        forgetEarlierRequests();
        setState(previous => ({ ...previous, isLoading: false }));
    }, [forgetEarlierRequests]);

    const clearPostResult = useCallback(() => {
        setState(previous => ({
            ...previous,
            postResult: null,
            errorMessage: null,
            apiMessage: null,
            tokenRejected: false
        }));
    }, []);

    return { send, cancelRequest, ...state, clearPostResult, hasToken, signInAgain };
}

export default usePost;
