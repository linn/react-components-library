import * as actionTypes from '../../actions/index';

const receiveTypes = root => [`RECEIVE_${root}`, `RECEIVE_NEW_${root}`, `RECEIVE_UPDATED_${root}`];

function fetchErrorReducerFactory(itemTypes, defaultState = { requestErrors: [], itemErrors: [] }) {
    return (state = defaultState, action) => {
        if (action.payload) {
            // Add error to itemErrors array in store when a FETCH_ERROR action occurs
            if (
                action.payload.error &&
                itemTypes[action.payload.error.item] &&
                action.type === `FETCH_${itemTypes[action.payload.error.item].actionType}_ERROR`
            ) {
                return { ...state, itemErrors: [...state.itemErrors, action.payload.error] };
            }

            // Clear remove itemError from array when a success action of any kind occurs for that item
            if (action.payload.item && itemTypes[action.payload.item]) {
                const itemType = itemTypes[action.payload.item];
                if (receiveTypes(itemType.actionType).indexOf(action.type) > -1) {
                    return {
                        ...state,
                        itemErrors: state.itemErrors.filter(e => e.item !== action.payload.item)
                    };
                }

                // Clear item errors for a chosen item
                if (action.type === `CLEAR_${itemType.actionType}_ERRORS`) {
                    return {
                        ...state,
                        itemErrors: state.itemErrors.filter(e => e.item !== action.payload.item)
                    };
                }
            }
        }

        // clear all itemErrors
        if (action.type === actionTypes.CLEAR_ITEM_ERRORS) {
            return { ...state, itemErrors: [] };
        }

        // sometimes the action itself represents an error e.g. CORS rejection, server is down etc.
        // differentiate these from itemErrors in state by adding to a different requestErrors array
        if (action.error) {
            return {
                ...state,
                requestErrors: [...state.requestErrors, { ...action.payload, type: action.type }]
            };
        }
        return state;
    };
}

export default fetchErrorReducerFactory;
