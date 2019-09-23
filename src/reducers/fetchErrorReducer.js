function fetchErrorReducer(itemTypes, defaultState = { requestErrors: [], itemErrors: [] }) {
    return (state = defaultState, action) => {
        if (action.payload) {
            if (
                action.payload.error &&
                itemTypes[action.payload.error.item] &&
                action.type === `FETCH_${itemTypes[action.payload.error.item].actionType}_ERROR`
            ) {
                return { ...state, itemErrors: [...state.itemErrors, action.payload.error] };
            }
            if (
                action.payload.item &&
                itemTypes[action.payload.item] &&
                action.type === `RECEIVE_${itemTypes[action.payload.item].actionType}`
            ) {
                return {
                    ...state,
                    itemErrors: state.itemErrors.map(i =>
                        i.item === action.payload.item ? null : i
                    )
                };
            }
            if (
                action.payload.item &&
                itemTypes[action.payload.item] &&
                action.type === `CLEAR_${itemTypes[action.payload.item].actionType}_ERRORS`
            ) {
                return {
                    ...state,
                    itemErrors: state.itemErrors.map(i =>
                        i.item === action.payload.item ? null : i
                    )
                };
            }
        }
        if (action.error) {
            return {
                ...state,
                requestErrors: [...state.requestErrors, { ...action.payload, type: action.type }]
            };
        }
        return state;
    };
}

export default fetchErrorReducer;
