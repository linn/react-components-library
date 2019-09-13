function fetchErrorReducer(state = {}, action) {
    // just check if it's a FETCH_ERROR type of action here
    // the other alterative is to pass in a whole list of actionTypes here as is done in itemStoreFactory
    if (action.type.endsWith('_FETCH_ERROR')) {
        return { ...state, [action.payload.error.item]: action.payload.error };
    }
    if (action.type === 'CLEAR_ERRORS') {
        return null;
    }
    // sometimes the action itself represents an error... See https://www.npmjs.com/package/redux-api-middleware#error
    if (action.error) {
        return { ...state, [action.type]: action.payload };
    }
    return state;
}

export default fetchErrorReducer;
