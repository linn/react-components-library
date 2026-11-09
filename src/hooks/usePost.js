import { useState, useRef, useCallback } from 'react';
import utilities from '../utilities/index.js';
import { useRequestAuth } from './requestAuth.js';
import { useNavigate } from 'react-router-dom';

// A success with nothing to parse: a 204, or an empty body (Content-Length: 0). An answer with no
// headers at all (a test's fake fetch, say) is parsed, as before.
const hasNoBody = response =>
    response.status === 204 || response.headers?.get?.('Content-Length') === '0';

function usePost(url, requiresAuth = false, redirectOnSuccess = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [postResult, setPostResult] = useState(null);

    const navigate = useNavigate();
    const abortControllerRef = useRef(null);

    let token = '';
    const { user } = useRequestAuth();
    if (requiresAuth) {
        token = user?.access_token;
    }

    const clearPostResult = useCallback(() => {
        setPostResult(null);
        setErrorMessage(null);
    }, []);

    const send = useCallback(
        async (id, data) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            setIsLoading(true);
            setPostResult(null);
            setErrorMessage(null);

            const headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            const requestParameters = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: requiresAuth ? { ...headers, Authorization: `Bearer ${token}` } : headers,
                signal: controller.signal
            };

            try {
                const response = await fetch(id ? `${url}/${id}` : url, requestParameters);

                if (response.ok) {
                    // a 204, or a 200 with an empty body (Content-Length: 0), has no body, and is
                    // still a success (with nowhere to redirect to)
                    const result = hasNoBody(response) ? null : await response.json();
                    setPostResult(result);
                    if (redirectOnSuccess && result) {
                        setPostResult(null);
                        navigate(utilities.getSelfHref(result));
                    }
                } else {
                    const text = await response.text();
                    setErrorMessage(text);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request was aborted.');
                } else {
                    setErrorMessage('An error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [requiresAuth, token, url, redirectOnSuccess, navigate]
    );

    const cancelRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    return { send, cancelRequest, isLoading, errorMessage, postResult, clearPostResult };
}

export default usePost;
