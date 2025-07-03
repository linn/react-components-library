import { useState } from 'react';
import { useAuth } from 'react-oidc-context';

function usePut(url, requiresAuth = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [putResult, setPutResult] = useState(null);

    let token = '';

    const clearPutResult = () => setPutResult(null);

    const auth = useAuth();
    if (requiresAuth) {
        token = auth.user?.access_token;
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

        const response = await fetch(id ? `${url}/${id}` : url, requestParameters);

        if (response.ok) {
            setPutResult(await response.json());
            setIsLoading(false);
        } else {
            const text = await response.text();
            setErrorMessage(text);
            setIsLoading(false);
        }
    };

    return { send, isLoading, errorMessage, putResult, clearPutResult };
}

export default usePut;
