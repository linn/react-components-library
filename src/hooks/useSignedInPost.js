import useSignedInRequest from './useSignedInRequest.js';

// useSignedInRequest for POST requests: send(url, body).
function useSignedInPost() {
    return useSignedInRequest('POST');
}

export default useSignedInPost;
