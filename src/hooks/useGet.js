import { useCallback, useState } from 'react';
import { useAuth } from 'react-oidc-context';

function useGet(url, requiresAuth = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [result, setResult] = useState(null);

    const auth = useAuth();

    const clearData = () => setResult(null);

    const send = useCallback(
        async (id, queryString) => {
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
                    setResult(await response.json());
                } else {
                    setErrorMessage(await response.text());
                }
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        },
        [requiresAuth, auth.user?.access_token, url]
    );

    return { send, isLoading, errorMessage, result, clearData };
}

export default useGet;
