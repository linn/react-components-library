import { useState } from 'react';
import { useRequestAuth } from './requestAuth.js';

// A success with nothing to parse: a 204, or an empty body (Content-Length: 0). An answer with no
// headers at all (a test's fake fetch, say) is parsed, as before.
const hasNoBody = response =>
    response.status === 204 || response.headers?.get?.('Content-Length') === '0';

function usePut(url, requiresAuth = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [putResult, setPutResult] = useState(null);

    let token = '';

    const clearPutResult = () => setPutResult(null);

    const { user } = useRequestAuth();
    if (requiresAuth) {
        token = user?.access_token;
    }

    const send = async (id, data) => {
        setIsLoading(true);
        setPutResult(null);
        setErrorMessage(null);

        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const requestParameters = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: requiresAuth ? { ...headers, Authorization: `Bearer ${token}` } : headers
        };

        // a network failure (or a success body that isn't JSON) would otherwise leave it loading
        // for ever; usePost says the same
        try {
            const response = await fetch(id ? `${url}/${id}` : url, requestParameters);

            if (response.ok) {
                // a 204, or a 200 with an empty body (Content-Length: 0), has no body, and is still
                // a success
                setPutResult(hasNoBody(response) ? null : await response.json());
            } else {
                setErrorMessage(await response.text());
            }
        } catch {
            setErrorMessage('An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return { send, isLoading, errorMessage, putResult, clearPutResult };
}

export default usePut;
