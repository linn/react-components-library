const fetchErrorReducerFactory = (actionTypes, defaultState = {}) => (
    state = defaultState,
    action
) => {
    switch (action.type) {
        // maybe leave the old one 'FETCH_ERROR' in here too so this doesn't break existing render logic?
        case actionTypes[action.type]:
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
};

export default fetchErrorReducerFactory;
