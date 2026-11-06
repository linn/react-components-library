import useSignedInRequest from './useSignedInRequest.js';

// useSignedInRequest for PUT requests: send(url, body).
function useSignedInPut() {
    return useSignedInRequest('PUT');
}

export default useSignedInPut;
