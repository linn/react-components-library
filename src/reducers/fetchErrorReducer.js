function fetchErrorReducer(state = { requestErrors: [] }, action) {
    // the FETCH_ERROR actions are dispatched when the response has an error status code
    if (action.type.endsWith('_FETCH_ERROR')) {
        // put these in the error store keyed by the name of the itemType under request
        return { ...state, [action.payload.error.item]: action.payload.error };
    }
    if (action.type.startsWith('RECEIVE_')) {
        // clear error for this item if a request succeeds
        return { ...state, [action.payload.item]: null };
    }
    if (action.type === 'CLEAR_ERRORS') {
        return null;
    }
    // sometimes the request action itself represents an error...
    // e.g. if the request errors before a response is returned (server down, blocked by CORS etc)
    // See https://www.npmjs.com/package/redux-api-middleware#error
    if (action.error) {
        return {
            ...state,
            // add these to a requestErrrors part of the errors store, keyed by the action type that errored
            requestErrors: { ...state.requestErrors, [action.type]: action.payload }
        };
    }
    return state;
}

export default fetchErrorReducer;
