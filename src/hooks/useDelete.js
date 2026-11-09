import { useState } from 'react';
import { useRequestAuth } from './requestAuth.js';

function useDelete(url, requiresAuth = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteResult, setDeleteResult] = useState(null);

    let token = '';

    const clearData = () => setDeleteResult(null);

    const { user } = useRequestAuth();
    if (requiresAuth) {
        token = user?.access_token;
    }

    const send = async id => {
        setIsLoading(true);
        setDeleteResult(null);
        setErrorMessage(null);

        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const requestParameters = {
            method: 'DELETE',
            headers: requiresAuth ? { ...headers, Authorization: `Bearer ${token}` } : headers
        };

        const response = await fetch(`${url}/${id}`, requestParameters);
        if (response.ok) {
            setDeleteResult(await response.json());
            setIsLoading(false);
        } else {
            const text = await response.text();
            setErrorMessage(text);
            setIsLoading(false);
        }
    };
    return { send, isLoading, errorMessage, deleteResult, clearData };
}

export default useDelete;