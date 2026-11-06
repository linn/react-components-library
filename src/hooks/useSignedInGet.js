import useSignedInRequest from './useSignedInRequest.js';

// useSignedInRequest for GET requests: send(url).
function useSignedInGet() {
    return useSignedInRequest('GET');
}

export default useSignedInGet;
