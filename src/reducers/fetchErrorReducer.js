function fetchErrorReducer(state, action) {
    if (action.type.endsWith('_FETCH_ERROR')) {
        switch (action.type) {
            case `${action.type}`:
                return { ...state, [action.type]: action.payload };
            default:
                if (action.error) {
                    return {
                        statusText:
                            'There was an issue contacting the server, please try again later...'
                    };
                }
                return null;
        }
    }
    return null;
}

export default fetchErrorReducer;
