import * as actionTypes from '../actions';

const receiveTypes = root => [`RECEIVE_${root}`, `RECEIVE_NEW_${root}`, `RECEIVE_UPDATED_${root}`];

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
                receiveTypes(itemTypes[action.payload.item].actionType).indexOf(action.type) > -1
            ) {
                return {
                    ...state,
                    itemErrors: state.itemErrors.filter(e => e.item !== action.payload.item)
                };
            }
            if (
                action.payload.item &&
                itemTypes[action.payload.item] &&
                action.type === `CLEAR_${itemTypes[action.payload.item].actionType}_ERRORS`
            ) {
                return {
                    ...state,
                    itemErrors: state.itemErrors.filter(e => e.item !== action.payload.item)
                };
            }
        }
        if (action.error) {
            return {
                ...state,
                requestErrors: [...state.requestErrors, { ...action.payload, type: action.type }]
            };
        }
        if (action.type === actionTypes.CLEAR_ITEM_ERRORS) {
            return { ...state, itemErrors: [] };
        }
        return state;
    };
}

export default fetchErrorReducer;
