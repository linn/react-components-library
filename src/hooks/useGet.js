import { useCallback, useRef, useState } from 'react';
import { useAuth } from 'react-oidc-context';

function useGet(url, requiresAuth = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [result, setResult] = useState(null);

    const auth = useAuth();

    // only the latest request's answer is kept: a slow earlier one would otherwise overwrite it
    const latestRequest = useRef(0);

    // an answer still on its way is no longer wanted either
    const clearData = () => {
        latestRequest.current += 1;
        setResult(null);
        setIsLoading(false);
    };

    const send = useCallback(
        async (id, queryString) => {
            latestRequest.current += 1;
            const thisRequest = latestRequest.current;
            const isLatest = () => thisRequest === latestRequest.current;
            setIsLoading(true);
            setResult(null);
            setErrorMessage(null);

            let token = requiresAuth ? auth.user?.access_token : ''; // Moved inside useCallback

            const headers = {
                accept: 'application/json'
            };
            const requestParameters = {
                method: 'GET',
                headers: requiresAuth ? { ...headers, Authorization: `Bearer ${token}` } : headers
            };

            try {
                const response = await fetch(
                    id ? `${url}/${id}${queryString ?? ''}` : `${url}${queryString ?? ''}`,
                    requestParameters
                );

                if (response.ok) {
                    const json = await response.json();
                    if (isLatest()) {
                        setResult(json);
                    }
                } else {
                    const text = await response.text();
                    if (isLatest()) {
                        setErrorMessage(text);
                    }
                }
            } catch (error) {
                if (isLatest()) {
                    setErrorMessage(error.message);
                }
            } finally {
                if (isLatest()) {
                    setIsLoading(false);
                }
            }
        },
        [requiresAuth, auth.user?.access_token, url]
    );

    return { send, isLoading, errorMessage, result, clearData };
}

export default useGet;
